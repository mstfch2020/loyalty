import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { RootStates } from "../data/root/root-states.model";
import { StoreService } from "./store.service";

const rootStates: RootStates = {
  loadingRequestCount: 0,
};

@Injectable({ providedIn: "root" })
export class RootStoreService extends StoreService<RootStates> {

  constructor()
  {
    super();
    this.subject.next({
      loadingRequestCount: 0,
    });
  }

  isLoading(): Observable<boolean>
  {
    return this.select<RootStates>('loadingRequestCount').pipe(map(loadingRequestCount =>
    {
      return Number(loadingRequestCount) > 0;
    }),
      catchError(error => of(false)));
  }

  addLoadingRequest()
  {
    const value = this.subject.value;
    this.subject.next({
      ...value,
      loadingRequestCount: value.loadingRequestCount + 1,
    });
  }

  removeLoadingRequest()
  {
    const value = this.subject.value;
    this.subject.next({
      ...value,
      loadingRequestCount: value.loadingRequestCount - 1,
    });
  }
}
