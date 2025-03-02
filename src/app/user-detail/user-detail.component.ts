import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, doc, docData, getDoc } from '@angular/fire/firestore';
import { NgZone } from '@angular/core';
import { User } from '../../models/user.class';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  private zone = inject(NgZone);
  userCollection = collection(this.firestore, 'users');

  userID: string = '';
  user$: Observable<User | undefined> = new Observable<User>();

  constructor() {
    this.route.paramMap.subscribe(paramMap => {
      this.userID = paramMap.get('id') ?? '';
    });

    const userDocRef = doc(this.userCollection, this.userID);
    this.user$ = docData(userDocRef) as Observable<User>;
  }

}
