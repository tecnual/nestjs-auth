export interface NestjsAuthPayload {
  username: string,
  userId: string,
  iat: number,
  exp: number
}