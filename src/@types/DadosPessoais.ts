export type DadosPessoais = {
    id?: string;
    nome: string,
    telefone: string,
    cpf: string,
    endereco: {
        logradouro: string,
        numero: string,
        bairro: string,
        cidade: string,
        uf: string
    }
}