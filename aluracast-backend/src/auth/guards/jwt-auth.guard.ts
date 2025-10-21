// aluracast-backend/src/auth/guards/jwt-auth.guard.ts

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// O string 'jwt' mapeia para a JwtStrategy que criamos
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}