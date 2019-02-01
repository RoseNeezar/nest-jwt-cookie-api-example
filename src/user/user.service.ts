import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { UserEntity } from './user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findOneOrFail(conditions: any): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneOrFail(conditions);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        // todo
        if (e['code'] === '23505') {
          // unique violation
          throw new BadRequestException('User already exists.');
        }
      }
      throw new BadRequestException('Error fetching user.');
    }
  }

  /**
   * Delete user by id or username (or both)
   * @param id
   * @param username
   */
  public async delete(id: string, username?: string): Promise<null> {
    let criteria = {};

    if (!username && !id) { {
      throw new BadRequestException(`Could not delete user.`);
    }}

    if (username) {
      criteria['usernane'] = username;
    }

    if (id) {
      criteria['id'] = id;
    }

    try {
      await this.userRepository.delete(criteria);
      return;
    } catch (error) {
      throw new BadRequestException(`Could not delete user.`);
    }
  }

  public async update(criteria: any, partialEntity: any) : Promise<null>  {
    await this.userRepository.update(criteria, partialEntity);
    return;
  }

  public async create(entity: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(entity);
  }

}
