import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "60 s"),
  analytics: true,
  prefix: "@upstash",
});

const Upstash = { redis, ratelimit };

export default Upstash;
