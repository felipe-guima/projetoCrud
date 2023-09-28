
import fs from "fs";
import { v4 as uuid } from "uuid";
const DB_FILE_PATH = "./db";

console.log("***[CRUD]***");

type UUID = string;

// Conceito de esquema | modelo
interface InterfaceTarefa {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
}

// função que cria o objeto baseado no esquema
function create(content: UUID): InterfaceTarefa {
  const objetoTarefa: InterfaceTarefa = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false,
  };

  // o ts permite evideciar o tipo de dado objetoTarefa[] || Array<objetoTarefa>
  const objetos: Array<InterfaceTarefa> = [...read(), objetoTarefa];

  //salvar no sistema
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ objetos }, null, 2));
  return objetoTarefa;
}

function read(): Array<InterfaceTarefa> {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");

  if (!db.objetos) {
    return [];
  }
  return db.objetos;
}

function update(id: UUID,parteDoObjeto: Partial<InterfaceTarefa>):InterfaceTarefa {
  let updateObjeto;
  const objetos = read();
  objetos.forEach((objetoAtual) => {
    const isToUpdate = objetoAtual.id === id;
    if (isToUpdate) {
      updateObjeto = Object.assign(objetoAtual, parteDoObjeto);
    }
  });
  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        objetos,
      },
      null,
      2
    )
  );

  if (!updateObjeto) {
    throw new Error("Please, provide another ID");
  }

  return updateObjeto;
}

function updateContentById(id:UUID, content: string): InterfaceTarefa {
return update(id, {
  content,
  
})
}

function deleteById(id:UUID) {
  const objetos = read();

  const objetosWithoutOne = objetos.filter((objeto) => {
    if(id === objeto.id) {
      return false;
    }
    return true;
  })
 
 fs.writeFileSync(
  DB_FILE_PATH,
  JSON.stringify(
    {
      objetos: objetosWithoutOne
    },
    null,
    2
  )
);

}
// Limpa tudo do nosso arquivo mas não da memoria
function clearDB() {
  //metodo
  fs.writeFileSync(DB_FILE_PATH, "");
}


// SIMULATION !!
clearDB();
create("Primeiro ObjetoTarefa");

const secundoObject  = create("Segundo ObjetoTarefa");

// trocando um o conteudo do terceiro pelo segundo.
const terceiroObjetoTarefa = create("terceiro ObjetoTarefa");

deleteById(secundoObject.id);

updateContentById(terceiroObjetoTarefa.id, "MODIFICA O TERCEIRO !!" );

const leitura = read()
console.log(leitura);

console.log(leitura.length);


// criar o desing de algo  que a gente vai fazer 
// depois fazer a função

// pasando um objeto como parametro
// update(quartoObjetoTarefa.id, {
//   content: "Quarto conteudo!! Novo Conteudo atualizado !!",
//   done: true,
//   date: new Date().toISOString(),
// });