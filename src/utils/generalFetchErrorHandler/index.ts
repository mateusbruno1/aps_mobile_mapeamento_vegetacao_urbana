import fetchErrorV4 from './handlers/fetchErrorV4';
import statusCodeHandler from './handlers/statusCodeHandler';

type ErrorHandler = (error: any) => string | undefined;
const handlers: ErrorHandler[] = [
    fetchErrorV4,
    statusCodeHandler,
    () => 'Ops, aconteceu algum erro desconhecido'
];

function processError(error: any) {
    const errorMessage = handlers.map(handler => handler(error)).find(_result => _result);

    if (errorMessage) {
        error.originalMessage = error.message;
        error.message = errorMessage;
    }

    return error;
}

export default processError;
