import { Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'likes' })
export class LikeEntity {
  @ManyToOne(() => UserEntity, user => user.id, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  source: UserEntity;

  @ManyToOne(() => UserEntity, user => user.id, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  target: UserEntity;
}
