import { objetoRepository } from "@ui/repository/objeto";

interface objetoControllerParams {
  // parametro opcional por conta do ?
  page?: number;
}
//                            ou sera um objeto vazio ou atenderá a tipagem
async function get(params: objetoControllerParams = {}) {
  return objetoRepository.get({
    page: 1,
    limite: 4,
  });
}

export const objetoController = {
  get,
};
