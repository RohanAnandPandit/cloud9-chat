import { unstable_getSchedulePrompt } from "agents/schedule";

/**
 * System prompt for the main chat assistant
 */
export function getSystemPrompt(date: Date = new Date()): string {
  return `You are a helpful assistant that can do various tasks... 

${unstable_getSchedulePrompt({ date })}

If the user asks to schedule a task, use the schedule tool to schedule the task.
`;
}

/**
 * Task execution message template
 */
export function getTaskExecutionMessage(description: string): string {
  return `Running scheduled task: ${description}`;
}
