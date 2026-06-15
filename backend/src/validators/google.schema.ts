import { z } from "zod";

export const GoogleAuthSchema =
    z.object({
        credential: z.string(),
    });