/**
 * JWT Payload type used by auth middleware
 */
export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}
