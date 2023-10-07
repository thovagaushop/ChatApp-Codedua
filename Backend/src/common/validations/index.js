import MessageConstant from "../constant/message.constant.js";
import { ValidationError } from "../exeptions/custom.exeption.js";

const isHaveValue = (value) => {
  if (!value) return false;
  return true;
};

export const validateMissingField = (data) => {
  const listAttribute = Object.keys(data);
  const messages = [];
  for (const attr of listAttribute) {
    if (!data[attr]) {
      const msg = MessageConstant.MISSING_FIELD + " at : " + attr;
      messages.push(msg);
    }
  }

  if (!messages.length) return true;
  else {
    throw new ValidationError(messages.join("\n"));
  }
};
