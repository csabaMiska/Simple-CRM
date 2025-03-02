import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { log } from 'console';
import { User } from '../../models/user.class';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  userCollection = collection(this.firestore, 'users');

  constructor() {}

  userID: string = '';
  user: User = new User();

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userID = paramMap.get('id') ?? '';
      this.getUser();
    });
  }

  getUser() {
    const userDocRef = doc(this.userCollection, this.userID);
    getDoc(userDocRef)
    .then(docSnap => {
      if (docSnap.exists()) {
        this.user = new User(docSnap.data());
      } else {
        console.log("User not found!");
      }
    })
    .catch(error => {
      console.error("Error fetching user:", error);
    });
  }
}
