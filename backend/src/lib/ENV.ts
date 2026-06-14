import "dotenv/config" ;

const ENV_SECRETS = {

PORT:process.env.PORT , 
FRONTEND_URL:process.env.FRONTEND_URL,
JWT_SECRET:process.env.JWT_SECRET,
GOOGLE_KEY:process.env.GOOGLE_CLIENT_ID,
BASE_URL:process.env.BASE_URL,
REDIS_URL:process.env.UPSTASH_REDIS_REST_URL,
REDIS_TOKEN:process.env.UPSTASH_REDIS_REST_TOKEN
} ;

export default ENV_SECRETS ;