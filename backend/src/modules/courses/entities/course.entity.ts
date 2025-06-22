import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', nullable: true, length: 500 })
  description: string;

  @Column({ type: 'timestamp', nullable: false })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: false })
  end_date: Date;

  @Column({ type: 'int', nullable: false })
  creator_id: number;

  @ManyToOne(() => User, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'course_instructors',
    joinColumn: {
      name: 'course_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  instructors: User[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
