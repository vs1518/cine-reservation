import { Injectable } from '@nestjs/common';
import { TmdbService } from '../../tmdb/tmdb.service';

@Injectable()
export class FilmService {
  constructor(private readonly tmdbService: TmdbService) {}

  async getPopularFilms() {
    const response = await this.tmdbService.getMovies();
    return response.data.results;
  }
}
