import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
export let USER_USERNAME_MAX_LENGTH = 30;
export let USER_USERNAME_MIN_LENGTH = 4;
export let USER_PASSWORD_MIN_LENGTH = 8;
export let USER_PASSWORD_MAX_LENGTH = 100;
export let USER_USERNAME_REGEX = /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/;

@Entity({ name: 'users' })
export class UserEntity {
  /**
   * Primary id of the user
   * id should never be exposed to the client
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Use as an unique identifier and client resource id
   *
   * Todo, Lower/uppercase index
   * https://github.com/typeorm/typeorm/blob/master/docs/indices.md#disabling-synchronization
   * https://github.com/typeorm/typeorm/issues/356
   */
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
