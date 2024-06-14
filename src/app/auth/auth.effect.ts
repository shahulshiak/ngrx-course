import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

// injected only in ngrx effects library
@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      tap(action => sessionStorage.setItem('user', JSON.stringify(action.user)))
    ),
    { dispatch: false });

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => { sessionStorage.removeItem('user'); this.router.navigateByUrl('/login') })
    ),
    { dispatch: false });
}

