import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import { Entity, Repository, Schema } from 'redis-om';
import { RedisClientType } from 'redis';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  constructor(
    @Inject('DatabaseClient') private readonly redisClient: RedisClientType,
  ) {}

  async getRepository<T extends Entity>(
    schema: Schema<T>,
  ): Promise<Repository<T>> {
    const repository = new Repository(schema, this.redisClient);

    await repository.createIndex();
    return repository;
  }


  async onModuleDestroy() {
    await this.redisClient.quit();
  }
}
