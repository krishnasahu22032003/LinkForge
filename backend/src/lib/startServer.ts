import type { Express } from "express";
import ENV_SECRETS from "./ENV.js";

export default function startServer(app: Express) {

    const http_port = ENV_SECRETS.PORT;

    try {

        app.listen(http_port, () => { console.log(`App running on ${http_port}`) });

    } catch (err) {

        console.error((err as Error).message, "Internal server error");
        process.exit(1);
    };

}