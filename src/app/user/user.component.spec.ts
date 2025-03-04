import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from '../firebase.config';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [
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

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
