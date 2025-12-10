import jwt from 'jsonwebtoken';
import type { JWTPayload, AuthConfig, AuthTokens } from './types';

const DEFAULT_ACCESS_EXPIRY = '15m';
const DEFAULT_REFRESH_EXPIRY = '7d';

/**
 * Create access and refresh tokens
 */
export function createTokens(
  payload: Omit<JWTPayload, 'iat' | 'exp'>,
  config: AuthConfig
): AuthTokens {
  const accessToken = jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.accessTokenExpiry || DEFAULT_ACCESS_EXPIRY,
  });

  const refreshToken = jwt.sign(
    { userId: payload.userId, type: 'refresh' },
    config.jwtSecret,
    {
      expiresIn: config.refreshTokenExpiry || DEFAULT_REFRESH_EXPIRY,
    }
  );

  return { accessToken, refreshToken };
}

/**
 * Create only an access token
 */
export function createAccessToken(
  payload: Omit<JWTPayload, 'iat' | 'exp'>,
  config: AuthConfig
): string {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.accessTokenExpiry || DEFAULT_ACCESS_EXPIRY,
  });
}

/**
 * Verify and decode a token
 */
export function verifyToken(
  token: string,
  secret: string
): JWTPayload | null {
  try {
    return jwt.verify(token, secret) as JWTPayload;
  } catch {
    return null;
  }
}

/**
 * Decode token without verification (for debugging)
 */
export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
}
