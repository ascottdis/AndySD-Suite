import { FastifyInstance } from 'fastify';

export default async (fastify: FastifyInstance) => {
  // POST /api/pricing/calculate — Calculate ROI and recommended price
  fastify.post<{ Body: any }>('/calculate', async (request, reply) => {
    const body = request.body as any;
    const { costPrice = 30, shippingCost = 5, platformFees = 0.12 } = body;

    const basePrice = costPrice / (1 - platformFees);
    const profit = basePrice - costPrice - shippingCost - basePrice * platformFees;
    const roi = (profit / costPrice) * 100;

    return {
      costPrice,
      suggestedListPrice: Math.round(basePrice * 100) / 100,
      estimatedProfit: Math.round(profit * 100) / 100,
      estimatedROI: Math.round(roi),
      confidence: 85,
    };
  });

  // GET /api/pricing/comps — Fetch price comps
  fastify.get<{ Querystring: Record<string, any> }>('/comps', async (request, reply) => {
    return {
      comps: [
        { price: 49.99, status: 'sold', date: '2024-12-08' },
        { price: 52.00, status: 'sold', date: '2024-12-07' },
        { price: 45.00, status: 'active', date: '2024-12-09' },
      ],
      avgPrice: 48.99,
      medianPrice: 49.99,
    };
  });
};
