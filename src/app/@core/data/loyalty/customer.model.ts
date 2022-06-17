import { SenarioStatusType } from './enums.model';
import { Period } from './period.model';

export interface CustomerMainGrid
{
  id: string;
  phone: string;
  score: number;
  brands: Array<string>;
  group: string;
  userType: string;
  registerDate: Period;

}

export interface BrandGroup { brand: string; group: string; }
export interface LevelBrand { level: string; brand: string; }
export interface CustomerScenario
{
  title: string;
  rewards: Array<string>;
  minDate: Period;
  maxDate: Period;
  brands: Array<string>;
  status: SenarioStatusType;
}

export interface CustomerDetail
{
  id: string;
  phone: string;
  userType: string;
  brands: Array<string>;
  registerDate: Period;
  currentGroups: Array<BrandGroup>;
  nextGroups: Array<BrandGroup>;
  currentLevels: Array<LevelBrand>;
  nextLevels: Array<LevelBrand>;
  currentScore: number;
  earningScore: number;
  expendingScore: number;
  senarios: Array<CustomerScenario>;

}


export interface CustomerDescription
{
  brand: string;
  title: string;
}

export interface CustomerSubGrid
{
  date: Period;
  operation: string;
  operationType: 1;
  score: 20;
  desctiption: CustomerDescription;
}
