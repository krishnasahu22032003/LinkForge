import "dotenv/config" ;

const ENV_SECRETS = {

PORT:process.env.PORT , 
FRONTEND_URL:process.env.FRONTEND_URL,
JWT_SECRET:process.env.JWT_SECRET,
GOOGLE_KEY:process.env.GOOGLE_CLIENT_ID


} ;

export default ENV_SECRETS ;