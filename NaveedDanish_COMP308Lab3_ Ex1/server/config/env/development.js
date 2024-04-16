// Development configuration options
// To sign the session identifier, use a secret string
const config = {
  //authDb: "mongodb://0.0.0.0:27017/authMicroservices",
  //vitalSignDb: "mongodb://0.0.0.0:27017/vitalMicroservices",
  sessionSecret: "developmentSessionSecret",
  secretKey: "developmentSecretKey",
};

export default config;
