import dotenv from "dotenv";

// dotenv enables the usage of the .env file
dotenv.config();

const {
  env: { USE_COOKIES, COOKIE_ENCRYPTION_SECRET, PORT, NODE_ENV }
} = process;

export const cookiesConfig = {
  enabled: USE_COOKIES == "true",
  secret: COOKIE_ENCRYPTION_SECRET
};

export const appConfig = {
  env: NODE_ENV,
  port: PORT || 3000
};

export function isProdEnv() {
  return appConfig.env == "prod";
}
