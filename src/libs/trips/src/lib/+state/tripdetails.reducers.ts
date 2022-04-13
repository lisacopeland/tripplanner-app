import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store';
import {
    TripDetail, 
    mapToTripDetails, 
    mapToTripDetail,
    loadTripDetailsAction,
    setTripDetailsAction,
    tripDetailCreatedAction,
    tripDetailUpdatedAction,
    tripDetailDeletedAction,
    setCurrentTripDetailAction,
} from '@tripplanner/trips';

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

export const TRIPDETAILS_FEATURE_KEY = 'tripdetails';

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
    on(tripDetailCreatedAction, (state, action) => {
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
    on(tripDetailUpdatedAction, (state, action) => {
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
    on(tripDetailDeletedAction, (state, action) => {
        const TripDetails = [...state.TripDetails];
        const idx = TripDetails.findIndex(x => x.id === action.payload.id);
        TripDetails.splice(idx, 1)
        const newState = { ...state, TripDetails: TripDetails };
        return newState;
    })
);

export const getTripDetailsState = createFeatureSelector<TripDetailsState>(TRIPDETAILS_FEATURE_KEY);

const selectAll = createSelector(
    getTripDetailsState,
    (state: TripDetailsState) => state
);

export const selectAllTripDetails = createSelector(selectAll, (state) =>
    mapToTripDetails(state.TripDetails)
);

export const selectCurrentTripDetail = createSelector(selectAll, (state) =>
    state.currentTripDetail
);