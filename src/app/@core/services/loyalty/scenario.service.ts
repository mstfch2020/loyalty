import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { createBehavioralRewardFormGroup } from "../../data/loyalty/behavioral-reward.model";
import { createPeriodFormGroup } from "../../data/loyalty/period.model";
import { createPurchaseRewardFormGroup } from "../../data/loyalty/purchase-reward.model";
import { Scenario, scenarioInit } from "../../data/loyalty/scenario.model";

@Injectable({ providedIn: 'root' })
export class ScenarioService
{
  form: FormGroup;
  constructor(private formBuilder: FormBuilder)
  {
    this.form = this.formBuilder.group({});
    this.createForm(scenarioInit);
  }

  createForm(scenario: Scenario)
  {
    this.form = this.formBuilder.group({
      id: [scenario.id, [Validators.required]],
      title: [scenario.title, [Validators.required]],

      senarioType: [scenario.senarioType, [Validators.required]],
      purchaseRoundType: [scenario.purchaseRoundType, [Validators.required]],

      brandIds: [scenario.brandIds, [Validators.required]],
      productGroupIds: [scenario.productGroupIds, [Validators.required]],
      customerGroupIds: [scenario.customerGroupIds, [Validators.required]],
      userTypeIds: [scenario.userTypeIds, [Validators.required]],
      productDiscountProductGroupIds: [scenario.productDiscountProductGroupIds, [Validators.required]],
      freeProductIds: [scenario.freeProductIds, [Validators.required]],

      periodMin: this.formBuilder.group(createPeriodFormGroup(scenario.periodMin)),
      periodMax: this.formBuilder.group(createPeriodFormGroup(scenario.periodMax)),
      behavioralReward: this.formBuilder.group(createBehavioralRewardFormGroup(scenario.behavioralReward, this.formBuilder)),
      purchaseReward: this.formBuilder.group(createPurchaseRewardFormGroup(scenario.purchaseReward, this.formBuilder)),

      purchaseAmountMin: [scenario.purchaseAmountMin, [Validators.required]],
      purchaseAmountMax: [scenario.purchaseAmountMax, [Validators.required]],
      purchaseRound: [scenario.purchaseRound, [Validators.required]],

      activityId: [scenario.activityId, [Validators.required]],

      selectedCar1: [null, [Validators.required]],
      selectedCar2: [null, [Validators.required]],
      selectedCar3: [null, [Validators.required]],
      selectedCar4: [null, [Validators.required]],
    });
  }
}
