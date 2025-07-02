import type { Message } from "@ai-sdk/react";
import { Avatar } from "@/components/avatar/Avatar";
import { MessageContent } from "./MessageContent";

interface MessageItemProps {
  message: Message;
  isUser: boolean;
  showAvatar: boolean;
  showDebug: boolean;
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export function MessageItem({
  message,
  isUser,
  showAvatar,
  showDebug,
}: MessageItemProps) {
  return (
    <div>
      {showDebug && (
        <pre className="text-xs text-muted-foreground overflow-scroll">
          {JSON.stringify(message, null, 2)}
        </pre>
      )}
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`flex gap-2 max-w-[85%] ${
            isUser ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {showAvatar && !isUser ? (
            <Avatar username={"AI"} />
          ) : (
            !isUser && <div className="w-8" />
          )}

          <div>
            <div>
              {message.parts?.map((part, i) => (
                <div key={i}>
                  <MessageContent
                    part={part}
                    isUser={isUser}
                    showDebug={showDebug}
                  />
                  {part.type === "text" && (
                    <p
                      className={`text-xs text-muted-foreground mt-1 ${
                        isUser ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTime(
                        new Date(message.createdAt as unknown as string)
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
