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

@UseGuards(AuthTokenGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Patch(':id/instructors')
  addInstructors(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateInstructorsDto,
  ) {
    return this.coursesService.addInstructors(id, body);
  }

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

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }
}
