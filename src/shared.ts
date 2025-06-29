import type { tools } from "./tools";

// Approval string to be shared across frontend and backend
export const APPROVAL = {
  YES: "Yes, confirmed.",
  NO: "No, denied.",
} as const;

export const toolsRequiringConfirmation: (keyof typeof tools)[] = [
  "getWeatherInformation",
];