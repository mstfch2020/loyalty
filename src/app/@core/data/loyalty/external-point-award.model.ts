import { Period, periodInit } from "./period.model";

export interface ExternalPointAwardGrid
{
  id: string;
  exporterBrand: string;
  group: string;
  point: string;
  providerBrand: string;
  title: string;
}

export interface ExternalPointAward
{
  title: string;
  periodMin: Period;
  periodMax: Period;
  text: string;
  providerBrandId: string;
  userTypeId: string;
  groupId: string;
  exporterBrand: string;
  exporterBrandLogoId: string;
  exporterBrandHexaCode: string;
  pointAmount: number;
  awardFileId: string;
  id: string;
  categoryId: string;
  exporterBrandLogoName: string;
  awardFileName: string;
}

export const externalPointAwardInit: ExternalPointAward =
{
  title: '',
  periodMax: periodInit,
  periodMin: periodInit,
  text: '',
  providerBrandId: '',
  userTypeId: '',
  groupId: '',
  exporterBrand: '',
  exporterBrandLogoId: '',
  exporterBrandHexaCode: '',
  pointAmount: 0,
  id: '',
  categoryId: '',
  awardFileId: '',
  exporterBrandLogoName: '',
  awardFileName: '',
};
