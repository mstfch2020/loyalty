export class BaseResponse<T>
{
  errorMessage = '';
  isSuccess = false;
  Data!: T;
  errorMessages = new Array<string>();
  warningMessages = new Array<string>();
  successMessages = new Array<string>();
  informationMessages = new Array<string>();


}

export class BaseResult<T>
{
  Total = 0;
  Result = new Array<T>();
}
