import { Controller, Get } from '@nestjs/common';
import { FilmService } from './film.service';

@Controller('films')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Get('popular')
  async getPopularFilms() {
    return this.filmService.getPopularFilms();
  }
}
