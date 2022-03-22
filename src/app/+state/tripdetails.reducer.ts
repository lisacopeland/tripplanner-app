import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store';
import { TripDetail, mapToTripDetails, mapToTripDetail } from '../models/trip-details.model';
import {
    loadTripDetailsAction,
    setTripDetailsAction,
    TripDetailCreatedAction,
    TripDetailUpdatedAction,
    TripDetailDeletedAction,
    setCurrentTripDetailAction,
} from './TripDetails.actions';

export interface TripDetailsState {
    TripDetails: TripDetail[];
    current: string;
    currentTripDetail: TripDetail;
}

const initialState: TripDetailsState = {
    current: '',
    currentTripDetail: null,
    TripDetails: [],
};

export const TripDetailS_FEATURE_KEY = 'TripDetails';

export const tripDetailsReducer = createReducer(
    initialState,
    on(loadTripDetailsAction, (state, action) => {
        const newState = { ...state, TripDetails: [], currentTripDetail: null, current: ''};
        return newState;
    }),
    on(setTripDetailsAction, (state, action) => {
        const newState = { ...state, TripDetails: action.payload };
        return newState;
    }),
    on(TripDetailCreatedAction, (state, action) => {
        const TripDetails = [...state.TripDetails];
        TripDetails.push(action.payload.TripDetail);
        const newState = { ...state, TripDetails: TripDetails };
        return newState;
    }),
    on(setCurrentTripDetailAction, (state, action) => {
        let newState = { ...state };
        const idx = state.TripDetails.findIndex(x => x.id === action.id);
        if (idx !== -1) {
            const currentTripDetail = mapToTripDetail(state.TripDetails[idx]);
            const TripDetails = [...state.TripDetails];
            TripDetails[idx] = currentTripDetail;
            newState = { ...state, TripDetails: TripDetails, currentTripDetail: currentTripDetail, current: action.id };
            return newState;
        } else {
           return newState;
        }
    }),    
    on(TripDetailUpdatedAction, (state, action) => {
        const TripDetails = [...state.TripDetails];
        const idx = TripDetails.findIndex(x => x.id === action.payload.changes.id);
        const updatedTripDetail = new TripDetail({
            ...state.TripDetails[idx],
            ...action.payload.changes,
        });
        TripDetails.splice(idx, 1, updatedTripDetail)
        const newState = { ...state, TripDetails: TripDetails };
        return newState;
    }),
    on(TripDetailDeletedAction, (state, action) => {
        const TripDetails = [...state.TripDetails];
        const idx = TripDetails.findIndex(x => x.id === action.payload.id);
        TripDetails.splice(idx, 1)
        const newState = { ...state, TripDetails: TripDetails };
        return newState;
    })
);

export const getTripDetailsState = createFeatureSelector<TripDetailsState>(TripDetailS_FEATURE_KEY);

export const selectAll = createSelector(
    getTripDetailsState,
    (state: TripDetailsState) => state
);

export const selectAllTripDetails = createSelector(selectAll, (state) =>
    mapToTripDetails(state.TripDetails)
);

export const selectCurrentTripDetail = createSelector(selectAll, (state) =>
    state.currentTripDetail
);