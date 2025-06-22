import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { FindLessonsDto } from 'src/modules/lessons/dto/find-lesson.det';
import { AuthTokenGuard } from 'src/modules/auth/guards/auth-token.guard';
import { LessonRoutesPoliciesGuard } from 'src/modules/lessons/guards/lessons-routes-policies.guard';

@UseGuards(AuthTokenGuard)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @UseGuards(LessonRoutesPoliciesGuard)
  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  findAll(@Query() query: FindLessonsDto) {
    return this.lessonsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.findOne(id);
  }

  @UseGuards(LessonRoutesPoliciesGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @UseGuards(LessonRoutesPoliciesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.remove(id);
  }
}
