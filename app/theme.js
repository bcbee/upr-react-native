// Design tokens mirrored from the UPR website (Universal-Presenter-Remote-Server
// src/public/stylesheets/style.less). Keep the two in sync when the palette changes.

export const colors = {
  // Accent (magenta-purple)
  accent: "#A824A8",
  accentHover: "#B42EB4",
  accentActive: "#9A1F9A",
  accentDark: "#7E1B7E",
  accentSoft: "#F1E6FA",

  // Light surfaces
  bg: "#EDEAF2",
  card: "#FFFFFF",
  section: "#FAF9FB",
  section2: "#F7F5F9",

  // Dark surfaces (control stage)
  dark: "#1B1620",
  dark2: "#161219",
  darkPanel: "#2A232F",
  darkPanelHover: "#332B39",
  darkPanelActive: "#3A3140",

  // Ink / text
  ink: "#1B1620",
  inkSoft: "#3A3340",
  muted: "#5B5164",
  muted2: "#8A7E96",
  border: "#ECE8F0",

  // Status
  green: "#39C07E",
  greenInk: "#2C9E67",
  danger: "#C0392B",
  waitingDot: "#C9A2D6",

  // Disabled button
  disabledBg: "#EEE9F2",
  disabledText: "#B7ADC0",

  // On-dark translucents
  onDark: "#FFFFFF",
  onDarkSoft: "rgba(255,255,255,0.72)",
  onDarkFaint: "rgba(255,255,255,0.45)",
  onDarkFill: "rgba(255,255,255,0.08)",
  onDarkFillHover: "rgba(255,255,255,0.14)",
  onDarkBorder: "rgba(255,255,255,0.12)",
};

export const fonts = {
  display: "Manrope_800ExtraBold",
  displayBold: "Manrope_700Bold",
  body: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemiBold: "Inter_600SemiBold",
  bodyBold: "Inter_700Bold",
};

export const radii = {
  button: 9,
  card: 18,
  tokenDigit: 13,
  tile: 16,
  pill: 999,
  row: 9,
  ghost: 8,
};

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 40,
};
