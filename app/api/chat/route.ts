import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o"), // to process attachment this must be compatible model. gpt-4o works with attachments
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse(); // NOTE: this works without tool calling
}
