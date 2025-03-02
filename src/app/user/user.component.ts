import { Component, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: number;
  address: string;
  zipCode: number;
  city: string;
  id?: string; 
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  dataSource = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['name', 'birthday', 'zipcode', 'city', 'address'];

  private firestore = inject(Firestore);
  userCollection = collection(this.firestore, 'users');
  users$: Observable<User[]>;

  constructor() {
    this.users$ = collectionData(this.userCollection, { idField: 'id' }) as Observable<User[]>;
  }

  ngOnInit() {
    this.users$.subscribe(users => {
      this.dataSource.data = users ?? [];
    });
  }

  openDialog(): void {
    this.dialog.open(DialogAddUserComponent)
  }
}
