import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { User } from '../../interface/user.interface';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    DatePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  readonly dialog = inject(MatDialog);
  userCollection = collection(this.firestore, 'users');

  userID: string = '';
  user$: Observable<User>;

  constructor() {
    this.route.paramMap.subscribe(paramMap => {
      this.userID = paramMap.get('id') ?? '';
    });

    const userDocRef = doc(this.userCollection, this.userID);
    this.user$ = docData(userDocRef, { idField: 'id' }) as Observable<User>;
  }

  openEditUserDialog(): void{
    this.dialog.open(DialogEditUserComponent, {
      data: {user$: this.user$}
    });
  }

}
