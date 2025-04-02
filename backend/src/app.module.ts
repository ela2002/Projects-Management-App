import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [ProjectsModule,FirebaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
