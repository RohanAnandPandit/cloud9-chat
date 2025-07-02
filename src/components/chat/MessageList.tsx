import { useChatStore, useMessages } from "@/store/useChatStore";
import { MessageItem } from "./MessageItem";
import { WelcomeMessage } from "./WelcomeMessage";
import type { Message } from "@ai-sdk/react";

interface MessageListProps {
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function MessageList({ messagesEndRef }: MessageListProps) {
  const { showDebug } = useChatStore();
  const messages = useMessages();

  if (messages.length === 0) {
    return <WelcomeMessage />;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 max-h-[calc(100vh-10rem)]">
      {messages.map((message: Message, index: number) => {
        const isUser = message.role === "user";
        const showAvatar =
          index === 0 || messages[index - 1]?.role !== message.role;

        return (
          <MessageItem
            key={message.id}
            message={message}
            isUser={isUser}
            showAvatar={showAvatar}
            showDebug={showDebug}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
