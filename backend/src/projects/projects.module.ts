import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { FirebaseModule } from '../firebase/firebase.module'; // Add this import

@Module({
  imports: [FirebaseModule], 
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
