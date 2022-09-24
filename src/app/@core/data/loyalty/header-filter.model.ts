import { FilterNames } from "./enums.model";

export class HeaderFilter
{
  constructor(public filterName: FilterNames, public title: string = '', public expression: string = '', public showExpression: FilterNames = FilterNames.None) { }

  getFilterName(): any
  {
    return (this.filterName === FilterNames.None ? this.title : this.filterName);
  }
}
