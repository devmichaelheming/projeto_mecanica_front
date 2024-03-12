export interface VehiclesProps {
  id?: string;
  clientId?: string;
  brand: string;
  model: string;
  yearManufacture: string;
  color: string;
  plate: string;
  chassisNumber: string;
  engineNumber: string;
}

export interface ClientsProps {
  id: string;
  tipoDocumento?: string;
  typePerson: string;
  cpf: string;
  cnpj: string;
  name: string;
  surname: string;
  razaoSocial: string;
  nomeFantasia: string;
  email: string;
  cellPhone: string;
  whatsapp: boolean;
  cep: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  vehicles: Array<VehiclesProps>;
}
