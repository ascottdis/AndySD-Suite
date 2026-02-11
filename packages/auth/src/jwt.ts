import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";

export type JwtPayload = string | object | Buffer;

function getSecret(): Secret {
  const v = process.env.JWT_SECRET;
  if (!v) throw new Error("JWT_SECRET is required");
  return v as Secret;
}

function getExpiresInDefault(): StringValue {
  return (process.env.JWT_EXPIRES_IN ?? "7d") as unknown as StringValue;
}

function getRefreshExpiresInDefault(): StringValue {
  return (process.env.JWT_REFRESH_EXPIRES_IN ?? "30d") as unknown as StringValue;
}

/** Low-level sign helper (preferred) */
export function signJwt(payload: JwtPayload, options?: Partial<SignOptions>) {
  const opts: SignOptions = {
    expiresIn: getExpiresInDefault(),
    ...options,
  };
  return jwt.sign(payload, getSecret(), opts);
}

/** Low-level verify helper (preferred) */
export function verifyJwt<T = any>(token: string): T {
  return jwt.verify(token, getSecret()) as T;
}

/** Back-compat: create access token */
export function createAccessToken(payload: JwtPayload, expiresIn?: StringValue | number) {
  return signJwt(payload, { expiresIn: expiresIn ?? getExpiresInDefault() });
}

/** Back-compat: verify token (throws if invalid) */
export function verifyToken<T = any>(token: string): T {
  return verifyJwt<T>(token);
}

/** Back-compat: decode token (no verification) */
export function decodeToken<T = any>(token: string): T | null {
  return jwt.decode(token, { json: true }) as T | null;
}

/** Back-compat: create access + refresh */
export function createTokens(payload: JwtPayload, opts?: { accessExpiresIn?: StringValue | number; refreshExpiresIn?: StringValue | number }) {
  const accessToken = createAccessToken(payload, opts?.accessExpiresIn ?? getExpiresInDefault());
  const refreshToken = signJwt(payload, { expiresIn: opts?.refreshExpiresIn ?? getRefreshExpiresInDefault() });
  return { accessToken, refreshToken };
}
