import Fastify from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod';

const app = Fastify({ logger: true });

app.register(cors);

// ============================================
// IN-MEMORY DATA STORE (Replace with DB later)
// ============================================
interface Gig {
  id: number;
  provider: string;
  payout: number;
  address: string;
  status: string;
  createdAt: string;
}

let gigs: Gig[] = [
  { id: 1, provider: 'DoorDash', payout: 12, address: '123 Main St', status: 'pending', createdAt: new Date().toISOString() },
  { id: 2, provider: 'Instacart', payout: 25, address: '456 Oak Ave', status: 'pending', createdAt: new Date().toISOString() },
];

let nextId = 3;

// ============================================
// VALIDATION SCHEMAS
// ============================================
const createGigSchema = z.object({
  provider: z.string().min(1),
  payout: z.number().positive(),
  address: z.string().min(1),
  status: z.string().optional().default('pending'),
});

const updateGigSchema = z.object({
  provider: z.string().optional(),
  payout: z.number().positive().optional(),
  address: z.string().optional(),
  status: z.string().optional(),
});

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/health', async () => {
  return { status: 'ok', app: 'giggin-api' };
});

// LIST all gigs
app.get('/gigs', async () => {
  return { gigs };
});

// GET single gig
app.get('/gigs/:id', async (req, reply) => {
  const { id } = req.params as { id: string };
  const gig = gigs.find(g => g.id === Number(id));
  if (!gig) {
    return reply.status(404).send({ error: 'Gig not found' });
  }
  return { gig };
});

// CREATE gig
app.post('/gigs', async (req, reply) => {
  try {
    const data = createGigSchema.parse(req.body);
    const newGig: Gig = {
      id: nextId++,
      provider: data.provider,
      payout: data.payout,
      address: data.address,
      status: data.status,
      createdAt: new Date().toISOString(),
    };
    gigs.push(newGig);
    return reply.status(201).send({ gig: newGig });
  } catch (err) {
    return reply.status(400).send({ error: 'Invalid data', details: err });
  }
});

// UPDATE gig
app.patch('/gigs/:id', async (req, reply) => {
  const { id } = req.params as { id: string };
  const index = gigs.findIndex(g => g.id === Number(id));
  if (index === -1) {
    return reply.status(404).send({ error: 'Gig not found' });
  }
  try {
    const data = updateGigSchema.parse(req.body);
    gigs[index] = { ...gigs[index], ...data };
    return { gig: gigs[index] };
  } catch (err) {
    return reply.status(400).send({ error: 'Invalid data', details: err });
  }
});

// DELETE gig
app.delete('/gigs/:id', async (req, reply) => {
  const { id } = req.params as { id: string };
  const index = gigs.findIndex(g => g.id === Number(id));
  if (index === -1) {
    return reply.status(404).send({ error: 'Gig not found' });
  }
  gigs.splice(index, 1);
  return { deleted: true };
});

// ============================================
// START SERVER
// ============================================
const start = async () => {
  try {
    await app.listen({ port: 4002, host: '0.0.0.0' });
    console.log('✅ giggin-api running on http://localhost:4002');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();