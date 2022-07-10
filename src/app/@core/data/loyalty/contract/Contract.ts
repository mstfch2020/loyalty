import { Distributor } from "./Distributor";
import { ShopContract } from "./ShopContract";
import { Teacher } from "./Teacher";


export interface Contract
{
  contractId: string;
  mobile: string;
  phone: string;
  firstName: string;
  lastName: string;
  nationalCode: string;
  personnelCode: string;
  postalCode: string;
  address: string;
  state: number;
  city: number;
  type: number;
  brandId: string;
  teachers: Array<Teacher>;
  distributor: Distributor;
  shopContract: ShopContract;
}

