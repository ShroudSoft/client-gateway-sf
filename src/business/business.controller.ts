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
  Headers,
} from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/sercices';
import { catchError } from 'rxjs';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Token } from 'src/auth/decorators/token.decorator';

@Controller('business')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT-auth')
export class BusinessController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createBusinessDto: CreateBusinessDto, @Token() token: string) {
    return this.client
      .send('business.createBusiness', {
        Authorization: token,
        Body: createBusinessDto,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Get()
  findAll(@Headers('Authorization') authorization: string) {
    return this.client
      .send('business.findAllBusiness', {
        Authorization: authorization,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Get(':id')
  findOne(
    @Headers('Authorization') authorization: string,
    @Param('id') id: string,
  ) {
    return this.client
      .send('business.findOneBusiness', {
        Authorization: authorization,
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
    @Headers('Authorization') authorization: string,
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.client
      .send('business.updateBusiness', {
        Authorization: authorization,
        Body: { id, ...updateBusinessDto },
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Delete(':id')
  remove(
    @Headers('Authorization') authorization: string,
    @Param('id') id: string,
  ) {
    return this.client
      .send('business.removeBusiness', {
        Authorization: authorization,
        Body: { id },
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }
}
