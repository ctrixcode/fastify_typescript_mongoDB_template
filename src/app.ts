import Fastify from 'fastify';
import helmet from '@fastify/helmet';
import multipart from '@fastify/multipart';
import dotenv from 'dotenv';
import {
  corsPlugin,
  rateLimiterPlugin,
  loggingPlugin,
  errorHandlerPlugin,
  sanitizerPlugin,
} from './middlewares';
import mongoPlugin from './config/db';
import routes from './routes/index';

dotenv.config();

const app = Fastify({ logger: false });

// Register plugins
app.register(mongoPlugin);
app.register(helmet);
app.register(multipart);
app.register(loggingPlugin);
app.register(corsPlugin);
app.register(rateLimiterPlugin);
app.register(sanitizerPlugin);
app.register(errorHandlerPlugin);

// Register routes
app.register(routes, { prefix: '/api' });

export default app;
