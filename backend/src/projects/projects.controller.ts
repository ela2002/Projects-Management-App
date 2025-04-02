import { Controller, Get, Post,Delete,Patch,Put, Body, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  createProject(@Body() projectData: { title: string; description: string; dueDate: string }) {
    return this.projectsService.createProject(projectData);
  }

  @Get()
  getProjects() {
    return this.projectsService.getProjects();
  }
  @Get(':id')
  async getProject(@Param('id') id: string) {
    return this.projectsService.getProjectById(id);
  }

  @Get(':id/tasks')
  async getProjectTasks(@Param('id') id: string) {
    return this.projectsService.getProjectTasks(id);
  }

  @Post(':id/tasks')
  addTaskToProject(@Param('id') projectId: string, @Body() taskData: { name: string; completed: boolean }) {
    return this.projectsService.addTaskToProject(projectId, taskData);
  }

  @Delete(':id')
  deleteProject(@Param('id') projectId: string) {
    return this.projectsService.deleteProject(projectId);
  }

  @Delete(':projectId/tasks/:taskName')
async deleteTask(
  @Param('projectId') projectId: string,
  @Param('taskName') taskName: string
) {
  return this.projectsService.deleteTask(projectId, taskName);
}
@Patch(':projectId/tasks/:taskName/toggle')
async toggleTask(
  @Param('projectId') projectId: string,
  @Param('taskName') taskName: string
) {
  return this.projectsService.toggleTask(projectId, decodeURIComponent(taskName));
}
@Put(':id')
  updateProject(
    @Param('id') projectId: string,
    @Body() projectData: { 
      title: string, 
      description: string, 
      dueDate: string,
      priority: string 
    }
  ) {
    return this.projectsService.updateProject(projectId, projectData);
  }

  @Put(':projectId/tasks/:taskName')
  updateTask(
    @Param('projectId') projectId: string,
    @Param('taskName') taskName: string,
    @Body() taskData: { name: string, completed: boolean }
  ) {
    return this.projectsService.updateTask(
      projectId, 
      decodeURIComponent(taskName),
      taskData
    );
  }
}