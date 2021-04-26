import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('stocks')
export class StockEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ProductEntity)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product: ProductEntity;

  @Column({
    type: 'int4',
  })
  count: number;
}
