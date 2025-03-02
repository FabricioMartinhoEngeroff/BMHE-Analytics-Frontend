export interface User {
  id: string;
  nome: string; 
  telefone: string;
  cpf: string;
  endereco: {
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}

export default User;
