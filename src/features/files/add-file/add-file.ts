import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FileSizePipe } from '../../../shared/pipes/file-size.pipe';

@Component({
  selector: 'app-add-file',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FileSizePipe,
  ],
  templateUrl: './add-file.html',
  styleUrl: './add-file.scss',
})
export class AddFile {
  private readonly fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef);

  selectedFile: File | null = null;

  form: FormGroup = this.fb.group({
    fileName: ['', Validators.required],
    fileSize: [0, Validators.required],
    base64: ['', Validators.required],
    description: ['', Validators.required],
  });

  closeDialog() {
    this.dialogRef.close();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.selectedFile = file;
    this.form.patchValue({ fileName: file.name, fileSize: file.size });

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      this.form.patchValue({ base64: typeof result === 'string' ? result : '' });
    };
    reader.readAsDataURL(file);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];

    if (!file) {
      return;
    }

    this.selectedFile = file;
    this.form.patchValue({ fileName: file.name, fileSize: file.size });
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      this.form.patchValue({ base64: typeof result === 'string' ? result : '' });
    };
    reader.readAsDataURL(file);
  }

  preventDrop(event: DragEvent) {
    event.preventDefault();
  }
}
