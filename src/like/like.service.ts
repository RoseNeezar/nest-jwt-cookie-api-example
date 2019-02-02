import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeEntity } from './like.entity';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import {
  UserLikesPaginationOptionsDto,
  UserLikesPaginationResultsDto,
} from './dto/pagination.dto';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  /**
   * "Like" a user by their username
   * @param sourceid
   * @param targetusername
   */
  public async likeUsername(
    sourceid: string,
    targetusername: string,
  ): Promise<null> {
    let target: UserEntity;
    try {
      target = await this.userService.findOneOrFail({
        username: targetusername,
      });
    } catch (e) {
      throw new BadRequestException(`User "${targetusername}" does not exist.`);
    }
    try {
      await this.likeRepository.save({
        source: { id: sourceid } as UserEntity,
        target: target as UserEntity,
      } as LikeEntity);
      return;
    } catch (e) {
      throw new BadRequestException(`Could not like user.`);
    }
  }

  /**
   * "Unlike" a user by their username
   * @param sourceid
   * @param targetusername
   */
  public async unlikeUsername(
    sourceid: string,
    targetusername: string,
  ): Promise<null> {
    let target: UserEntity;
    try {
      target = await this.userService.findOneOrFail({
        username: targetusername,
      });
    } catch (e) {
      throw new BadRequestException(`User "${targetusername}" does not exist.`);
    }
    try {
      await this.likeRepository.delete({
        source: { id: sourceid } as UserEntity,
        target: target as UserEntity,
      } as LikeEntity);
      return;
    } catch (e) {
      throw new BadRequestException(`Could not unlike user.`);
    }
  }

  /**
   * Get a paginated list of most liked users in order and with the count of likes
   * @param options
   */
  async mostLiked(
    options: UserLikesPaginationOptionsDto,
  ): Promise<UserLikesPaginationResultsDto> {
    // use sane defaults
    const limit = options.limit ? Number.parseInt(options.limit, 10) : 20;
    const page = options.page ? Number.parseInt(options.page, 10) : 1;

    if (limit < 1 || limit > 100) {
      throw new BadRequestException('Limit is limited to 100');
    }

    const query = this.likeRepository
      .createQueryBuilder('like')
      .innerJoin('like.target', 'user')
      .select('user.username', 'username')
      .addSelect('COUNT(*)', 'likes')
      .groupBy('username')
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy('likes', 'DESC');

    // console.log(query.getSql());

    const results = await query.getRawMany();

    return {
      results,
      // the actual page and limit of the results
      page,
      limit,
    } as UserLikesPaginationResultsDto;
  }

  public async countTarget(target: UserEntity): Promise<number> {
    return await this.likeRepository.count({ target });
  }

  /**
   * Check if a target username is liked by a user
   * @param sourceid
   * @param targetusername
   */
  public async isLiked(
    sourceid: string,
    targetusername: string,
  ): Promise<boolean> {
    let target: UserEntity;
    try {
      target = await this.userService.findOneOrFail({
        username: targetusername,
      });
    } catch (e) {
      throw new BadRequestException(`User "${targetusername}" does not exist.`);
    }
    try {
      const result = await this.likeRepository.count({
        source: { id: sourceid } as UserEntity,
        target: target as UserEntity,
      } as LikeEntity);
      return result > 0;
    } catch (e) {
      throw new BadRequestException(`Error getting relation.`);
    }
  }
}
