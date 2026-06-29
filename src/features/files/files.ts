import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AddFile } from './add-file/add-file';

@Component({
  selector: 'app-files',
  imports: [
    DatePipe,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './files.html',
  styleUrl: './files.scss',
})
export class Files {
  displayedColumns = ['name', 'lastModified'];
  files = [
    { name: 'Roadmap.pdf', lastModified: new Date('2026-06-20') },
    { name: 'Design Notes.docx', lastModified: new Date('2026-06-22') },
  ];

  constructor(private dialog: MatDialog) {}

  addFile() {
    this.dialog.open(AddFile, {
      width: '500px',
      height: '550px',
      disableClose: true,
    });
  }
}
