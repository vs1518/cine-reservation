import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../../entities/film.entity';
import { TmdbModule } from '../../tmdb/tmdb.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film]),
    TmdbModule,
  ],
  providers: [FilmService],
  controllers: [FilmController],
})
export class FilmModule {}
