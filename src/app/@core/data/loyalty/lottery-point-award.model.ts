import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Period, periodInit } from "./period.model";

export interface LotteryPointAwardGrid
{
  id: string;
  title: string;
  providerBrand: string;
  minimumPoint: number;
  maximumPoint: number;
}

export interface LotteryPointAward
{
  id: string;
  title: string;
  text: string;
  providerBrandId: string;
  imageId: string;
  groups: Array<LotteryGroup>;
  periodMin: Period;
  periodMax: Period;
  imageIdName: string;
}

export interface LotteryGroup
{
  lotteryGroupId?: string;
  groupId: string;
  groupName: string;
  tickets: Array<LotteryGroupTicket>;
}

export const lotteryGroupInit: LotteryGroup =
{
  lotteryGroupId: '',
  groupId: '',
  groupName: '',
  tickets: [],
};

export interface LotteryGroupTicket
{
  ticketId?: string;
  ticketCount: number;
  pointAmount: number | null;
}

export const lotteryGroupTicketInit: LotteryGroupTicket =
{
  ticketId: '',
  ticketCount: 0,
  pointAmount: 0
};

export const lotteryPointAwardInit: LotteryPointAward =
{
  id: '',
  title: '',
  providerBrandId: '',
  groups: [],
  imageId: '',
  periodMax: periodInit,
  periodMin: periodInit,
  text: '',
  imageIdName: '',
};

export const createLotteryGroups = (group: LotteryGroup | null, formBuilder: FormBuilder): FormGroup =>
{
  if (!group)
  {
    group = lotteryGroupInit;
  }
  return formBuilder.group({
    lotteryGroupId: [group.lotteryGroupId, [Validators.required]],
    groupId: [group.groupId, [Validators.required]],
    groupName: [group.groupName, [Validators.required]],
    tickets: !group.tickets ? [] : formBuilder.array(group.tickets?.map(ticket => createLotteryGroupTicket(ticket, formBuilder))),
  });
};

export const createLotteryGroupTicket = (ticket: LotteryGroupTicket | null, formBuilder: FormBuilder): FormGroup =>
{
  if (!ticket)
  {
    ticket = lotteryGroupTicketInit;
  }
  return formBuilder.group({
    ticketId: [ticket.ticketId, [Validators.required]],
    ticketCount: [ticket.ticketCount, [Validators.required]],
    pointAmount: [ticket.pointAmount, [Validators.required]],
  });
};
