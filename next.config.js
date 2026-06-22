/** @type {import("next").NextConfig} */

const fs = require("fs");
const path = require("path");

function loadGeneratedRedirects() {
  try {
    // Fichier généré par ta fonction Supabase
    const filePath = path.join(
      process.cwd(),
      "redirects.generated.json",
    );

    if (!fs.existsSync(filePath)) {
      return [];
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const redirects = JSON.parse(raw);

    if (!Array.isArray(redirects)) {
      return [];
    }

    return redirects
      .filter(
        (redirect) =>
          redirect &&
          redirect.status === 301 &&
          typeof redirect.from === "string" &&
          typeof redirect.to === "string",
      )
      .map((redirect) => ({
        source: redirect.from,
        destination: redirect.to,
        permanent: true,
      }));
  } catch (error) {
    console.error(
      "Impossible de charger redirects.generated.json :",
      error,
    );

    return [];
  }
}

const nextConfig = {
  // Monte tout le repo Affiliés sous /affiliation
  basePath: "/affiliation",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async redirects() {
    const generated = loadGeneratedRedirects();

    return [
      // Redirection du domaine apex vers www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "vexly.fr",
          },
        ],
        destination: "https://www.vexly.fr/:path*",
        permanent: true,
      },

      // Redirections SEO générées depuis la base de données
      ...generated,
    ];
  },

  output: "standalone",

  outputFileTracingIncludes: {
    "/*": ["content/**/*"],
  },
};

module.exports = nextConfig;

