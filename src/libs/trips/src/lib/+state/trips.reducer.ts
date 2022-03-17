import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store';
import { Trip, mapToTrips, mapToTrip } from '../trips.model';
import {
    loadTripsAction,
    setTripsAction,
    tripCreatedAction,
    tripUpdatedAction,
    tripDeletedAction,
    setCurrentTripAction,
} from './trips.actions';

export interface TripsState {
    trips: Trip[];
    current: string;
    currentTrip: Trip;
}

const initialState: TripsState = {
    current: '',
    currentTrip: null,
    trips: [],
};

export const TRIPS_FEATURE_KEY = 'trips';

export const tripsReducer = createReducer(
    initialState,
    on(loadTripsAction, (state, action) => {
        const newState = { ...state, trips: [], currentTrip: null, current: ''};
        return newState;
    }),
    on(setTripsAction, (state, action) => {
        const newState = { ...state, trips: action.payload };
        return newState;
    }),
    on(tripCreatedAction, (state, action) => {
        const trips = [...state.trips];
        trips.push(action.payload.trip);
        const newState = { ...state, trips: trips };
        return newState;
    }),
    on(setCurrentTripAction, (state, action) => {
        let newState = { ...state };
        const idx = state.trips.findIndex(x => x.id === action.id);
        if (idx !== -1) {
            const currentTrip = mapToTrip(state.trips[idx]);
            const trips = [...state.trips];
            trips[idx] = currentTrip;
            newState = { ...state, trips: trips, currentTrip: currentTrip, current: action.id };
            return newState;
        } else {
           return newState;
        }
    }),    
    on(tripUpdatedAction, (state, action) => {
        const trips = [...state.trips];
        const idx = trips.findIndex(x => x.id === action.payload.changes.id);
        const updatedTrip = new Trip({
            ...state.trips[idx],
            ...action.payload.changes,
        });
        trips.splice(idx, 1, updatedTrip)
        const newState = { ...state, trips: trips };
        return newState;
    }),
    on(tripDeletedAction, (state, action) => {
        const trips = [...state.trips];
        const idx = trips.findIndex(x => x.id === action.payload.id);
        trips.splice(idx, 1)
        const newState = { ...state, trips: trips };
        return newState;
    })
);

export const getTripsState = createFeatureSelector<TripsState>(TRIPS_FEATURE_KEY);

export const selectAll = createSelector(
    getTripsState,
    (state: TripsState) => state
);

export const selectAllTrips = createSelector(selectAll, (state) =>
    mapToTrips(state.trips)
);

export const selectCurrentTrip = createSelector(selectAll, (state) =>
    state.currentTrip
);