import { IStore } from './store.model';

export interface RootStates extends IStore
{
  loadingRequestCount: number;
}
