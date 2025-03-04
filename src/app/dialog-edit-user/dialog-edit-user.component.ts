import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable } from 'rxjs';
import { User } from '../../interface/user.interface';


@Component({
  selector: 'app-dialog-edit-user',
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
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  readonly dialogRef = inject(MatDialogRef<DialogEditUserComponent>);
  private cdRef = inject(ChangeDetectorRef);
  private firestore = inject(Firestore);
  userCollection = collection(this.firestore, 'users');

  user$: User = {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: null,
    address: '',
    zipCode: null,
    city: ''
  };

  loading: boolean = false
  userID: string | undefined = '';
 

  constructor(@Inject(MAT_DIALOG_DATA) public data: { user$: Observable<User> }) {
    data.user$.subscribe(user => {
      this.user$ = user;
      this.userID = user.id;
      this.cdRef.markForCheck();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateUserInfos() {
    this.loading = true;
    this.cdRef.markForCheck();

    const updatedFields = {
        email: this.user$.email,
        address: this.user$.address,
        zipCode: this.user$.zipCode,
        city: this.user$.city
    }

    updateDoc(doc(this.userCollection, this.userID), updatedFields)
      .then(() => {
        this.loading = false;
        this.cdRef.markForCheck();
        this.onNoClick();
      })
      .catch((e) => {
        this.cdRef.markForCheck();
        console.error(e);
      })
  }
}
