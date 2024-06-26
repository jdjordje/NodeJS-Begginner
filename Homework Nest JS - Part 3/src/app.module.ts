import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CarsModule } from "./cars/cars.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarManufacturerModule } from "./manufacturer/manufacturer.module";
import { CarInsuranceModule } from "./insurance/insurance.module";
import { CarFeature } from "./feature/entities/feature.entity";
import { CarFeatureModule } from "./feature/feature.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from "./auth/auth.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: `.env`, isGlobal:true}),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
       useFactory(configService: ConfigService){
        return{
          type: `postgres`,
          host: configService.get(`DB_HOST`),
          port: configService.get(`DB_PORT`),
          username: configService.get(`DB_USER`),
          password: configService.get(`DB_PASS`),
          database: configService.get(`DB_NAME`),
          synchronize: true,
          autoLoadEntities: true,

        }
      }
    }),
    CarsModule,
    CarManufacturerModule,
    CarInsuranceModule,
    CarFeatureModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: 'auth/(.*)',
        method: RequestMethod.ALL,
      })
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
