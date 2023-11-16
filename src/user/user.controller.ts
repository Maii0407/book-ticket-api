import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':ID')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('ID') ID: string) {
    return this.userService.findOne(ID);
  }

  @Patch(':ID')
  @ApiOkResponse({ type: UserEntity })
  update(@Param('ID') ID: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(ID, updateUserDto);
  }

  @Delete(':ID')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('ID') ID: string) {
    return this.userService.remove(ID);
  }
}
