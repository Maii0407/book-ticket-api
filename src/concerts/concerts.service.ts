import { Injectable } from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConcertsService {
  constructor(private prisma: PrismaService) {}
  create(createConcertDto: CreateConcertDto) {
    return this.prisma.concert.create({
      data: createConcertDto,
    });
  }

  findAll() {
    return this.prisma.concert.findMany();
  }

  findOne(ID: string) {
    return this.prisma.concert.findUnique({ where: { ID } });
  }

  update(ID: string, updateConcertDto: UpdateConcertDto) {
    return this.prisma.concert.update({
      where: { ID },
      data: updateConcertDto,
    });
  }

  remove(ID: string) {
    return this.prisma.concert.delete({ where: { ID } });
  }
}
