import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    console.log("Authorization Header (inside guard):", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token);
      console.log("✅ Token décodé avec succès:", decoded);
      request.user = decoded;
      return true;
    } catch (error){
    console.error("❌ Erreur lors de la vérification du token:", error);
      return false;
    }
  }
}
