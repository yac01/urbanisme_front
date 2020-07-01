import { Injectable, Directive } from '@angular/core';
import { HttpService, HttpMethod } from './abstract/http.service';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, AsyncValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';


@Directive({
  selector: '[appUnicityAsyncValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UnicityAsyncValidatorDirective, multi:
true}]
})
export class UnicityAsyncValidatorDirective implements AsyncValidator {
    constructor(private http: HttpService) {}
  validate(control: AbstractControl): Observable<ValidationErrors|null> {
    let searched = '';
    Object.keys(control.parent.controls).forEach(key => {
          if (control.parent.controls[key] === control) {
              searched = key;
              return;
          }
      });

    // tslint:disable-next-line: align
    return (this.http.exchange(`/urban/user/unique?field=${searched}&value=${control.value}`,
    HttpMethod.GET, {}) as Observable<boolean> )
    .pipe(exhaustMap(res => {
        if (!res) {
            return [{'unicity': {value : control.value}}];
        }
        return null;
    }));
  }
}
