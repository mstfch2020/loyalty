import { Period } from "../period.model";


export interface ContractConfirm
{
    contractId: string;
    from: Period;
    to: Period;
    tagIds: Array<string>;
}
