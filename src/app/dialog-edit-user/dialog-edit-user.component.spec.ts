import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserComponent } from './dialog-edit-user.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from '../firebase.config';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

describe('DialogEditUserComponent', () => {
  let component: DialogEditUserComponent;
  let fixture: ComponentFixture<DialogEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditUserComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {user$: of({ id: '123', name: 'Test User' })} },
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        provideFirebaseApp(() => initializeApp({
          projectId: firebaseConfig.projectId,
          appId: firebaseConfig.apiKey,
          storageBucket: firebaseConfig.storageBucket,
          apiKey: firebaseConfig.apiKey,
          authDomain: firebaseConfig.authDomain,
          messagingSenderId: firebaseConfig.messagingSenderId,
          measurementId: firebaseConfig.measurementId
        })),
        provideFirestore(() => getFirestore()),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
