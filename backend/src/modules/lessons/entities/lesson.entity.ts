import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum LessonStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({
    type: 'enum',
    enum: LessonStatus,
    default: LessonStatus.DRAFT,
    nullable: false,
  })
  status: LessonStatus;

  @Column({ type: 'timestamp', nullable: false })
  publish_date: Date;

  @Column({ type: 'text', nullable: false })
  video_url: string;

  @Column({ type: 'int', nullable: false })
  course_id: number;

  @ManyToOne(() => Course, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: Course;

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

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
