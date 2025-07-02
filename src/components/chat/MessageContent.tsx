import { Card } from "@/components/card/Card";
import { MemoizedMarkdown } from "@/components/memoized-markdown";
import { ToolInvocationCard } from "@/components/tool-invocation-card/ToolInvocationCard";
import { toolsRequiringConfirmation } from "@/shared";
import { MessagePartType } from "@/lib/enums";

interface MessageContentProps {
  part: any;
  isUser: boolean;
  showDebug: boolean;
}

export function MessageContent({
  part,
  isUser,
  showDebug,
}: MessageContentProps) {
  if (part.type === MessagePartType.TEXT) {
    return (
      <div>
        <Card
          className={`p-3 rounded-md bg-neutral-100 dark:bg-neutral-900 ${
            isUser
              ? "rounded-br-none"
              : "rounded-bl-none border-assistant-border"
          } ${
            part.text.startsWith("scheduled message") ? "border-accent/50" : ""
          } relative`}
        >
          {part.text.startsWith("scheduled message") && (
            <span className="absolute -top-3 -left-2 text-base">🕒</span>
          )}
          <MemoizedMarkdown
            id={`${part.id}`}
            content={part.text.replace(/^scheduled message: /, "")}
          />
        </Card>
      </div>
    );
  }

  if (part.type === MessagePartType.TOOL_INVOCATION) {
    const toolInvocation = part.toolInvocation;
    const toolCallId = toolInvocation.toolCallId;
    const needsConfirmation = toolsRequiringConfirmation.includes(
      toolInvocation.toolName
    );

    // Skip rendering the card in debug mode
    if (showDebug) return null;

    return (
      <ToolInvocationCard
        key={toolCallId}
        toolInvocation={toolInvocation}
        toolCallId={toolCallId}
        needsConfirmation={needsConfirmation}
      />
    );
  }

  return null;
}
