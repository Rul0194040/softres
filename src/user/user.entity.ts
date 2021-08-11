import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { IsEmail } from 'class-validator';
import { Entity, Column } from 'typeorm';

@Entity('users')
export class UserEntity extends CommonEntity {
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  picUrl?: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  profile: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  rules?: string[];

  @Column({
    type: 'varchar',
    name: 'email',
    length: 100,
    nullable: false,
  })
  @IsEmail()
  email: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  validEmail?: boolean;

  @Column({
    type: 'varchar',
    length: 6,
    nullable: true,
  })
  emailToken?: string;

  @Column({
    type: 'varchar',
    name: 'password',
    length: 100,
    nullable: false,
    select: false,
  })
  password: string;

  @Column({ type: 'text', default: null })
  jwt?: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  passwordToken?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  passwordTokenDate?: Date;
}
