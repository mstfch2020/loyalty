export class BaseResponse<T>
{
  meta = new BaseResponseMeta();
  data!: T;
  pagination:any;

  errorMessage = '';
  isSuccess = false;
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


export class BaseResponseMeta
{
  code = 0;
  errorMessage = '';
  errors :any;

}
