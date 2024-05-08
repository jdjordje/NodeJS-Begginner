import { Car } from "src/cars/entities/car.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CarManufacturer {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @Column()
  name: string;

  @Column()
  headquarters: string;

  @OneToMany(() => Car, (car) => car.carManufacturer)
  car: Car[];
}
