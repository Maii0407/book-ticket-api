import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ConcertEntity } from './entities/concert.entity';

@Controller('concerts')
@ApiTags('concerts')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ConcertEntity })
  async create(@Body() createConcertDto: CreateConcertDto) {
    return new ConcertEntity(await this.concertsService.create(createConcertDto));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ConcertEntity, isArray: true })
  async findAll() {
    const concerts = await this.concertsService.findAll();
    return concerts.map((concert) => new ConcertEntity(concert));
  }

  @Get(':ID')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ConcertEntity })
  async findOne(@Param('ID') ID: string) {
    const concert = await this.concertsService.findOne(ID);

    if (!concert) {
      throw new NotFoundException(`User with ${ID} does not exist.`);
    }

    return new ConcertEntity(concert);
  }

  @Patch(':ID')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ConcertEntity })
  async update(@Param('ID') ID: string, @Body() updateConcertDto: UpdateConcertDto) {
    const concert = await this.concertsService.findOne(ID);

    if (!concert) {
      throw new NotFoundException(`User with ${ID} does not exist.`);
    }

    return new ConcertEntity(await this.concertsService.update(ID, updateConcertDto));
  }

  @Delete(':ID')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ConcertEntity })
  async remove(@Param('ID') ID: string) {
    const concert = await this.concertsService.findOne(ID);

    if (!concert) {
      throw new NotFoundException(`User with ${ID} does not exist.`);
    }

    return new ConcertEntity(await this.concertsService.remove(ID));
  }
}
