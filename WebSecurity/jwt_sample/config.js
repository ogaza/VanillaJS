import dotenv from "dotenv";

// dotenv enables the usage of the .env file
dotenv.config();

const {
  env: {
    JWT_SAMPLE__USE_COOKIES,
    JWT_SAMPLE__COOKIE_ENCRYPTION_SECRET,
    JWT_SAMPLE__JWT_ENCRYPTION_SECRET,
    JWT_SAMPLE__PORT,
    JWT_SAMPLE__NODE_ENV
  }
} = process;

export const cookiesConfig = {
  enabled: JWT_SAMPLE__USE_COOKIES == "true",
  secret: JWT_SAMPLE__COOKIE_ENCRYPTION_SECRET
};

export const jwtConfig = {
  secret: JWT_SAMPLE__JWT_ENCRYPTION_SECRET
};

export const appConfig = {
  env: JWT_SAMPLE__NODE_ENV,
  port: JWT_SAMPLE__PORT || 3000
};

export function isProdEnv() {
  return appConfig.env == "prod";
}
