import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { IStore } from '../data/root/store.model';


const storeInit: IStore = {};

export class StoreService<T extends IStore> {


  public subject = new BehaviorSubject<T>(storeInit as T);
  public store = this.subject.asObservable().pipe(distinctUntilChanged());

  public select<T>(name: string): Observable<T | unknown>
  {
    return this.store.pipe(pluck(name));
  }
}
