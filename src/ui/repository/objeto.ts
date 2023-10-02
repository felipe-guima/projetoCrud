// o que entra função
interface objetoRepositoryGetParams {
  page: number;
  limite: number;
}

// o que sai da função
interface objetoRepositoryGetOutput {
  objetos: Objeto[];
  total: number;
  pages: number;
}

function get({
  page,
  limite,
}: objetoRepositoryGetParams): Promise<objetoRepositoryGetOutput> {
  return fetch("http://localhost:3000/api/objetos").then(
    async (respostaServeidor) => {
      const objetoString = await respostaServeidor.text();
      const objetoObject = JSON.parse(objetoString).objetos;

      const ALL_OBJETOS = objetoObject;
      const startindex = (page - 1) * limite;
      const endIndex = page * limite;
      const paginetedObjetos = ALL_OBJETOS.slice(startindex, endIndex);
      const totalPages = Math.ceil(ALL_OBJETOS.length / limite);

      return {
        objetos: paginetedObjetos,
        total: ALL_OBJETOS.length,
        pages: totalPages,
      };
    }
  );
}

export const objetoRepository = {
  get,
};

// Model Schema - dado que a gente recebe na aplicação
interface Objeto {
  id: string;
  content: string;
  date: Date;
  done: boolean;
}
