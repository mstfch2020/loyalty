
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
}

export const externalPointAwardInit: ExternalPointAward =
{
  title: '',
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
};
