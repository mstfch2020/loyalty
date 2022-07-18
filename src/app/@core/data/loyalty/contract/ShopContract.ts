import { OwnershipType } from "../enums.model";

export interface ShopContract
{
  shopName: string;
  postion: string;
  activitySectionId: string;
  officeArea: number;
  ownershipType: OwnershipType;
}
