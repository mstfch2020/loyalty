import { IStore } from '../root/store.model';
import { User } from './user.model';

export interface UserState extends IStore
{
  user: User | null;
}
