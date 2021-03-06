import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "@tripplanner/auth";
import { mergeMap, map } from "rxjs";
import { loginAction, logOutUserAction, setUserAction, signupUserAction, userLoggedOutAction, userSignedupAction } from "./auth.actions";

@Injectable()
export class AuthEffects {
    concurrentRequests = 5;

    constructor(
        public service: AuthService,
        public actions$: Actions
    ) { }

    signIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginAction),
            mergeMap((action) => {
                return this.service.signIn(action.payload.email, action.payload.password).pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        return setUserAction({ payload: { email: action.payload.email }});
                    })
                );
            }, this.concurrentRequests)
        )
    );

    signUp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signupUserAction),
            mergeMap((action) => {
                return this.service.signUp(action.payload.email, action.payload.password).pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        return userSignedupAction({ payload: { email: action.payload.email } });
                    })
                );
            }, this.concurrentRequests)
        )
    );

    signOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logOutUserAction),
            mergeMap((action) => {
                return this.service.signOut().pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        return userLoggedOutAction({ payload: { } });
                    })
                );
            }, this.concurrentRequests)
        )
    );
              
}
