import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserService } from './modules/user/user.service';

@ApiTags('User')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBody({
    description: 'Inscription d\'un nouvel utilisateur',
    type: Object,
    examples: {
      default: {
        summary: 'Utilisateur pour test',
        value: {
          email: 'test@example.com',
          password: 'password',
        },
      },
    },
  })
  async register(@Body() body: { email: string; password: string }) {
    return this.userService.register(body.email, body.password);
  }

  @Post('login')
  @ApiBody({
    description: 'Connexion d\'un utilisateur existant',
    type: Object,  // Permet d'afficher le body dans Swagger
    examples: {
      default: {
        summary: 'Utilisateur pour test',
        value: {
          email: 'test@example.com',
          password: 'password',
        },
      },
    },
  })
  async login(@Body() body: { email: string; password: string }) {
    return this.userService.login(body.email, body.password);
  }
}
