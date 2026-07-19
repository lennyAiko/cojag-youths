// @ts-check
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';

// Bricolage Grotesque / Space Grotesk match the brand type from the original
// flier design; Alex Brush is the script face used for the attendee's name
// on the generated flier (see src/features/flier).
const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Alex+Brush&family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Space+Grotesk:wght@400;500;600;700&display=swap';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  html: {
    title: 'COJAG 2026 Youth Convention — The Right Steps',
    tags: [
      {
        tag: 'link',
        attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      },
      {
        tag: 'link',
        attrs: {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: true,
        },
      },
      { tag: 'link', attrs: { rel: 'stylesheet', href: GOOGLE_FONTS_URL } },
    ],
  },
  plugins: [
    pluginReact({
      reactCompiler: true,
    }),
    pluginTailwindcss(),
  ],
});
