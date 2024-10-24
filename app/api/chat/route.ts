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
  const { id, messages }: { id: string; messages: Array<Message> } =
    await req.json();

  const coreMessages = convertToCoreMessages(messages);
  console.log(coreMessages);

  const result = await streamText({
    model: openai("gpt-4o"),
    messages: coreMessages,
    tools: {
      getWeather: {
        description: "Get the weather for a location",
        parameters: z.object({
          city: z.string().describe("The city to get the weather for"),
          unit: z
            .enum(["C"])
            .describe("The unit to display the temperature in"),
        }),
        execute: async ({ city, unit }) => {
          const weather = {
            value: 24,
            description: "Sunny",
          };

          return `It is currently ${weather.value}°${unit} and ${weather.description} in ${city}!`;
        },
      },
    },
    maxSteps: 5, // allow up to 5 steps
    onFinish: async ({ responseMessages }) => {
      console.log(JSON.stringify(responseMessages));
      console.log(id);

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
