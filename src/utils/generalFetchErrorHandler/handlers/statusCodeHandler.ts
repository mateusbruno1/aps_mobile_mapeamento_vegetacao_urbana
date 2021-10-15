const statusMessage = {
    401: 'Erro de autorização',
    403: 'Ops, Você não tem permissão',
    409: 'Os dados já existem',
    422: 'Ops, algum campo está inválido',
    500: 'Serviço está fora do ar',
    502: 'Serviço está fora do ar',
};


function handler(error: any): string | undefined {
    if (!error.response?.status) return;

    const { status } = error.response;

    return statusMessage[ status ];
}

export default handler;

