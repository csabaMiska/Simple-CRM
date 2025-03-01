import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { error } from 'console';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    // AsyncPipe
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  readonly dialogRef = inject(MatDialogRef<DialogAddUserComponent>);
  user: User = new User();
  birthDate: Date = new Date();

  firestore = inject(Firestore);
  userCollection = collection(this.firestore, 'users');

  constructor() {
    this.user.birthDate = this.birthDate.getTime();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewUser() {
    addDoc(this.userCollection, this.user.toJSON())
      .then((result)=> {
        console.log(result);
        this.onNoClick();
      })
      .catch((e) => {
        console.error(e);
      })
  }
}
