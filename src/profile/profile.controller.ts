import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiBearerAuth } from '@nestjs/swagger';
import { catchError } from 'rxjs';
import { User } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { NATS_SERVICE } from 'src/config/sercices';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Controller('profile')
export class ProfileController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  getProfile(@User() user: string) {
    return this.client
      .send('users.profile.get', {
        Id: user,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Patch()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  updateProfile(@User() user: string, @Body() updateUserDto: UpdateUserDto) {
    return this.client
      .send('users.profile.update', {
        Id: user,
        Body: updateUserDto,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }
}
