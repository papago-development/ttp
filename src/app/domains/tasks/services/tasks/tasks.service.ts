import { Injectable, signal } from '@angular/core';
import {
  FileManagerService,
  FirebaseFirestoreService,
  FirebaseStorageService,
} from '@app/core';
import { GetCollectionOptions } from '@capacitor-firebase/firestore';
import { Task, TaskFile } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public static readonly firestoreBasePath = 'tasks';

  constructor(
    private readonly firebaseFirestoreService: FirebaseFirestoreService,
    private readonly firebaseStorageService: FirebaseStorageService,
    private readonly fileManagerService: FileManagerService,
  ) {}

  public async addTask(options: Omit<Task, 'id'>): Promise<Task> {
    const result = await this.firebaseFirestoreService.addDocument({
      reference: TasksService.firestoreBasePath,
      data: options,
    });
    return {
      ...options,
      id: result.reference.id,
    };
  }

  public async getTasks(
    options: Omit<GetCollectionOptions, 'reference'>,
  ): Promise<Task[]> {
    const result = await this.firebaseFirestoreService.getCollection<Task>({
      ...options,
      reference: TasksService.firestoreBasePath,
    });
    return result.snapshots.map(snapshot => ({
      ...(snapshot.data as Task),
      id: snapshot.id,
    }));
  }

  public async getTaskById(id: Task['id']): Promise<Task | null> {
    const result = await this.firebaseFirestoreService.getDocument<
      Omit<Task, 'id'>
    >({
      reference: `${TasksService.firestoreBasePath}/${id}`,
    });
    if (result.snapshot.data) {
      return {
        ...result.snapshot.data,
        id: result.snapshot.id,
      };
    } else {
      return null;
    }
  }

  public async updateTask(
    id: Task['id'],
    options: Omit<Task, 'id'>,
  ): Promise<Task> {
    await this.firebaseFirestoreService.updateDocument({
      reference: `${TasksService.firestoreBasePath}/${id}`,
      data: options,
    });
    return {
      ...options,
      id,
    };
  }

  public async deleteTask(id: Task['id']): Promise<void> {
    await this.firebaseFirestoreService.deleteDocument({
      reference: `${TasksService.firestoreBasePath}/${id}`,
    });
  }

  public async downloadFile(
    taskId: string,
    name: string,
  ): Promise<{ path?: string; blob?: Blob }> {
    const path = `${TasksService.firestoreBasePath}/${taskId}/${name}`;
    const { downloadUrl } = await this.firebaseStorageService.getDownloadUrl({
      path,
    });
    await this.fileManagerService.createCacheDirectory({
      path: path.split('/').slice(0, -1).join('/'),
    });
    const result = await this.fileManagerService.downloadFile({
      url: downloadUrl,
      path: path,
    });
    return {
      path: result.path,
      blob: result.blob,
    };
  }

  public async listFiles(taskId: string): Promise<TaskFile[]> {
    const folderPath = `${TasksService.firestoreBasePath}/${taskId}`;
    const result = await this.firebaseStorageService.listFiles({
      path: folderPath,
    });
    return result.items.map(item => {
      return {
        name: item.name,
        localPath: signal(undefined),
        remotePath: item.path,
        blob: signal(undefined),
        downloadInProgress: signal(false),
        isDeleted: signal(false),
      };
    });
  }

  public async uploadFiles(taskId: string, files: TaskFile[]): Promise<void> {
    const folderPath = `${TasksService.firestoreBasePath}/${taskId}`;
    const promises: Promise<void>[] = [];
    for (const file of files) {
      const path = `${folderPath}/${file.name}`;
      const promise = this.firebaseStorageService.uploadFile({
        path,
        blob: file.blob(),
        uri: file.localPath(),
      });
      promises.push(promise);
    }
    await Promise.all(promises);
  }

  public async deleteFiles(taskId: string, files: TaskFile[]): Promise<void> {
    const folderPath = `${TasksService.firestoreBasePath}/${taskId}`;
    const promises: Promise<void>[] = [];
    for (const file of files) {
      const path = `${folderPath}/${file.name}`;
      const promise = this.firebaseStorageService.deleteFile({
        path,
      });
      promises.push(promise);
    }
    await Promise.all(promises);
  }
}
