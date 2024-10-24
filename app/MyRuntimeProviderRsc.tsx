"use client";

import {
  type AppendMessage,
  AssistantRuntimeProvider,
  CompositeAttachmentAdapter,
  SimpleImageAttachmentAdapter,
  SimpleTextAttachmentAdapter,
  WebSpeechSynthesisAdapter,
} from "@assistant-ui/react";
import { useVercelRSCRuntime } from "@assistant-ui/react-ai-sdk";
import { useActions, useUIState } from "ai/rsc";
import { nanoid } from "nanoid";

import type { AI } from "./actions";

export function MyRuntimeProviderRsc({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { continueConversation } = useActions();
  const [messages, setMessages] = useUIState<typeof AI>();
  

  const onNew = async (m: AppendMessage) => {
    console.log(m.content);
    console.log(m.attachments); // I get attachment here. 
    const input = m.content[0]?.text;
    setMessages((currentConversation) => [
      ...currentConversation,
      { id: nanoid(), role: "user", display: input },
    ]);

    const message = await continueConversation(input);
    console.log(message);

    setMessages((currentConversation) => [...currentConversation, message]);
  };

  const runtime = useVercelRSCRuntime({
    messages,
    onNew,
    adapters: {
      speech: new WebSpeechSynthesisAdapter(),
      attachments: new CompositeAttachmentAdapter([
        new SimpleImageAttachmentAdapter(),
        new SimpleTextAttachmentAdapter(),
      ]),
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
