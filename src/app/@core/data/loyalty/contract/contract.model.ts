import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractType } from '../enums.model';
import { Period, periodInit } from '../period.model';
import { Contract } from './Contract';
import { Distributor } from './Distributor';
import { ShopContract } from './ShopContract';
import { Teacher } from './Teacher';

export interface ActiveContract
{
  contractId: string;
  mobile: string;
  userType: string;
  brand: string;
  tags: Array<string>;
  dateFrom: Period;
  dateTo: Period;
}

export interface RequestContract
{
  contractId: string;
  mobile: string;
  userType: string;
  brand: string;
  date: Period;
  status: number;
}

export interface PromoterContracts
{
  contractId: string;
  mobile: string;
  userType: string;
  brand: string;
  tags: Array<string>;
  dateFrom: Period;
  dateTo: Period;
}

export const distributorInit: Distributor = {
  broadcastCenterName: '',
  positon: '',
  activityZoneId: '',
  activitySectionId: '',
  officeArea: 0,
  ownershipType: 0
};

export const shopContractInit: ShopContract = {
  shopName: '',
  postion: '',
  activitySectionId: '',
  officeArea: 0,
  ownershipType: 0
};

export const teacherInit: Teacher = {
  area: '',
  level: '',
  grade: '',
  lesson: '',
  school: '',
  schoolType: 0,
};

export const contractInit: Contract = {
  contractId: '',
  mobile: '',
  phone: '',
  firstName: '',
  lastName: '',
  nationalCode: '',
  personnelCode: '',
  postalCode: '',
  address: '',
  stateId: '',
  cityId: '',
  type: ContractType.None,
  brandId: '',
  teachers: [],
  distributor: distributorInit,
  shopContract: shopContractInit,
  tagIds: [],
  from: periodInit,
  to: periodInit

};


export const createDistributor = (distributor: Distributor, formBuilder: FormBuilder): FormGroup =>
{
  if (!distributor)
  {
    distributor = distributorInit;
  }
  return formBuilder.group({
    broadcastCenterName: [distributor.broadcastCenterName, [Validators.required]],
    positon: [distributor.positon, [Validators.required]],
    activityZoneId: [distributor.activityZoneId, [Validators.required]],
    activitySectionId: [distributor.activitySectionId, [Validators.required]],
    officeArea: [distributor.officeArea, [Validators.required]],
    ownershipType: [distributor.ownershipType, [Validators.required]],
  });
};

export const createShopContract = (shopContract: ShopContract, formBuilder: FormBuilder): FormGroup =>
{
  if (!shopContract)
  {
    shopContract = shopContractInit;
  }
  return formBuilder.group({
    shopName: [shopContract.shopName, [Validators.required]],
    postion: [shopContract.postion, [Validators.required]],
    activitySectionId: [shopContract.activitySectionId, [Validators.required]],
    officeArea: [shopContract.officeArea, [Validators.required]],
    ownershipType: [shopContract.ownershipType, [Validators.required]],
  });
};

export const createTeacher = (teacher: Teacher | null, formBuilder: FormBuilder): FormGroup =>
{
  if (!teacher)
  {
    teacher = teacherInit;
  }
  return formBuilder.group({
    // id: [teacher.id, [Validators.required]],
    area: [teacher.area, [Validators.required]],
    level: [teacher.level, [Validators.required]],
    grade: [teacher.grade, [Validators.required]],
    lesson: [teacher.lesson, [Validators.required]],
    school: [teacher.school, [Validators.required]],
    schoolType: [teacher.schoolType, [Validators.required]],
  });
};


