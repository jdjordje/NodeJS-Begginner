import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CarsModule } from "./cars/cars.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: `postgres`,
      host: `localhost`,
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "Cars",
      synchronize: true,
      autoLoadEntities: true,
    }),
    CarsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
