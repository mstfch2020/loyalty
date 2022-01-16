import { Injectable } from "@angular/core";
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
