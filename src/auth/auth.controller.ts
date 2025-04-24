import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/sercices';
import { catchError } from 'rxjs';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Token } from './decorators/token.decorator';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.client.send('auth.login.user', loginDto).pipe(
      catchError((error) => {
        throw new RpcException(error as object);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  @ApiBearerAuth('JWT-auth')
  verifyToken(@Token() token: string) {
    // const user = req['user'];
    // const token = req['token'];
    return { token };
    // return { user, token };
  }
}
