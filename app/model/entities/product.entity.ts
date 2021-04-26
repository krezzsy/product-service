import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  tagline: string;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'decimal',
  })
  budget: number;

  @Column({
    type: 'decimal',
  })
  revenue: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'decimal',
  })
  vote_average: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  poster_path: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  genres: string;

  @Column({
    type: 'int4',
  })
  runtime: number;
}
