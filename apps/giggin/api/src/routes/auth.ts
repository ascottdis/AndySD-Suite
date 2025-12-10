import type { FastifyInstance } from 'fastify';
import { eq } from 'drizzle-orm';
import { users } from '@andysd/db/schema';
import {
  hashPassword,
  verifyPassword,
  validatePassword,
  createTokens,
  verifyToken,
} from '@andysd/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

interface RegisterBody {
  email: string;
  password: string;
  name?: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export async function authRoutes(fastify: FastifyInstance) {
  // Register
  fastify.post<{ Body: RegisterBody }>('/auth/register', async (request, reply) => {
    const db = (fastify as any).db;
    if (!db) return reply.status(500).send({ error: 'Server Error', message: 'Database not initialized' });
    const { email, password, name } = request.body;

    if (!email || !password) {
      return reply.status(400).send({
        error: 'Bad Request',
        message: 'Email and password are required',
      });
    }

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      return reply.status(400).send({
        error: 'Bad Request',
        message: 'Password does not meet requirements',
        details: passwordCheck.errors,
      });
    }

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (existing.length > 0) {
      return reply.status(409).send({
        error: 'Conflict',
        message: 'User with this email already exists',
      });
    }

    const passwordHash = await hashPassword(password);

    const [newUser] = await db
      .insert(users)
      .values({
        email: email.toLowerCase(),
        passwordHash,
        name,
      })
      .returning();

    const tokens = createTokens(
      { userId: newUser.id, email: newUser.email },
      { jwtSecret: JWT_SECRET }
    );

    return reply.status(201).send({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      ...tokens,
    });
  });

  // Login
  fastify.post<{ Body: LoginBody }>('/auth/login', async (request, reply) => {
    const { email, password } = request.body;

    if (!email || !password) {
      return reply.status(400).send({
        error: 'Bad Request',
        message: 'Email and password are required',
      });
    }

    const db = (fastify as any).db;
    if (!db) return reply.status(500).send({ error: 'Server Error', message: 'Database not initialized' });
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (!user) {
      return reply.status(401).send({
        error: 'Unauthorized',
        message: 'Invalid email or password',
      });
    }

    const validPassword = await verifyPassword(password, user.passwordHash);

    if (!validPassword) {
      return reply.status(401).send({
        error: 'Unauthorized',
        message: 'Invalid email or password',
      });
    }

    const tokens = createTokens(
      { userId: user.id, email: user.email },
      { jwtSecret: JWT_SECRET }
    );

    return reply.send({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      ...tokens,
    });
  });

  // Get current user
  fastify.get('/auth/me', async (request, reply) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.status(401).send({
        error: 'Unauthorized',
        message: 'Missing authorization header',
      });
    }

    const [, token] = authHeader.split(' ');
    const payload = verifyToken(token, JWT_SECRET);

    if (!payload) {
      return reply.status(401).send({
        error: 'Unauthorized',
        message: 'Invalid or expired token',
      });
    }

    const db = (fastify as any).db;
    if (!db) return reply.status(500).send({ error: 'Server Error', message: 'Database not initialized' });
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, payload.userId))
      .limit(1);

    if (!user) {
      return reply.status(404).send({
        error: 'Not Found',
        message: 'User not found',
      });
    }

    return reply.send({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  });
}
