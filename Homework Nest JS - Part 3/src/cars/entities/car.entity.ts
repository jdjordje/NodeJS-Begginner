import { CarFeature } from "src/feature/entities/feature.entity";
import { CarInsurance } from "src/insurance/entities/insurance.entity";
import { CarManufacturer } from "src/manufacturer/entities/manufacturer.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @ManyToOne(() => CarManufacturer, (carManufacturer) => carManufacturer.car)
  carManufacturer: CarManufacturer;

  @OneToOne(() => CarInsurance, (carInsurance) => carInsurance.car)
  @JoinColumn()
  carInsurance: CarInsurance;

  @ManyToMany(() => CarFeature, carFeature => carFeature.car)
  carFeature: CarFeature[];
}
