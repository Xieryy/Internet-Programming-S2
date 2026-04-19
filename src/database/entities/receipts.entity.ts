import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('receipts')
export class Receipt {
  @PrimaryGeneratedColumn('uuid')
  receiptId!: string;

  @Column({ type: 'datetime' })
  issuedAt!: Date;

  @Column()
  name!: string;

  @Column({ type: 'float' })
  price!: number;
}
