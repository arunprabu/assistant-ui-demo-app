
import { MarkdownText } from "@/components/ui/assistant-ui/markdown-text";
import { Thread } from "@assistant-ui/react";

const ChatPage = () => {
  return (
    <div>
      <h1>Chat Page</h1>
      <Thread
        assistantMessage={{ components: { Text: MarkdownText } }}
      />
    </div>
  );
}

export default ChatPage;