import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from '../firebase.config';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '123' } }, paramMap: of({ get: () => '123' }) },
        },
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

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
