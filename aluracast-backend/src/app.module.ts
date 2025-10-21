import { Module } from '@nestjs/common';
import { EpisodesModule } from './episodes/episodes.module';
import { ServeStaticModule } from '@nestjs/serve-static'; 
import { join } from 'path';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'), 
      serveRoot: '/', 
    }),
    EpisodesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}