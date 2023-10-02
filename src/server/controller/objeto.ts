import { read } from "@db-crud-objetos";
import { NextApiRequest, NextApiResponse } from "next";

// responsavel por execur
function get(req: NextApiRequest, res: NextApiResponse) {
  const ALL_OBJECTS = read();

  // eslint-disable-next-line no-console
  res.status(200).json({
    objetos: ALL_OBJECTS,
  });
}

export const objetoController = {
  get,
};
