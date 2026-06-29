import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: true,
})
export class FileSizePipe implements PipeTransform {
  transform(sizeInBytes: number | null | undefined): string {
    if (sizeInBytes == null || sizeInBytes <= 0) {
      return '0 MB';
    }

    const sizeInMb = sizeInBytes / (1024 * 1024);
    return `${sizeInMb.toFixed(2)} MB`;
  }
}
