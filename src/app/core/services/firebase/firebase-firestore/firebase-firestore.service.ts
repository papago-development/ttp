import { Injectable } from '@angular/core';
import {
  AddCollectionSnapshotListenerCallback,
  AddCollectionSnapshotListenerOptions,
  AddDocumentOptions,
  AddDocumentResult,
  AddDocumentSnapshotListenerCallback,
  AddDocumentSnapshotListenerOptions,
  CallbackId,
  DeleteDocumentOptions,
  DocumentData,
  GetCollectionOptions,
  GetCollectionResult,
  GetDocumentOptions,
  GetDocumentResult,
  RemoveSnapshotListenerOptions,
  SetDocumentOptions,
  UpdateDocumentOptions,
} from '@capacitor-firebase/firestore';
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';
import { CapacitorFirebaseFirestoreService } from '../../capacitor';
import { ErrorParserService } from '../../error';
import { FirebaseAppService } from '../firebase-app/firebase-app.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFirestoreService {
  constructor(
    private readonly firebaseAppService: FirebaseAppService,
    private readonly capacitorFirestoreService: CapacitorFirebaseFirestoreService,
    private readonly errorParserService: ErrorParserService,
  ) {
    const firebaseApp = this.firebaseAppService.getFirebaseApp();
    if (firebaseApp) {
      /**
       * Enable offline persistence for the web.
       */
      initializeFirestore(firebaseApp, {
        localCache: persistentLocalCache(),
      });
    }
  }

  public addDocument(options: AddDocumentOptions): Promise<AddDocumentResult> {
    return this.capacitorFirestoreService.addDocument(options);
  }

  public setDocument(options: SetDocumentOptions): Promise<void> {
    return this.capacitorFirestoreService.setDocument(options);
  }

  public async getDocument<T extends DocumentData>(
    options: GetDocumentOptions,
  ): Promise<GetDocumentResult<T>> {
    try {
      return await this.capacitorFirestoreService.getDocument<T>(options);
    } catch (error) {
      const code = this.errorParserService.getCodeFromUnknownError(error);
      // If the error is a permission-denied error, return the document with no data.
      if (code === 'permission-denied') {
        return {
          snapshot: {
            id: options.reference.split('/').pop() || '',
            path: options.reference,
            data: null,
          },
        };
      }
      throw error;
    }
  }

  public getCollection<T extends DocumentData>(
    options: GetCollectionOptions,
  ): Promise<GetCollectionResult<T>> {
    return this.capacitorFirestoreService.getCollection<T>(options);
  }

  public updateDocument(options: UpdateDocumentOptions): Promise<void> {
    return this.capacitorFirestoreService.updateDocument(options);
  }

  public deleteDocument(options: DeleteDocumentOptions): Promise<void> {
    return this.capacitorFirestoreService.deleteDocument(options);
  }

  public addDocumentSnapshotListener<T extends DocumentData>(
    options: AddDocumentSnapshotListenerOptions,
    callback: AddDocumentSnapshotListenerCallback<T>,
  ): Promise<CallbackId> {
    return this.capacitorFirestoreService.addDocumentSnapshotListener(
      options,
      callback,
    );
  }

  public addCollectionSnapshotListener<T extends DocumentData>(
    options: AddCollectionSnapshotListenerOptions,
    callback: AddCollectionSnapshotListenerCallback<T>,
  ): Promise<CallbackId> {
    return this.capacitorFirestoreService.addCollectionSnapshotListener(
      options,
      callback,
    );
  }

  public removeSnapshotListener(
    options: RemoveSnapshotListenerOptions,
  ): Promise<void> {
    return this.capacitorFirestoreService.removeSnapshotListener(options);
  }
}
