export interface ProjectTheme {
  accent: string;
  badgeBg: string;
  badgeBorder: string;
  cardBorder: string;
  glowColor: string;
  cardShadow: string;
  tech: string;
  btnHover: string;
}

export const PROJECT_THEMES: ProjectTheme[] = [
  {
    accent: "text-purple-700 dark:text-purple-400",
    badgeBg: "bg-purple-500/15 dark:bg-purple-500/12",
    badgeBorder: "border-purple-500/30 dark:border-purple-500/25",
    cardBorder: "border-purple-500/50 dark:border-purple-500/25",
    glowColor: "rgba(147, 51, 234, 0.15)",
    cardShadow:
      "hover:shadow-[0_20px_50px_rgba(147,51,234,0.18)] dark:hover:shadow-[0_30px_70px_rgba(147,51,234,0.3)]",
    tech: "bg-purple-500/20 dark:bg-purple-500/10 border-purple-500/40 dark:border-purple-500/20 text-purple-900 dark:text-purple-300",
    btnHover:
      "hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white hover:shadow-[0_10px_25px_rgba(147,51,234,0.25)] hover:border-purple-500/40",
  },
  {
    accent: "text-blue-700 dark:text-blue-400",
    badgeBg: "bg-blue-500/15 dark:bg-blue-500/12",
    badgeBorder: "border-blue-500/30 dark:border-blue-500/25",
    cardBorder: "border-blue-500/50 dark:border-blue-500/25",
    glowColor: "rgba(37, 99, 235, 0.15)",
    cardShadow:
      "hover:shadow-[0_20px_50px_rgba(37,99,235,0.18)] dark:hover:shadow-[0_30px_70px_rgba(37,99,235,0.3)]",
    tech: "bg-blue-500/20 dark:bg-blue-500/10 border-blue-500/40 dark:border-blue-500/20 text-blue-900 dark:text-blue-300",
    btnHover:
      "hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white hover:shadow-[0_10px_25px_rgba(37,99,235,0.25)] hover:border-blue-500/40",
  },
  {
    accent: "text-emerald-700 dark:text-emerald-400",
    badgeBg: "bg-emerald-500/15 dark:bg-emerald-500/12",
    badgeBorder: "border-emerald-500/30 dark:border-emerald-500/25",
    cardBorder: "border-emerald-500/50 dark:border-emerald-500/25",
    glowColor: "rgba(5, 150, 105, 0.15)",
    cardShadow:
      "hover:shadow-[0_20px_50px_rgba(5,150,105,0.18)] dark:hover:shadow-[0_30px_70px_rgba(5,150,105,0.3)]",
    tech: "bg-emerald-500/20 dark:bg-emerald-500/10 border-emerald-500/40 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-300",
    btnHover:
      "hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white hover:shadow-[0_10px_25px_rgba(5,150,105,0.25)] hover:border-emerald-500/40",
  },
  {
    accent: "text-red-700 dark:text-red-400",
    badgeBg: "bg-red-500/15 dark:bg-red-500/12",
    badgeBorder: "border-red-500/30 dark:border-red-500/25",
    cardBorder: "border-red-500/50 dark:border-red-500/25",
    glowColor: "rgba(220, 38, 38, 0.15)",
    cardShadow:
      "hover:shadow-[0_20px_50px_rgba(220,38,38,0.18)] dark:hover:shadow-[0_30px_70px_rgba(220,38,38,0.3)]",
    tech: "bg-red-500/20 dark:bg-red-500/10 border-red-500/40 dark:border-red-500/20 text-red-900 dark:text-red-300",
    btnHover:
      "hover:bg-red-600 dark:hover:bg-red-500 hover:text-white hover:shadow-[0_10px_25px_rgba(220,38,38,0.25)] hover:border-red-500/40",
  },
];