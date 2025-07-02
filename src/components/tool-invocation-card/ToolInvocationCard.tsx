import { useState } from "react";
import { RobotIcon, CaretDownIcon } from "@phosphor-icons/react";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { Tooltip } from "@/components/tooltip/Tooltip";
import { APPROVAL } from "@/shared";
import { useAddToolResult } from "@/store/useChatStore";
import { MessagePartType, ToolInvocationState } from "@/lib/enums";

interface ToolInvocation {
  toolName: string;
  toolCallId: string;
  state: ToolInvocationState;
  step?: number;
  args: Record<string, unknown>;
  result?: {
    content?: Array<{ type: string; text: string }>;
  };
}

interface ToolInvocationCardProps {
  toolInvocation: ToolInvocation;
  toolCallId: string;
  needsConfirmation: boolean;
}

export function ToolInvocationCard({
  toolInvocation,
  toolCallId,
  needsConfirmation,
}: ToolInvocationCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const addToolResult = useAddToolResult();

  return (
    <Card
      className={`p-4 my-3 w-full max-w-[500px] rounded-md bg-neutral-100 dark:bg-neutral-900 ${
        needsConfirmation ? "" : "border-[#F48120]/30"
      } overflow-hidden`}
    >
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 cursor-pointer"
      >
        <div
          className={`${needsConfirmation ? "bg-[#F48120]/10" : "bg-[#F48120]/5"} p-1.5 rounded-full flex-shrink-0`}
        >
          <RobotIcon size={16} className="text-[#F48120]" />
        </div>
        <h4 className="font-medium flex items-center gap-2 flex-1 text-left">
          {toolInvocation.toolName}
          {!needsConfirmation &&
            toolInvocation.state === ToolInvocationState.RESULT && (
              <span className="text-xs text-[#F48120]/70">✓ Completed</span>
            )}
        </h4>
        <CaretDownIcon
          size={16}
          className={`text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`transition-all duration-200 ${isExpanded ? "max-h-[200px] opacity-100 mt-3" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <div
          className="overflow-y-auto"
          style={{ maxHeight: isExpanded ? "180px" : "0px" }}
        >
          <div className="mb-3">
            <h5 className="text-xs font-medium mb-1 text-muted-foreground">
              Arguments:
            </h5>
            <pre className="bg-background/80 p-2 rounded-md text-xs overflow-auto whitespace-pre-wrap break-words max-w-[450px]">
              {JSON.stringify(toolInvocation.args, null, 2)}
            </pre>
          </div>

          {needsConfirmation &&
            toolInvocation.state === ToolInvocationState.CALL && (
              <div className="flex gap-2 justify-end">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    addToolResult({
                      toolCallId,
                      result: APPROVAL.NO,
                    })
                  }
                >
                  Reject
                </Button>
                <Tooltip content={"Accept action"}>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() =>
                      addToolResult({
                        toolCallId,
                        result: APPROVAL.YES,
                      })
                    }
                  >
                    Approve
                  </Button>
                </Tooltip>
              </div>
            )}

          {!needsConfirmation &&
            toolInvocation.state === ToolInvocationState.RESULT && (
              <div className="mt-3 border-t border-[#F48120]/10 pt-3">
                <h5 className="text-xs font-medium mb-1 text-muted-foreground">
                  Result:
                </h5>
                <pre className="bg-background/80 p-2 rounded-md text-xs overflow-auto whitespace-pre-wrap break-words max-w-[450px]">
                  {(() => {
                    const result = toolInvocation.result;
                    if (typeof result === "object" && result.content) {
                      return result.content
                        .map((item: { type: string; text: string }) => {
                          if (
                            item.type === MessagePartType.TEXT &&
                            item.text.startsWith("\n~ Page URL:")
                          ) {
                            const lines = item.text.split("\n").filter(Boolean);
                            return lines
                              .map(
                                (line: string) =>
                                  `- ${line.replace("\n~ ", "")}`
                              )
                              .join("\n");
                          }
                          return item.text;
                        })
                        .join("\n");
                    }
                    return JSON.stringify(result, null, 2);
                  })()}
                </pre>
              </div>
            )}
        </div>
      </div>
    </Card>
  );
}
