import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { NATS_SERVICE } from 'src/config/sercices';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/pagination.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Token } from 'src/auth/decorators/token.decorator';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('exam')
export class ExamController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('sf')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  createExamSf(@Body() createExamDto: CreateExamDto, @Token() token: string) {
    return this.client
      .send('exams.create-sf.exam', {
        Authorization: token,
        Body: createExamDto,
      })
      .pipe(
        catchError((error) => {
          console.log(error);
          throw new RpcException(error as object);
        }),
      );
  }

  @Post('bs')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  createExamBs(@Body() createExamDto: CreateExamDto, @User() user: string) {
    return this.client
      .send('exams.create-bs.exam', { Id: user, Body: createExamDto })
      .pipe(
        catchError((error) => {
          console.log(error);
          throw new RpcException(error as object);
        }),
      );
  }

  @Get()
  findAllExams(@Query() paginationDto: PaginationDto) {
    return this.client.send('exams.findall.exam', paginationDto).pipe(
      catchError((error) => {
        throw new RpcException(error as object);
      }),
    );
  }

  @Get(':id')
  findOneExam(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('exams.findone.exam', { Body: { id } }).pipe(
      catchError((error) => {
        throw new RpcException(error as object);
      }),
    );
  }

  @Patch(':id')
  updateExam(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExamDto: UpdateExamDto,
  ) {
    return this.client
      .send('exams.update.exam', { Body: { id, ...updateExamDto } })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Delete(':id')
  removeExam(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('exams.delete.exam', { Body: { id } }).pipe(
      catchError((error) => {
        throw new RpcException(error as object);
      }),
    );
  }
}
