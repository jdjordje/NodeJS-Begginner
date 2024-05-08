import { Car } from "src/cars/entities/car.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CarFeature {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Car, (car) => car.carFeature)
  @JoinTable()
  car: Car[];
}
