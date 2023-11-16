import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(ID: string) {
    return this.prisma.user.findUnique({ where: { ID } });
  }

  update(ID: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { ID },
      data: updateUserDto,
    });
  }

  remove(ID: string) {
    return this.prisma.user.delete({ where: { ID } });
  }
}
