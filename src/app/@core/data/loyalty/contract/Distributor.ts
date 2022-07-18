import { OwnershipType } from "../enums.model";

export interface Distributor
{
  broadcastCenterName: string;
  positon: string;
  activityZoneId: string;
  activitySectionId: string;
  officeArea: number;
  ownershipType: OwnershipType;
}
