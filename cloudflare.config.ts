import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig(({ isPreview }) => ({
  worker: defineWorker({
    name: "corgi",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-26",
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      DB: bindings.d1({
        name: isPreview ? "reviews-prod" : "reviews-dev",
        id: isPreview
          ? "439622c1-94f6-472b-aed1-4866201da91f"
          : "ae127df5-6d77-42ac-b9c1-85f5ff1dc386",
      }),
    },
  }),
}));
