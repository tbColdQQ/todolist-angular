import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCounter from './reducers/counter.reducer';


export interface AppState {

  [fromCounter.counterFeatureKey]: fromCounter.State;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromCounter.counterFeatureKey]: fromCounter.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
