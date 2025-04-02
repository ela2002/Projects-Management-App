import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import * as admin from 'firebase-admin';

@Injectable()
export class ProjectsService {
  constructor(private firebaseService: FirebaseService) {}

  async createProject(projectData: { title: string; description: string; dueDate: string }) {
    const db = this.firebaseService.getFirestore();
    const projectRef = await db.collection('projects').add({
      ...projectData,
      tasks: [], 
    });
    return { id: projectRef.id, ...projectData, tasks: [] };
  }

  async getProjects() {
    const db = this.firebaseService.getFirestore();
    const snapshot = await db.collection('projects').get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async addTaskToProject(projectId: string, taskData: { name: string; completed: boolean }) {
    const db = this.firebaseService.getFirestore();
    const projectRef = db.collection('projects').doc(projectId);
    await projectRef.update({
      tasks: admin.firestore.FieldValue.arrayUnion(taskData),
    });
    return { projectId, ...taskData };
  }

  async getProjectById(projectId: string) {
    const db = this.firebaseService.getFirestore();
    const doc = await db.collection('projects').doc(projectId).get();
    if (!doc.exists) {
      throw new NotFoundException('Project not found');
    }
    return { id: doc.id, ...doc.data() };
  }


  async getProjectTasks(projectId: string) {
    const db = this.firebaseService.getFirestore();
    const projectDoc = await db.collection('projects').doc(projectId).get();
    return projectDoc.data().tasks || [];
  }
  async deleteProject(projectId: string) {
    const db = this.firebaseService.getFirestore();
    await db.collection('projects').doc(projectId).delete();
    return { id: projectId, deleted: true };
  }

  async deleteTask(projectId: string, taskName: string) {
    const db = this.firebaseService.getFirestore();
    const projectRef = db.collection('projects').doc(projectId);
    
    // First check if project exists
    const projectDoc = await projectRef.get();
    if (!projectDoc.exists) {
      throw new NotFoundException('Project not found');
    }
  
    // Get current tasks
    const tasks = projectDoc.data().tasks || [];
    
    // Find task index
    const taskIndex = tasks.findIndex(t => t.name === decodeURIComponent(taskName));
    
    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }
  
    // Remove the task
    tasks.splice(taskIndex, 1);
    
    // Update the project
    await projectRef.update({ tasks });
    
    return { 
      projectId, 
      deletedTask: decodeURIComponent(taskName),
      remainingTasks: tasks.length 
    };
  }
  async toggleTask(projectId: string, taskName: string) {
    const db = this.firebaseService.getFirestore();
    const projectRef = db.collection('projects').doc(projectId);
    
    // Get current project data
    const projectDoc = await projectRef.get();
    if (!projectDoc.exists) {
      throw new NotFoundException('Project not found');
    }
  
    const tasks = projectDoc.data().tasks || [];
    const taskIndex = tasks.findIndex(t => t.name === taskName);
    
    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }
  
    // Create updated task array
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      completed: !updatedTasks[taskIndex].completed
    };
  
    // Update the project with new tasks array
    await projectRef.update({ tasks: updatedTasks });
    
    return updatedTasks[taskIndex];
  }
  async updateProject(projectId: string, projectData: { 
    title: string, 
    description: string, 
    dueDate: string,
    priority: string 
  }) {
    const db = this.firebaseService.getFirestore();
    const projectRef = db.collection('projects').doc(projectId);
    await projectRef.update(projectData);
    return { id: projectId, ...projectData };
  }

  async updateTask(projectId: string, originalName: string, taskData: { 
    name: string, 
    completed: boolean 
  }) {
    const db = this.firebaseService.getFirestore();
    const projectRef = db.collection('projects').doc(projectId);
    const project = await projectRef.get();
    
    if (!project.exists) {
      throw new NotFoundException('Project not found');
    }

    const tasks = project.data().tasks || [];
    const taskIndex = tasks.findIndex(t => t.name === originalName);
    
    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }

    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], ...taskData };

    await projectRef.update({ tasks: updatedTasks });
    return updatedTasks[taskIndex];
  }
}