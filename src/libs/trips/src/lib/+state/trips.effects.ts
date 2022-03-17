import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map } from "rxjs";
import { TripService } from "../trips.service";
import { loadTripsAction, setTripsAction } from "./trips.actions";

@Injectable()
export class TripsEffects {
    concurrentRequests = 5;

    constructor(
        public service: TripService,
        public actions$: Actions
    ) { }

    loadEmails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTripsAction),
            mergeMap((action) => {
                return this.service.query(action.search).pipe(
                    map((response) => {
                        return setTripsAction({ payload: response });
                    })
                );
            }, this.concurrentRequests)
        )
    );
}
