import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { LoadingComponent } from './../loading.component';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    constructor(private snackbar: MatSnackBar){}
    loadingStarts() {
        this.snackbar.openFromComponent(LoadingComponent);
    }

    loadingEnds() {
        this.snackbar.dismiss();
    }
}
