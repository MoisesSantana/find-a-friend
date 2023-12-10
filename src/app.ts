import fastify from 'fastify';

import { orgRoutes } from '@/modules/org/routes';
import { petRoutes } from '@/modules/pet/routes';
import { userRoutes } from '@/modules/user/routes';

export const app = fastify();

app.register(orgRoutes);
app.register(petRoutes);
app.register(userRoutes);
