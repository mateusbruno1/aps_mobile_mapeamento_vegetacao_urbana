import {AxiosError} from 'axios';
import {Pin} from '../enums/Pin';

export const isAuthorizationError = (error: any): boolean => {
  return error?.response?.status === 401;
};

export const isForbiddenError = (error: any): boolean => {
  return error?.response?.status === 403;
};

export const isNotFoundError = (status: number): boolean => {
  return status === 404;
};

export const isConflictError = (error: any): boolean => {
  return error?.response?.status === 409;
};

export const isUnprocessableEntity = (error: any): boolean => {
  return error?.response?.status === 422;
};

export const isWrongPinError = (error: AxiosError): boolean => {
  return error?.response?.data?.errorKey === Pin.WRONG_PIN;
};

export const isExceededPinError = (error: AxiosError): boolean => {
  return error?.response?.data?.errorKey === Pin.EXCEEDED_PIN_ATTEMPT_LIMIT;
};

export const isIncorrectDataError = (error: AxiosError): boolean => {
  return error?.response?.data?.errorKey === Pin.INCORRECT_DATA;
};
