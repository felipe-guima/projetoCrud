import { NextApiRequest, NextApiResponse } from "next";

// tipagem de API Back

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  //console.log(request.headers) // visa mostrar o cabecalho da api na aba network do navegador
  response.status(200).json({ message: "API - Olá mundo no back API " });
}
