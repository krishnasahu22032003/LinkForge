import "dotenv/config" ;

const ENV_SECRETS = {

BACKEND_BASE_URL:process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
GOOGLE_CLIENT_ID:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,

};

export default ENV_SECRETS ;