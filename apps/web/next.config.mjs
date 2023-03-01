// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./env.mjs"));

/* Type safe nextjs routes */
import removeImports from "next-remove-imports";
import withRoutes from "nextjs-routes/config";
/**
 * Credit to https://github.com/izszzz/tunescore/blob/develop/next.config.mjs
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */

function defineNextConfig(config) {
  return withRoutes()(removeImports()(config));
}

export default defineNextConfig({
  reactStrictMode: true,
  images: {
    domains: [
      "source.unsplash.com",
      "avatars.githubusercontent.com",
      "res.cloudinary.com",
    ],
  },
  transpilePackages: ["ui"],
  experimental: {
    appDir: false,
    // serverComponentsExternalPackages: ["@prisma/client"],
  },
  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
});
