"use client";

import { Weather } from "@/components/tool-ui/Weather";
import {
  AssistantRuntimeProvider,
  CompositeAttachmentAdapter,
  SimpleImageAttachmentAdapter,
  SimpleTextAttachmentAdapter,
  useEdgeRuntime,
  WebSpeechSynthesisAdapter,
} from "@assistant-ui/react";

export function MyRunTimeProviderUseChat({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The following works well with speech and attachment
  const runtime = useEdgeRuntime({
    api: "/api/chat",
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
      <Weather />
      {children}
    </AssistantRuntimeProvider>
  );
}
