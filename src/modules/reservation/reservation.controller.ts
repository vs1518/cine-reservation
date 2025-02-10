import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@ApiTags('reservations') // Swagger tag
@Controller('reservations') // Vérifie bien ce chemin
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async createReservation(@Body() { userId, filmId, reservationTime }: CreateReservationDto) {
    return await this.reservationService.createReservation(userId, filmId, reservationTime);
  }
  

  @Get('user/:userId')
  async getUserReservations(@Param('userId') userId: string) {
    return await this.reservationService.getUserReservations(userId);
  }
}
