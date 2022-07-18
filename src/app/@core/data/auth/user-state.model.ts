import { IStore } from '../root/store.model';
import { BackOfficeUser } from './user.model';

export interface UserState extends IStore
{
  user: BackOfficeUser | null;
}
