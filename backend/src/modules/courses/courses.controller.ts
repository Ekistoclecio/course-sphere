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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateInstructorsDto } from 'src/modules/courses/dto/update-instructors';
import {
  AuthTokenGuard,
  UserPayload,
} from 'src/modules/auth/guards/auth-token.guard';
import { CourseRoutesPoliciesGuard } from 'src/modules/courses/guards/course-routes-policies.guard';
import { Request } from 'express';

@UseGuards(AuthTokenGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @Req() req: Request) {
    const current_user = req['current_user'] as UserPayload;
    return this.coursesService.create(createCourseDto, current_user);
  }

  @UseGuards(CourseRoutesPoliciesGuard)
  @Patch(':id/instructors')
  addInstructors(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateInstructorsDto,
  ) {
    return this.coursesService.addInstructors(id, body);
  }

  @UseGuards(CourseRoutesPoliciesGuard)
  @Patch(':id/instructors/remove')
  removeInstructors(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateInstructorsDto,
  ) {
    return this.coursesService.removeInstructors(id, body);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto, @Req() request: Request) {
    const current_user = request['current_user'] as UserPayload;
    return this.coursesService.findAll(pagination, current_user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    const current_user = request['current_user'] as UserPayload;
    return this.coursesService.findOne(id, current_user);
  }

  @UseGuards(CourseRoutesPoliciesGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @UseGuards(CourseRoutesPoliciesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }
}
