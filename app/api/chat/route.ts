import { ToolInvocation, convertToCoreMessages, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

interface Message {
  role: "user" | "assistant";
  content: string;
  toolInvocations?: ToolInvocation[];
}

function getWeather({ city, unit }) {
  return { value: 25, description: "Sunny" };
}

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o"),
    messages: convertToCoreMessages(messages),
    tools: {
      displayWeather: {
        description: "Display the weather for a location",
        parameters: z.object({
          latitude: z.number(),
          longitude: z.number(),
        }),
        execute: async function ({ latitude, longitude }) {
          const props = await getWeather({ latitude, longitude });
          return props;
        },
      },
    },
    maxSteps: 5, // allow up to 5 steps
    onFinish: async ({ responseMessages }) => {
      // Save Chat -
      // Refer: https://sdk.vercel.ai/examples/next/state-management/save-messages
      // try {
      //   await saveChat({
      //     id,
      //     messages: [...coreMessages, ...responseMessages],
      //   });
      // } catch (error) {
      //   console.error("Failed to save chat");
      // }
    },
    experimental_telemetry: {
      isEnabled: true,
      functionId: "stream-text",
    },
  });

  return result.toDataStreamResponse();
}
