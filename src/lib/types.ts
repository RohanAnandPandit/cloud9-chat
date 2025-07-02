import type { tools } from "../tools";

/**
 * Type for the array of tool names that require user confirmation before execution.
 * These should match the keys in the tools object from tools.ts
 */
export type ToolsRequiringConfirmation = (keyof typeof tools)[];

/**
 * Type for the response from the OpenAI API key check endpoint
 */
export interface OpenAICheckResponse {
  success: boolean;
}

/**
 * Props for the Chat component
 */
export interface ChatProps {
  // Add any props if needed in the future
}

export type ToolResult = { toolCallId: string; result: string };
