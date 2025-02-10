import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../../entities/film.entity';
import { Reservation } from '../../entities/reservation.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
  ) {}

  async createReservation(userId: string, filmId: string, reservationTime: string): Promise<Reservation> {
    // Lancer les recherches en parallèle
    const [user, film] = await Promise.all([
      this.userRepository.findOne({ where: { id: parseInt(userId) } }),
      this.filmRepository.findOne({ where: { id: parseInt(filmId) } }),
    ]);

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'id ${userId} introuvable.`);
    }

    if (!film) {
      throw new NotFoundException(`Film avec l'id ${filmId} introuvable.`);
    }

    const reservation = this.reservationRepository.create({
      user,
      film,
      reservationTime,
    });

    return this.reservationRepository.save(reservation);
  }

  async getUserReservations(userId: string): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { user: { id: parseInt(userId) } },
      relations: ['film'],
    });
  }
}
