import { ContractType, EmploymentType } from "../enums.model";
import { Period } from "../period.model";
import { Distributor } from "./Distributor";
import { ShopContract } from "./ShopContract";
import { Teacher } from "./Teacher";


export interface Contract
{
  customerId: string;
  contractId: string;
  mobile: string;
  phone: string;
  firstName: string;
  lastName: string;
  nationalCode: string;
  personnelCode: string;
  postalCode: string;
  address: string;
  stateId: string;
  cityId: string;
  type: ContractType;
  brandId: string;
  teachers: Array<Teacher>;
  distributor: Distributor;
  shopContract: ShopContract;
  tagIds: Array<string>;
  from: Period;
  to: Period;
  employmentType: EmploymentType;
}

