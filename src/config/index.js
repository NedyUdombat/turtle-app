const commonEnvs = {
  NODE_ENV: process.env.NODE_ENV,
  APIKEY: process.env.APIKEY,
  AUTHDOMAIN: process.env.AUTHDOMAIN,
  PROJECTID: process.env.PROJECTID,
  STORAGEBUCKET: process.env.STORAGEBUCKET,
  MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
  APPID: process.env.MESSAGINGSENDERID,
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
