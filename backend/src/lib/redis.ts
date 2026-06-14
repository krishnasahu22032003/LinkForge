import { Redis } from "@upstash/redis";
import ENV_SECRETS from "./ENV.js";

const redis = new Redis({
    url:ENV_SECRETS.REDIS_URL as string,
    token:ENV_SECRETS.REDIS_TOKEN
});

export default redis ;