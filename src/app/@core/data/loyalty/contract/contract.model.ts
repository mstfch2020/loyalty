import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Contract } from "./Contract";
import { Distributor } from "./Distributor";
import { ShopContract } from "./ShopContract";
import { Teacher } from "./Teacher";

export interface ActiveContract
{

}

export class RequestContract
{

}

export const distributorInit: Distributor = {
  id: '',
  broadcastCenterName: '',
  positon: '',
  activityZone: 0,
  activitySection: 0,
  officeArea: 0,
  ownershipType: 0
};

export const shopContractInit: ShopContract = {
  id: '',
  shopName: '',
  postion: '',
  activitySection: 0,
  officeArea: 0,
  ownershipType: 0
};

export const teacherInit: Teacher = {
  id: '',
  state: 0,
  city: 0,
  address: '',
  teahcingArea: 0,
  section: 0,
  grade: 0,
  lesson: 0,
  school: '',
  schoolType: 0
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
  state: 0,
  city: 0,
  type: 0,
  brandId: '',
  teachers: [],
  distributor: distributorInit,
  shopContract: shopContractInit,
};


export const createDistributor = (distributor: Distributor, formBuilder: FormBuilder): FormGroup =>
{
  if (!distributor)
  {
    distributor = distributorInit;
  }
  return formBuilder.group({
    id: [distributor.id, [Validators.required]],
    broadcastCenterName: [distributor.broadcastCenterName, [Validators.required]],
    postion: [distributor.positon, [Validators.required]],
    activityZone: [distributor.activityZone, [Validators.required]],
    activitySection: [distributor.activitySection, [Validators.required]],
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
    id: [shopContract.id, [Validators.required]],
    shopName: [shopContract.shopName, [Validators.required]],
    postion: [shopContract.postion, [Validators.required]],
    activitySection: [shopContract.activitySection, [Validators.required]],
    officeArea: [shopContract.officeArea, [Validators.required]],
    ownershipType: [shopContract.ownershipType, [Validators.required]],
  });
};

export const createTeacher = (teacher: Teacher, formBuilder: FormBuilder): FormGroup =>
{
  if (!teacher)
  {
    teacher = teacherInit;
  }
  return formBuilder.group({
    id: [teacher.id, [Validators.required]],
    state: [teacher.state, [Validators.required]],
    city: [teacher.city, [Validators.required]],
    address: [teacher.address, [Validators.required]],
    teahcingArea: [teacher.teahcingArea, [Validators.required]],
    section: [teacher.section, [Validators.required]],
    grade: [teacher.grade, [Validators.required]],
    lesson: [teacher.lesson, [Validators.required]],
    school: [teacher.school, [Validators.required]],
    schoolType: [teacher.schoolType, [Validators.required]],
  });
};


