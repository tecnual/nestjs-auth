export interface NestjsAuthConfigP {
  loglevel?: string
  testEndpointEnabled?: boolean
  providerUrl?: string
  providerRealm?: string
  providerAdminUser?: string
  providerAdminPassword?: string
  jwtSecret?: string
  jwtExpiresIn?: string
  verbose?: boolean
}

export interface NestjsAuthConfig {
  port?: number,
  JWTSecret?: string,
  JWTExpiresIn?: string,
  database: {
      username?: string,
      password?: string,
      dbName?: string,
      url?: string
  },
  environment: string,
  verbose: boolean,
  test: string
}

export interface NestjsAuthOptions {
  config: NestjsAuthConfig
}