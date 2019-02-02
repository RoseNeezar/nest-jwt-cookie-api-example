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

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  /**
   * Make a relation from a user to a username
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
   * Remove the like relation
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

  public async mostLiked(): Promise<LikeEntity[]> {
    return await this.likeRepository.find();
  }
}
