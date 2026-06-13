import { OAuth2Client } from "google-auth-library";
import ENV_SECRETS from "./ENV.js";

export const googleClient = new OAuth2Client(ENV_SECRETS.GOOGLE_KEY) ; 

