import { createFeatureSelector, createSelector } from "@ngrx/store"
import * as fromAuth from "./reducers";

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(fromAuth.authFeatureKey);

export const isLoggedIn = createSelector(selectAuthState, (auth) => {
    return !!auth.user
});

export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);