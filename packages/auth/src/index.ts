// Types
export type {
  JWTPayload,
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
  AuthTokens,
  AuthConfig,
} from './types';

// Password utilities
export {
  hashPassword,
  verifyPassword,
  validatePassword,
} from './password';

// JWT utilities
export {
  createTokens,
  createAccessToken,
  verifyToken,
  decodeToken,
} from './jwt';

// Middleware
export {
  createAuthMiddleware,
  createOptionalAuthMiddleware,
} from './middleware';
export type { AuthMiddlewareConfig } from './middleware';
