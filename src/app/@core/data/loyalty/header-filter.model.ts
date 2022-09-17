import { FilterNames } from "./enums.model";

export class HeaderFilter
{
  constructor(public filterName: FilterNames, public title: string = '') { }

  getFilterName(): any
  {
    return (this.filterName === FilterNames.None ? this.title : this.filterName);
  }
}
