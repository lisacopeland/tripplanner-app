import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { bindNodeCallback, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    signIn(email: string, password: string) {
        let authenticationDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });
        let poolData = {
            UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
            ClientId: environment.cognitoAppClientId // Your client id here
        };

        let userPool = new CognitoUserPool(poolData);
        let userData = { Username: email, Pool: userPool };
        let cognitoUser = new CognitoUser(userData);
        return new Observable<{ type: string, result: any }>(obs => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (result: any) => {
                    obs.next({ type: 'success', result: result });
                    obs.complete();
                },
                onFailure: (error: any) => obs.error(error),
                newPasswordRequired: (userAttributes, requiredAttributes) => {
                    obs.next({ type: 'newPasswordRequired', result: [userAttributes, requiredAttributes] });
                    obs.complete();
                }
            });
        });
    }

    signUp(email: string, password: string) {
        var poolData = {
            UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
            ClientId: environment.cognitoAppClientId // Your client id here
        };
        var userPool = new CognitoUserPool(poolData);
        return new Observable<{ type: string, result: any }>(obs => {
        userPool.signUp(email, password, [], [], (
            err,
            result
        ) => {
            if (err) {
                obs.error(err);
            }
            obs.next({ type: 'success', result: result});
        });      
    });  
    }

    signOut() {
        let poolData = {
            UserPoolId: environment.cognitoUserPoolId,
            ClientId: environment.cognitoAppClientId
        };
        let userPool = new CognitoUserPool(poolData);
        let cognitoUser = userPool.getCurrentUser();
        return new Observable<{ type: string, result: any }>(obs => {        
        cognitoUser.signOut(() => {
            obs.next({ type: 'success', result: ''});
        });
    });
    }

    isLoggedIn(): boolean {
        var isAuth = false;

        let poolData = {
            UserPoolId: environment.cognitoUserPoolId,
            ClientId: environment.cognitoAppClientId
        };

        var userPool = new CognitoUserPool(poolData);
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession((err: any, session: any) => {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                }
                isAuth = session.isValid();
            })
        }
        return isAuth;
    }
}