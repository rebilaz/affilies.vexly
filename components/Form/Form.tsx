"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function MiniLeadForm() {
  const [project, setProject] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContinue = () => {
    if (!project.trim()) return;
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project,
          fullName,
          email,
          phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      setSuccessMessage("Votre demande a bien été envoyée.");
      setProject("");
      setFullName("");
      setEmail("");
      setPhone("");

      setTimeout(() => {
        setIsModalOpen(false);
        setSuccessMessage("");
      }, 1200);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible d'envoyer le formulaire"
      );
    } finally {
      setLoading(false);
    }
  };

  const modal = isModalOpen ? (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/45 px-4 backdrop-blur-[4px]">
      <button
        type="button"
        aria-label="Fermer le popup"
        onClick={handleClose}
        className="absolute inset-0"
      />

      <div className="relative z-[100000] w-full max-w-[560px] rounded-[32px] border border-white/60 bg-white p-6 shadow-[0_30px_120px_rgba(0,0,0,0.22)] sm:p-7">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-lg text-neutral-400 transition hover:text-neutral-800"
          aria-label="Fermer"
        >
          ×
        </button>

        <div className="mb-6 pr-12">
          <h3 className="text-[32px] font-semibold leading-[0.95] tracking-[-0.05em] text-neutral-950">
            Parlez-nous de vous
          </h3>

          <p className="mt-3 text-[17px] leading-relaxed tracking-[-0.02em] text-neutral-500">
            Laissez vos coordonnées pour qu’on puisse revenir vers vous.
          </p>
        </div>

        <div className="mb-5 rounded-[20px] border border-neutral-200 bg-neutral-50 px-4 py-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
            Votre projet
          </p>
          <p className="line-clamp-3 text-[14px] leading-relaxed tracking-[-0.01em] text-neutral-700">
            {project}
          </p>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-[14px] font-medium tracking-[-0.02em] text-neutral-700">
              Nom complet
            </label>
            <input
              type="text"
              placeholder="Jean Dupont"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-14 w-full rounded-[18px] border border-neutral-200 bg-neutral-50 px-4 text-[16px] font-medium tracking-[-0.02em] text-neutral-900 outline-none transition placeholder:font-normal placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-[14px] font-medium tracking-[-0.02em] text-neutral-700">
              Email
            </label>
            <input
              type="email"
              placeholder="email@entreprise.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 w-full rounded-[18px] border border-neutral-200 bg-neutral-50 px-4 text-[16px] font-medium tracking-[-0.02em] text-neutral-900 outline-none transition placeholder:font-normal placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-[14px] font-medium tracking-[-0.02em] text-neutral-700">
              Téléphone
            </label>
            <input
              type="tel"
              placeholder="+33 6 12 34 56 78"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-14 w-full rounded-[18px] border border-neutral-200 bg-neutral-50 px-4 text-[16px] font-medium tracking-[-0.02em] text-neutral-900 outline-none transition placeholder:font-normal placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          {successMessage && (
            <p className="text-sm text-green-600">{successMessage}</p>
          )}

          <div className="mt-6 px-2 pb-2">
            <button
              type="submit"
              disabled={loading}
              className="flex h-14 w-full items-center justify-center rounded-full bg-yellow-400 shadow-[0_0_24px_rgba(251,191,36,0.42)] transition hover:bg-yellow-300 disabled:opacity-60"
              aria-label="Valider"
            >
              {loading ? "Envoi..." : "Valider"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      <section id="formulaire" className="w-full scroll-mt-24">
        <div className="w-full rounded-[24px] border border-neutral-200 bg-white p-0 shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
          <div className="relative">
            <textarea
              placeholder="Décrivez votre projet en quelques lignes..."
              rows={4}
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="min-h-[140px] w-full resize-none rounded-[24px] border-[3px] border-black bg-white px-6 py-6 pr-[210px] text-[18px] font-medium leading-relaxed tracking-[-0.03em] text-neutral-900 outline-none transition placeholder:font-normal placeholder:text-neutral-400 focus:border-black"
            />

            <button
              type="button"
              onClick={handleContinue}
              className="absolute bottom-5 right-5 inline-flex h-14 min-w-[180px] items-center justify-center rounded-full bg-yellow-400 px-6 text-base font-semibold tracking-[-0.02em] text-black shadow-[0_0_24px_rgba(251,191,36,0.38)] transition duration-200 hover:scale-[1.02] hover:bg-yellow-300"
            >
              Continuer
            </button>
          </div>
        </div>
      </section>

      {mounted && typeof document !== "undefined"
        ? createPortal(modal, document.body)
        : null}
    </>
  );
}