
enum AbstractEnum {
  SUCCESS = 'success'
}

export interface IResult<ValueType, TEnumValue extends string> {
  result: TEnumValue | TEnumValue[],
  value?: ValueType,
  message?: string
}

export class Result<ValueType, TEnumValue extends string> {

  private result!: TEnumValue[]
  private value?: ValueType
  private message?: string

  constructor({
    result,
    value,
    message
  }: IResult<ValueType, TEnumValue>) {
    this.result = Array.isArray(result) ? result : [result];
    this.value = value;
    this.message = message;
  }

  static ok<ValueType, TEnumValue extends string>(value?: ValueType): Result<ValueType, TEnumValue> {
    return new Result({
      result: AbstractEnum.SUCCESS as TEnumValue,
      value
    });
  }

  static error<ValueType, TEnumValue extends string>(result: TEnumValue): Result<ValueType, TEnumValue> {
    return new Result({ result });
  }

  transferError<NewValueType, NewTEnumValue extends string>(result: NewTEnumValue): Result<NewValueType, NewTEnumValue> {
    const newValues = [...this.result] as unknown as NewTEnumValue[]
    newValues.push(result);
    return new Result<NewValueType, NewTEnumValue>({
      result: newValues,
      value: this.value as NewValueType,
      message: this.message
    });
  }

  transferErrors<NewValueType, NewTEnumValue extends string>(results: NewTEnumValue[]): Result<NewValueType, NewTEnumValue> {
    const newValues = [...this.result, ...results] as unknown as NewTEnumValue[]
    return new Result<NewValueType, NewTEnumValue>({
      result: newValues,
      value: this.value as NewValueType,
      message: this.message
    });
  }

  pipe(value: Partial<IResult<ValueType, TEnumValue>>) {
    Object.assign(this, value);
    return this;
  }

  lastErrorMatchWith(result: TEnumValue): boolean {
    return (this.result && this.result.length > 0) && this.result[this.result.length - 1] === result;
  }

  errorsContains(result: TEnumValue): boolean {
    return (this.result && this.result.length > 0) && this.result.includes(result);
  }

  get IsOk(): boolean {
    return this.result[this.result.length - 1] === AbstractEnum.SUCCESS;
  }

  get IsError(): boolean {
    return this.result[this.result.length - 1] !== AbstractEnum.SUCCESS;
  }
  get Result(): TEnumValue[] {
    return this.result;
  }

  get Value(): ValueType {
    return this.value as ValueType;
  }
  get Message(): string {
    return this.message as string;
  }
}