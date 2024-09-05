import Joi from "joi";
import { Picture } from '@/types/user-types';
import { Ingredient } from "@/types/blog-types";

export default class InputField<
  T extends
    | string
    | File
    | null
    | string[]
    | number
    | Ingredient
    | Ingredient[],
  U = T | Picture
> {
  modifiedValue: boolean;
  initialValue: U;
  value: T;
  schema: Joi.AnySchema<T>;
  errorMessage: string;
  type: string;
  label: string;
  warningMessage?: string;
  options?: string[];
  step?: number;
  onSet?: (value: T) => void;
  max?: number;
  maxImageSize?: number;
  disabled?: boolean;
  min?: number;
  constructor({
    initialValue = "" as U,
    schema,
    type,
    label,
    options,
    step,
    onSet,
    maxImageSize,
    max,
    disabled,
    min
  }: {
    initialValue?: U;
    schema: Joi.AnySchema<T>;
    type: string;
    label: string;
    options?: string[];
    step?: number;
    onSet?: (value: T) => void;
    max?: number;
    maxImageSize?: number;
    disabled?: boolean;
    min?: number;
  }) {
    this.modifiedValue = false;
    this.schema = schema;
    this.setValue = this.setValue.bind(this);
    this.getCorrectValue = this.getCorrectValue.bind(this);
    this.setInitialValue = this.setInitialValue.bind(this);
    this.setErrorMessage = this.setErrorMessage.bind(this);
    this.setWarning = this.setWarning.bind(this);
    this.validate = this.validate.bind(this);
    this.type = type;
    this.label = label;
    this.errorMessage = "";
    this.initialValue = initialValue;
    this.value = "" as T;
    this.options = options;
    this.step = step;
    this.onSet = onSet;
    this.max = max;
    this.maxImageSize = maxImageSize;
    this.disabled = disabled;
    this.min = min;
  }

  getCorrectValue() {
    if (this.modifiedValue) return this.value;
    return this.initialValue;
  }

  setWarning(warnMsg: string) {
    if (this.initialValue) this.warningMessage = warnMsg;
  }

  setValue(newValue: T | null) {
    if (newValue === null || newValue === undefined) {
      this.value = null as T;
      return;
    }
    this.value = newValue;
    if (String(this.value) === String(this.initialValue))
      this.modifiedValue = false;
    else if (
      Array.isArray(newValue) &&
      Array.isArray(this.initialValue) &&
      newValue.length !== this.initialValue.length
    ) {
      this.modifiedValue = true;
    } else this.modifiedValue = true;
    if (
      Array.isArray(newValue) &&
      Array.isArray(this.initialValue) &&
      newValue.length !== this.initialValue.length
    ) {
      this.modifiedValue = true;
    }
    this.validate();
    this.onSet?.(newValue);
  }

  setInitialValue(newValue: U) {
    this.initialValue = newValue;
  }

  setErrorMessage(msg: string) {
    this.errorMessage = msg;
  }

  validate() {
    const value = this.getCorrectValue();
    if (value instanceof Blob) {
      const { error } = this.schema.validate({
        size: value.size,
        type: value.type,
        name: value.name
      });
      if (!!error) {
        this.setErrorMessage(error.message);
        return false;
      }
      this.setErrorMessage("");
    } else {
      const { error } = this.schema.validate(value);
      if (!!error) {
        this.setErrorMessage(error.message);
        return false;
      }
      this.setErrorMessage("");
    }

    if (String(this.initialValue) !== String(value) && this.type === "email") {
      this.setWarning("Relogin is required after email update!");
      return false;
    }
    this.setWarning("");
    return true;
  }
}
