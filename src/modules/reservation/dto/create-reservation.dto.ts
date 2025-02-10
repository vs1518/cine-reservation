import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000" })
  @IsUUID()
  @IsNotEmpty()
  filmId: string;

  @ApiProperty({ example: "2025-02-10T15:30:00.000Z" })
  @IsDateString()
  @IsNotEmpty()
  reservationTime: string;
}
