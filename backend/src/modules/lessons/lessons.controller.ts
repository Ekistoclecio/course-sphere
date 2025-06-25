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
  Req,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { FindLessonsDto } from 'src/modules/lessons/dto/find-lesson.det';
import {
  AuthTokenGuard,
  UserPayload,
} from 'src/modules/auth/guards/auth-token.guard';
import { LessonRoutesPoliciesGuard } from 'src/modules/lessons/guards/lessons-routes-policies.guard';
import { Request } from 'express';

@UseGuards(AuthTokenGuard)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @UseGuards(LessonRoutesPoliciesGuard)
  @Post()
  create(@Body() createLessonDto: CreateLessonDto, @Req() req: Request) {
    const current_user = req['current_user'] as UserPayload;
    return this.lessonsService.create(createLessonDto, current_user);
  }

  @Get()
  findAll(@Query() query: FindLessonsDto, @Req() req: Request) {
    const current_user = req['current_user'] as UserPayload;
    return this.lessonsService.findAll(query, current_user);
  }

  @UseGuards(LessonRoutesPoliciesGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLessonDto: UpdateLessonDto,
    @Req() req: Request,
  ) {
    const current_user = req['current_user'] as UserPayload;
    return this.lessonsService.update(id, updateLessonDto, current_user);
  }

  @UseGuards(LessonRoutesPoliciesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const current_user = req['current_user'] as UserPayload;
    return this.lessonsService.remove(id, current_user);
  }
}
