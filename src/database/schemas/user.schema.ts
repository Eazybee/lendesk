import { Entity, Schema } from 'redis-om';

export interface User extends Entity {
  username: string;
  email: string;
  password: string;
}

export const userSchema = new Schema<User>(
  'user',
  {
    username: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
  {
    indexName: 'username',
  },
);
