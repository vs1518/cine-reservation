import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Film } from './film.entity';
import { User } from './user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Film, (film) => film.reservations)
  @JoinColumn({ name: 'filmId' })
  film: Film;

  @Column()
  reservationTime: Date;
}
