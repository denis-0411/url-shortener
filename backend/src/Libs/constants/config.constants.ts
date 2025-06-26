export const configKeys = {
  port: 'APP_PORT',
  version: 'APP_VERSION',
  serviceName: 'SERVICE_NAME',
  isDev: 'IS_DEV',
  baseCurrency: 'BASE_CURRENCY',
  secretKey: 'SECRET_KEY',
  mongodbUrl: 'MONGODB_URL',
  activeCurrencies: 'ACTIVE_CURRENCIES',
  root: {
    email: 'ADMIN_EMAIL',
    password: 'ADMIN_PASSWORD',
  },
  db: {
    host: 'DB_HOST',
    port: 'DB_PORT',
    username: 'DB_USERNAME',
    password: 'DB_PASSWORD',
    database: 'DB_DATABASE',
  },
  code: {
    useStaticCode: 'USE_STATIC_CODE',
    staticCode: 'STATIC_CODE',
    expirationS: 'CODE_EXPIRATION_S',
    maxAttempts: 'CODE_MAX_VERIFICATION_ATTEMPTS',
  },
  email: {
    host: 'EMAIL_HOST',
    port: 'EMAIL_PORT',
    user: 'EMAIL_USER',
    password: 'EMAIL_PASSWORD',
    noreply: 'EMAIL_NOREPLY',
  },
  jwt: {
    secret: 'JWT_SECRET',
    accessTokenExpiresIn: 'JWT_ACCESS_TOKEN_EXPIRES_IN',
    refreshTokenExpirationS: 'JWT_REFRESH_TOKEN_EXPIRATION_S',
  },
  redis: {
    url: 'REDIS_URL',
  },
  connectionToken: {
    expirationS: 'CONNECTION_TOKEN_EXPIRATION_S'
  },
  sumsub: {
    baseUrl: 'SUMSUB_BASE_URL',
    appToken: 'SUMSUB_APP_TOKEN',
    secret: 'SUMSUB_SECRET_KEY',
    webhookSecret: 'SUMSUB_WEBHOOK_SECRET',
    levelName: 'SUMSUB_LEVEL_NAME'
  },
  opex: {
    url: 'OPENEXCHANGE_URL',
    appId: 'OPENEXCHANGE_APP_ID'
  },
  cbr: {
    url: 'CBR_URL'
  },
  s3: {
    region: 'S3_REGION',
    bucketName: 'S3_BUCKET_NAME',
    endpoint: 'S3_ENDPOINT',
  },
  acquiring: {
    appId: 'ACQUIRING_APP_ID',
    webhookUrl: 'ACQUIRING_WEBHOOK_URL',
    secretKey: 'ACQUIRING_SECRET_KEY',
    url: 'ACQUIRING_URL',
  },
  aml: {
    url: 'AML_URL',
    accessId: 'AML_ACCESS_ID',
    accessKey: 'AML_ACCESS_KEY',
  }
};
