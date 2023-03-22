import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackbar: MatSnackBar, private zone: NgZone) {}
  Blob(message: string, action: string) {
    this.snackbar.open(message, action),
      {
        duration: 2000,
      };
  }
}
