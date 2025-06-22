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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateInstructorsDto } from 'src/modules/courses/dto/update-instructors';
import { AuthTokenGuard } from 'src/modules/auth/guards/auth-token.guard';
import { CourseRoutesPoliciesGuard } from 'src/modules/courses/guards/course-routes-policies.guard';

@UseGuards(AuthTokenGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
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
  findAll(@Query() pagination: PaginationDto) {
    return this.coursesService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
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
