import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUserComponent } from './dialog-add-user.component';
import { MatDialogRef } from '@angular/material/dialog';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from '../firebase.config';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

describe('DialogAddUserComponent', () => {
  let component: DialogAddUserComponent;
  let fixture: ComponentFixture<DialogAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogAddUserComponent
      ],
      providers: [
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
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
