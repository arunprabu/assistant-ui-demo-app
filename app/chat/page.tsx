import { Thread } from "@assistant-ui/react";
import { MyRunTimeProviderUseChat } from "../MyRuntimeProviderUseChat";


const ChatPage = () => {
  return (
    <div>
      <h1>Chat Page</h1>
      <MyRunTimeProviderUseChat>
        <Thread />
      </MyRunTimeProviderUseChat>
    </div>
  );
}

export default ChatPage;