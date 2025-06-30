import { useEffect, useRef } from "react";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageList } from "@/components/chat/MessageList";
import { InputArea } from "@/components/chat/InputArea";
import { HasOpenAIKey } from "@/components/chat/HasOpenAIKey";
import {
  useSetAgentChat,
  useMessages,
  useSetPendingToolCallConfirmation,
} from "@/store/useChatStore";
import { useAgent } from "agents/react";
import { useAgentChat } from "agents/ai-react";
import type { Message } from "@ai-sdk/react";
import { MessagePartType, ToolInvocationState } from "@/lib/enums";
import { toolsRequiringConfirmation } from "./shared";

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize agent hooks at the top level
  const agent = useAgent({ agent: "chat" });
  const agentChat = useAgentChat({
    agent,
    maxSteps: 5,
  });

  // Inject agent and agentChat into the store
  const setAgentChat = useSetAgentChat();
  useEffect(() => {
    setAgentChat(agent, agentChat);
  }, [agent, agentChat]);

  // Get state and actions from the store
  const messages = useMessages();
  const setPendingToolCallConfirmation = useSetPendingToolCallConfirmation();

  // Check for pending tool call confirmations
  useEffect(() => {
    const hasPendingConfirmation = messages.some((m: Message) =>
      m.parts?.some(
        (part: any) =>
          part?.type === MessagePartType.TOOL_INVOCATION &&
          part.toolInvocation?.state === ToolInvocationState.CALL &&
          part.toolInvocation.toolName &&
          toolsRequiringConfirmation.includes(part.toolInvocation.toolName)
      )
    );
    setPendingToolCallConfirmation(hasPendingConfirmation);
  }, [messages, setPendingToolCallConfirmation]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="h-[100vh] w-full p-4 flex justify-center items-center bg-fixed overflow-hidden">
      <HasOpenAIKey />
      <div className="h-[calc(100vh-2rem)] w-full mx-auto max-w-lg flex flex-col shadow-xl rounded-md overflow-hidden relative border border-neutral-300 dark:border-neutral-800">
        <ChatHeader />
        <MessageList messagesEndRef={messagesEndRef} />
        <div ref={messagesEndRef} />
        <InputArea />
      </div>
    </div>
  );
}
