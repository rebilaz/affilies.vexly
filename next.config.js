/** @type {import('next').NextConfig} */
const fs = require("fs");
const path = require("path");

function loadGeneratedRedirects() {
  try {
    // Fichier généré par ta function Supabase
    const p = path.join(process.cwd(), "redirects.generated.json");
    if (!fs.existsSync(p)) return [];

    const raw = fs.readFileSync(p, "utf8");
    const arr = JSON.parse(raw);

    // Format attendu: [{ from: "/articles/old", to: "/articles/new" }, ...]
    if (!Array.isArray(arr)) return [];

    return arr
      .filter(
        (r) =>
          r &&
          r.status === 301 &&
          typeof r.from === "string" &&
          typeof r.to === "string"
      )
      .map((r) => ({
        source: r.from,
        destination: r.to,
        permanent: true,
      }));
  } catch {
    return [];
  }
}

const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },

  async redirects() {
    const generated = loadGeneratedRedirects();

    return [
      // ✅ 1) Redirect host apex -> www
      {
        source: "/:path*",
        has: [{ type: "host", value: "vexly.fr" }],
        destination: "https://www.vexly.fr/:path*",
        permanent: true,
      },

      // ✅ 2) Redirects SEO (fusion/cannibalisation) générés depuis ta DB
      ...generated,
    ];
  },

  // ✅ IMPORTANT: embarque content/ en prod (standalone / tracing)
  output: "standalone",
  outputFileTracingIncludes: {
    "/*": ["content/**/*"],
  },
};

module.exports = nextConfig;
