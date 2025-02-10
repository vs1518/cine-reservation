import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from '../../entities/reservation.entity';
import { User } from '../../entities/user.entity';
import { Film } from '../../entities/film.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, User, Film]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
