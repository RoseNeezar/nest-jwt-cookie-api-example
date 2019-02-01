import { Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'likes' })
export class LikeEntity {
  @ManyToOne(type => UserEntity, user => user.id, {
    primary: true,
    nullable: false,
  })
  source: UserEntity;

  @ManyToOne(type => UserEntity, user => user.id, {
    primary: true,
    nullable: false,
  })
  target: UserEntity;
}
