import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '..';
import { counterFeatureKey, State } from '../reducers/counter.reducer';

export const selectCounter = createFeatureSelector<AppState, State>(counterFeatureKey)
export const selectCount = createSelector(selectCounter, state => state.count)