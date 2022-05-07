interface AuthConfigParameters {
  port?: number,
  JWTSecret: string,
  database: {
      username: string,
      password: string,
      dbName: string
  },
  environment: string,
  verbose: boolean  
}

export default (): AuthConfigParameters => ({
  //port: parseInt(process.env.PORT, 10) || 3000,
  JWTSecret: process.env.JWT_SECRET || 'supersecret',
  database: {
      username: process.env.DATABASE_USERNAME || 'username',
      password: process.env.DATABASE_PASSWORD || 'pass',
      dbName: process.env.DATABASE_NAME || 'dbName'
  },
  environment: process.env.NODE_ENV || 'production',
  verbose: JSON.parse(process.env.AUTH_VERBOSE) || false
});