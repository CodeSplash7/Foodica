import { ProfilePicture } from "@/utils/allSides/usersFunctions";
import Joi from "joi";

export default class InputField<
  T extends string | File | null,
  U = T | ProfilePicture
> {
  modifiedValue: boolean;
  initialValue: U;
  value: T;
  schema: Joi.AnySchema<T>;
  errorMessage: string;
  type: string;
  label: string;
  warningMessage?: string;
  constructor({
    initialValue = "" as U,
    schema,
    type,
    label
  }: {
    initialValue?: U;
    schema: Joi.AnySchema<T>;
    type: string;
    label: string;
  }) {
    this.modifiedValue = false;
    this.schema = schema;
    this.setValue = this.setValue.bind(this);
    this.setInitialValue = this.setInitialValue.bind(this);
    this.setErrorMessage = this.setErrorMessage.bind(this);
    this.setWarning = this.setWarning.bind(this);
    this.validate = this.validate.bind(this);
    this.type = type;
    this.label = label;
    this.errorMessage = "";
    this.initialValue = initialValue;
    this.value = "" as T;
  }

  setWarning(warnMsg: string) {
    if (this.initialValue) this.warningMessage = warnMsg;
  }

  setValue(newValue: T | null) {
    if (!newValue) {
      this.value = null as T;
      return;
    }
    this.value = newValue;
    if (String(this.value) === String(this.initialValue))
      this.modifiedValue = false;
    else this.modifiedValue = true;
    this.validate();
  }

  setInitialValue(newValue: U) {
    this.initialValue = newValue;
  }

  setErrorMessage(msg: string) {
    this.errorMessage = msg;
  }

  validate() {
    if (this.value instanceof Blob) {
      const { error } = this.schema.validate({
        size: this.value.size,
        type: this.value.type,
        name: this.value.name
      });
      if (!!error) {
        this.setErrorMessage(error.message);
        return false;
      }
      this.setErrorMessage("");
    } else {
      const { error } = this.schema.validate(this.value);
      if (!!error) {
        this.setErrorMessage(error.message);
        return false;
      }
      this.setErrorMessage("");
    }

    if (
      String(this.initialValue) !== String(this.value) &&
      this.type === "email"
    ) {
      this.setWarning("Relogin is required after email update!");
      return false;
    }
    this.setWarning("");
    return true;
  }
}
