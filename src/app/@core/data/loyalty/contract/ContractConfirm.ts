import { Period } from "../period.model";


export interface ContractConfirm
{
  customerId: string;
  contractId: string;
  from: Period;
  to: Period;
  tagIds: Array<string>;
}
