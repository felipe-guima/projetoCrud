/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";
import { objetoController } from "@server/controller/objeto";

// o haldler é responsavel por apenas receber a requisição da pessoa
// responsavel por manipular as rotas
export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // verifica o tipo de metodo http
  //console.log(request.method)
  if (request.method === "GET") {
    objetoController.get(request, response);
    return;
  }
  // o método que não for get não é premitido.
  response.status(405).json({ message: "method not allowed" });
}
