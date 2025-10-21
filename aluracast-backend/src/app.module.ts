import { Module } from '@nestjs/common';
import { EpisodesModule } from './episodes/episodes.module';
import { ServeStaticModule } from '@nestjs/serve-static'; 
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'), 
      serveRoot: '/', 
    }),
    EpisodesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}