import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TmdbService {
  private readonly apiUrl = 'https://api.themoviedb.org/3';
  private readonly apiKey = '554fb0302f23016b83970f2abca47bac';

  constructor(private httpService: HttpService) {}

  async getMovies(): Promise<AxiosResponse> {
    const url = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`;
    return firstValueFrom(this.httpService.get(url));
  }

}
