
export enum ThemeMode {
    LIGHT = "light",
    DARK = "dark"
}

export enum MessagePartType {
    TEXT = "text",
    TOOL_INVOCATION = "tool-invocation",
    TOOL_RESULT = "tool-result"
}

export enum ToolInvocationState {
    CALL = "call",
    RESULT = "result",
    PARTIAL_CALL = "partial-call"
}

export enum ScheduleWhenType {
    NO_SCHEDULE = "no-schedule",
    SCHEDULED = "scheduled",
    DELAYED = "delayed",
    CRON = "cron"
}