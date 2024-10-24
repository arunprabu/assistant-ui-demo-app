import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o"), // to process attachment this must be compatible model. gpt-4o works with attachments
    messages: convertToCoreMessages(messages),
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
    experimental_telemetry: {
      isEnabled: true,
      functionId: "stream-text",
    },
  });


  return result.toDataStreamResponse(); // NOTE: this works without tool calling
}
