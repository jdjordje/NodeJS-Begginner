import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongModule } from './song/song.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env`, isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: `postgres`,
          host: configService.get(`DB_HOST`),
          port: configService.get(`DB_PORT`),
          username: configService.get(`DB_USER`),
          password: configService.get(`DB_PASS`),
          database: configService.get(`DB_NAME`),
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
    ArtistModule,
    SongModule,
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
