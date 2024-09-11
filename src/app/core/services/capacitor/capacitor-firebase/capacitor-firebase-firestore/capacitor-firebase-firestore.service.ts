import { Injectable, NgZone } from '@angular/core';
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
  FirebaseFirestore,
  GetCollectionGroupResult,
  GetCollectionOptions,
  GetCollectionResult,
  GetDocumentOptions,
  GetDocumentResult,
  RemoveSnapshotListenerOptions,
  SetDocumentOptions,
  UpdateDocumentOptions,
} from '@capacitor-firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CapacitorFirebaseFirestoreService {
  constructor(private readonly ngZone: NgZone) {
    void this.removeAllListeners();
  }

  public addDocument(options: AddDocumentOptions): Promise<AddDocumentResult> {
    return FirebaseFirestore.addDocument(options);
  }

  public async setDocument(options: SetDocumentOptions): Promise<void> {
    await FirebaseFirestore.setDocument(options);
  }

  public getDocument<T extends DocumentData>(
    options: GetDocumentOptions,
  ): Promise<GetDocumentResult<T>> {
    return FirebaseFirestore.getDocument<T>(options);
  }

  public async updateDocument(options: UpdateDocumentOptions): Promise<void> {
    await FirebaseFirestore.updateDocument(options);
  }

  public async deleteDocument(options: DeleteDocumentOptions): Promise<void> {
    await FirebaseFirestore.deleteDocument(options);
  }

  public getCollection<T extends DocumentData>(
    options: GetCollectionOptions,
  ): Promise<GetCollectionResult<T>> {
    return FirebaseFirestore.getCollection<T>(options);
  }

  public getCollectionGroup<T extends DocumentData>(
    options: GetCollectionOptions,
  ): Promise<GetCollectionGroupResult<T>> {
    return FirebaseFirestore.getCollectionGroup<T>(options);
  }

  public enableNetwork(): Promise<void> {
    return FirebaseFirestore.enableNetwork();
  }

  public disableNetwork(): Promise<void> {
    return FirebaseFirestore.disableNetwork();
  }

  public addDocumentSnapshotListener<T extends DocumentData>(
    options: AddDocumentSnapshotListenerOptions,
    callback: AddDocumentSnapshotListenerCallback<T>,
  ): Promise<CallbackId> {
    return FirebaseFirestore.addDocumentSnapshotListener<T>(
      options,
      (result, error) => {
        this.ngZone.run(() => {
          callback(result, error);
        });
      },
    );
  }

  public addCollectionSnapshotListener<T extends DocumentData>(
    options: AddCollectionSnapshotListenerOptions,
    callback: AddCollectionSnapshotListenerCallback<T>,
  ): Promise<CallbackId> {
    return FirebaseFirestore.addCollectionSnapshotListener<T>(
      options,
      (result, error) => {
        this.ngZone.run(() => {
          callback(result, error);
        });
      },
    );
  }

  public removeSnapshotListener(
    options: RemoveSnapshotListenerOptions,
  ): Promise<void> {
    return FirebaseFirestore.removeSnapshotListener(options);
  }

  public async removeAllListeners(): Promise<void> {
    await FirebaseFirestore.removeAllListeners();
  }
}
