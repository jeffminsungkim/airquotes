import type { OpenAIStreamPayload } from "@/lib/OpenAIStream";
import { OpenAIStream } from "@/lib/OpenAIStream";
import Upstash from "@/lib/upstash";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const clientIp = req.headers.get("x-forwarded-for") as string;
  const { success } = await Upstash.ratelimit.limit(clientIp);

  console.log("ratelimit:", success, clientIp);

  if (!success) return new Response("TOO_MANY_REQUESTS", { status: 429 });

  const { prompt, context } = (await req.json()) as {
    prompt?: string;
    context: string;
  };

  if (!prompt) {
    return new Response("Prompt is missing", { status: 400 });
  }

  const contextKey = `@upstash/context:${clientIp}`;
  const cachedQuotes = await Upstash.redis.get<string>(contextKey);

  const previousContext = `${cachedQuotes ? cachedQuotes : ""}`;

  if (cachedQuotes) {
    await Upstash.redis.del(contextKey);
  }

  await Upstash.redis.set<string>(contextKey, context, { ex: 1800 });

  const content = `${prompt} Make sure not to include any further details ${
    cachedQuotes ? `and exclude the following quotes: ${previousContext}` : "."
  }`;

  console.log("prompt:", content);

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content }],
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
