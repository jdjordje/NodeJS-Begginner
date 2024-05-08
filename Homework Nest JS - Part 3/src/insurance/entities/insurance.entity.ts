import { Car } from "src/cars/entities/car.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CarInsurance {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @Column({
    unique: true,
  })
  policyNumber: string;

  @Column()
  provider: string;

  @Column()
  coverageDetails: string;

  @OneToOne(() => Car, (car) => car.carInsurance)
  car: Car;
}
