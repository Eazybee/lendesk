import { Injectable } from '@nestjs/common';
import { Repository } from 'redis-om';
import * as bcrypt from 'bcryptjs';
import { DatabaseService } from 'src/database/database.service';
import { User, userSchema } from 'src/database/schemas/user.schema';
import { BCRYTP_SALT } from 'src/constants';

@Injectable()
export class UsersService {
  private repository: Repository<User>;
  constructor(private readonly dbService: DatabaseService) {}

  async onModuleInit() {
      this.repository = await this.dbService.getRepository(userSchema);
  }

  async create(user: User): Promise<Omit<User, 'password'>> {
    const hash = await bcrypt.hash(user.password, BCRYTP_SALT);
    user.password = hash;

    const savedUser = (await this.repository.save(user)) as Omit<
      User,
      'password'
    >;

    if (savedUser) {
      delete savedUser.password;
    }

    return savedUser;
  }

  async findOne(username: string): Promise<User | null> {
    let res: User | null = null;

      res = await this.repository
        .search()
        .where('username')
        .equals(username)
        .return.first();

    return res;
  }
}
