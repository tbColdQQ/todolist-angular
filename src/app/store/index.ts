import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCounter from './reducers/counter.reducer';
import * as fromTodo from './reducers/todo.reducer';


export interface AppState {

  [fromCounter.counterFeatureKey]: fromCounter.State;
  [fromTodo.todoFeatureKey]: fromTodo.State;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromCounter.counterFeatureKey]: fromCounter.reducer,
  [fromTodo.todoFeatureKey]: fromTodo.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
