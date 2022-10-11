export const validateValue = (value, validators) => {
  return !getErrorValidateMessage(value, validators);
};

export const validateRequired =
  (message = "This field is required") =>
  (value) => {
    return value ? "" : message;
  };

export const validateOnlyNumber = (message = "This field only contains numbers") => (value) => {
    return /^\d+$/.test(value) ? '' : message;
}

export const validateEmail =
  (message = "This field must be a valid email") =>
  (value) => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? message
      : "";
  };

export const validatePhone =
  (message = "Please enter phone number") =>
  (value) => {
    return value && !/^\d{3}[-\s]??\d{3}[-\s]??\d{4}$/i.test(value) ? message : '';
  };

export const getErrorValidateMessage = (value, validators) => {
  for (const validator of validators) {
    const message = validator(value);
    if (message) return message;
  }

  return "";
};

export const mapValueToErrorMessage = (values, validatorsObj) => {
    const result = {};
    for (const key in validatorsObj) {
        result[key] = getErrorValidateMessage(values[key], validatorsObj[key])
    }
    return result;
}

export const isHasErrorByErrorObj = (errorObj) => {
    for (const key in errorObj) {
        if (errorObj[key]) {
            return true;
        }
    }

    return false;
}