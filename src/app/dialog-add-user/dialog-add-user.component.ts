import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../interface/user.interface';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})


export class DialogAddUserComponent {
  readonly dialogRef = inject(MatDialogRef<DialogAddUserComponent>);
  user$: User = {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: null,
    address: '',
    zipCode: null,
    city: ''
  };

  birthDate: Date = new Date();
  loading: boolean = false

  private firestore = inject(Firestore);
  userCollection = collection(this.firestore, 'users');

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDateChange(event: Date) {
    this.birthDate = event;
    this.user$.birthDate = this.birthDate.getTime();
  }

  addNewUser() {
    this.loading = true;
    addDoc(this.userCollection, this.user$)
      .then(() => {
        this.loading = false;
        this.onNoClick();
      })
      .catch((e) => {
        console.error(e);
      })
  }
}
