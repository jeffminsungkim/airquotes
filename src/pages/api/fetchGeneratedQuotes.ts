import type { OpenAIStreamPayload } from "@/lib/OpenAIStream";
import { OpenAIStream } from "@/lib/OpenAIStream";

import ratelimit from "@/lib/upstash";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const clientIp = req.headers.get("x-forwarded-for") as string;
  const { success } = await ratelimit.limit(clientIp);

  console.log("ratelimit:", success);

  if (!success) return new Response("TOO_MANY_REQUESTS", { status: 429 });

  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("Prompt is missing", { status: 400 });
  }

  console.log("prompt:", prompt);

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
