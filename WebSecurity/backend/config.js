import dotenv from "dotenv";

// dotenv enables the usage of the .env file
dotenv.config();

const {
  env: { USE_COOKIES, COOKIE_ENCRYPTION_SECRET, PORT }
} = process;

export const cookiesConfig = {
  enabled: USE_COOKIES == "true",
  secret: COOKIE_ENCRYPTION_SECRET
};

export const appConfig = {
  port: PORT || 3000
};
