import { Module, Global } from '@nestjs/common';
import { createClient } from 'redis';
import { DatabaseService } from './database.service';
import { REDIS_HOST, REDIS_PORT } from 'src/constants';
import { LoggerService } from 'src/logger/logger.service';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: 'DatabaseClient',
      useFactory: async () => {
        const logger = new LoggerService('DatabaseClient');
        const client = createClient({
          url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
        });

          await client
            .on('error', (err) => {
              logger.error('Redis Error:', err);
            })
            .connect();

          return client;
      },
    },
    DatabaseService,
  ],
  exports: ['DatabaseClient', DatabaseService],
})
export class DatabaseModule {}
