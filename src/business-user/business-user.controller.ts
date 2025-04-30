import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { CreateBusinessUserDto } from './dto/create-business-user.dto';
import { UpdateBusinessUserDto } from './dto/update-business-user.dto';
import { NATS_SERVICE } from 'src/config/sercices';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Token } from 'src/auth/decorators/token.decorator';
import { catchError } from 'rxjs';

@Controller('business-user')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT-auth')
export class BusinessUserController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(
    @Body() createBusinessUserDto: CreateBusinessUserDto,
    @Token() token: string,
  ) {
    return this.client
      .send('business.user.create', {
        Authorization: token,
        Body: createBusinessUserDto,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Get()
  findAll(@Token() token: string) {
    return this.client
      .send('business.user.findAll', {
        Authorization: token,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Get(':id')
  findOne(@Token() token: string, @Param('id') id: string) {
    return this.client
      .send('business.user.findOne', {
        Authorization: token,
        Body: { id },
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Patch(':id')
  update(
    @Token() token: string,
    @Param('id') businessId: string,
    @Body() updateBusinessUserDto: UpdateBusinessUserDto,
  ) {
    return this.client
      .send('business.user.update', {
        Authorization: token,
        Body: { ...updateBusinessUserDto, businessId },
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Delete(':id')
  remove(@Token() token: string, @Param('id') id: string) {
    return this.client
      .send('business.user.remove', {
        Authorization: token,
        Body: { id },
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }
}
