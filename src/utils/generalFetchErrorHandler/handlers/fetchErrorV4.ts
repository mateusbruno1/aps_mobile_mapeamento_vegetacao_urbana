import {names as fieldsName} from '../../../constants/FieldNames';

export function isV4Error(error: any) {
  const {response} = error;
  try {
    return 'errorKey' in response.data && 'message' in response.data;
  } catch (_) {
    return false;
  }
}

const messages: {[k: string]: string} = {
  FORBIDDEN: 'Ops, você não tem permissão.',
  PARSING_FAILURE: 'Ops, erro desconhecido em dados enviados.',
  USER_BLOCKED: 'Ops, usuário bloqueado.',
  TOKEN_RATE_LIMIT_ERROR: 'Ops, token inválido.',
  INVALID_TOKEN: 'Ops, token inválido.',
  LOGIN_DEPENDENCY_FAILURE: 'Ops, erro desconhecido no login.',
  STRATEGY_NOT_SUPPORTED: 'Ops, estrategia não suportada',
  UNAUTHORIZED: 'Ops, não autorizado.',
};

type InputError = {
  errorKey: string;
  errorParams: any;
  message: string;
};

type InputErrorHandler = (
  inputName: string,
  inputError: InputError,
  fieldName: string,
) => string;

function getFieldName(field: string) {
  const _name = fieldsName[field];

  if (_name) return _name;
  return field;
}

const inputErrorHandlers: {[k in string]: InputErrorHandler} = {
  INVALID_FORMAT: (inputName: string) =>
    `${inputName}: formato do campo inválido`,
  INVALID: (inputName: string, _: InputError) =>
    `Formato do ${inputName} está incorreto`,
  TOO_LONG: (inputName: string, inputError: InputError) =>
    `${inputName} não pode ter mais de ${inputError.errorParams.sizeLimit} caracteres`,
};

function handleValidationError(error: any) {
  const {data} = error.response.data;
  const errorInputs = Object.keys(data.input);

  if (errorInputs.length > 0) {
    const firstError: InputError = data.input[errorInputs[0]][0];
    const handler = inputErrorHandlers[firstError.errorKey];

    if (handler) {
      return handler(getFieldName(errorInputs[0]), firstError, errorInputs[0]);
    }
  }

  return 'Ops, algum campo está invalido';
}

function handler(error: any): string | undefined {
  if (!isV4Error(error)) return;

  const {errorKey, message} = error.response.data;

  if (errorKey in messages) {
    return messages[errorKey];
  }

  if (errorKey === 'VALIDATION_ERROR') {
    return handleValidationError(error);
  }

  return message;
}

export default handler;
