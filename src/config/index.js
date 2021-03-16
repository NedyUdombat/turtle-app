const commonEnvs = {
  NODE_ENV: process.env.NODE_ENV,
  API_KEY: process.env.API_KEY,
  AUTH_DOMAIN: process.env.AUTH_DOMAIN,
  PROJECT_ID: process.env.PROJECT_ID,
  STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
  APP_ID: process.env.APP_ID,
};

const config = Object.freeze({
  test: {
    ...commonEnvs,
  },
  local: {
    ...commonEnvs,
  },
  development: {
    ...commonEnvs,
  },
  staging: {
    ...commonEnvs,
  },
  production: {
    ...commonEnvs,
  },
});

export default config[commonEnvs.NODE_ENV];
