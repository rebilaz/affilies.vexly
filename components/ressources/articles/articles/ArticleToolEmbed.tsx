"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Tool = {
  _id?: string;
  title?: string;
  slug?: string;
  height?: number;
  intro?: string;
  outro?: string;
};

type ToolEmbedValue = {
  tool?: Tool | null;
  titleOverride?: string;
  heightOverride?: number;
};

function getInitialHeight(value?: number) {
  if (!value) return 300;
  return Math.min(Math.max(value, 120), 2000);
}

export function ArticleToolEmbed({ value }: { value: ToolEmbedValue }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const tool = value?.tool;
  const slug = tool?.slug;

  const [height, setHeight] = useState(
    getInitialHeight(value.heightOverride || tool?.height)
  );

  useEffect(() => {
    if (!slug) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      const data = event.data;

      if (
        !data ||
        data.type !== "vexly-embed-height" ||
        data.slug !== slug ||
        typeof data.height !== "number"
      ) {
        return;
      }

      const nextHeight = Math.min(Math.max(Math.ceil(data.height), 120), 2000);
      setHeight(nextHeight);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [slug]);

  const handleLoad = useCallback(() => {
    cleanupRef.current?.();

    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;

      const updateHeight = () => {
        const bodyHeight = doc.body?.scrollHeight || 0;
        const htmlHeight = doc.documentElement?.scrollHeight || 0;
        const nextHeight = Math.max(bodyHeight, htmlHeight);

        if (nextHeight > 0) {
          setHeight(Math.min(Math.max(Math.ceil(nextHeight), 120), 2000));
        }
      };

      updateHeight();

      const observer = new ResizeObserver(updateHeight);

      if (doc.body) observer.observe(doc.body);
      if (doc.documentElement) observer.observe(doc.documentElement);

      const interval = window.setInterval(updateHeight, 500);

      cleanupRef.current = () => {
        observer.disconnect();
        window.clearInterval(interval);
      };
    } catch {
      // Fallback si l'iframe devient cross-domain.
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanupRef.current?.();
    };
  }, []);

  if (!slug) {
    return (
      <div className="my-8 text-sm text-red-600">
        Outil introuvable ou slug manquant.
      </div>
    );
  }

  const title = value.titleOverride || tool.title || "Outil intégré";
  const embedSrc = `/embed/${slug}`;

  return (
    <div className="my-8 w-full">
      <iframe
        ref={iframeRef}
        src={embedSrc}
        title={title}
        width="100%"
        height={height}
        loading="lazy"
        scrolling="no"
        onLoad={handleLoad}
        className="block w-full border-0 bg-transparent"
        allow="fullscreen; clipboard-write"
      />
    </div>
  );
}