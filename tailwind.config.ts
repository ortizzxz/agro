import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        info: "var(--color-info)",

        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        muted: "var(--color-muted)",
        soft: "var(--color-soft)",

        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",

        border: "var(--color-border)",
      },
    },
  },
} satisfies Config;