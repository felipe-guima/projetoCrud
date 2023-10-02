import React from "react";
import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { objetoController } from "@ui/controller/objeto";

const bg = "https://mariosouto.com/cursos/crudcomqualidade/bg";

interface HomeObjeto {
  id: string;
  content: string;
}

function HomePage() {
  const [page, setPage] = React.useState(1);
  const [objetos, setObjetos] = React.useState<HomeObjeto[]>([]);

  //Load info onload
  React.useEffect(() => {
    objetoController.get({ page }).then(({ objetos }) => {
      setObjetos(objetos);
    });
  }, []);

  return (
    <main>
      <GlobalStyles themeName="devsoutinho" />
      <header
        style={{
          backgroundImage: `url('${bg}')`,
        }}
      >
        <div className="typewriter">
          <h1>O que fazer hoje?</h1>
        </div>
        <form>
          <input type="text" placeholder="Correr, Estudar..." />
          <button type="submit" aria-label="Adicionar novo item">
            +
          </button>
        </form>
      </header>

      <section>
        <form>
          <input type="text" placeholder="Filtrar lista atual, ex: Dentista" />
        </form>

        <table border={1}>
          <thead>
            <tr>
              <th align="left">
                <input type="checkbox" disabled />
              </th>
              <th align="left">Id</th>
              <th align="left">Conteúdo</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {objetos.map((curentObject) => {
              return (
                <tr key={curentObject.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{curentObject.id.substring(0, 4)}</td>
                  <td>{curentObject.content}</td>
                  <td align="right">
                    <button data-type="delete">Apagar</button>
                  </td>
                </tr>
              );
            })}

            {/* <tr>
                            <td
                                colSpan={4}
                                align="center"
                                style={{ textAlign: "center" }}
                            >
                                Carregando...
                            </td>
                        </tr> */}

            {/* <tr>
                            <td colSpan={4} align="center">
                                Nenhum item encontrado
                            </td>
                        </tr> */}

            <tr>
              <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                <button
                  data-type="load-more"
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  Pagina {page} Carregar mais{" "}
                  <span
                    style={{
                      display: "inline-block",
                      marginLeft: "4px",
                      fontSize: "1.2em",
                    }}
                  >
                    ↓
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default HomePage;
