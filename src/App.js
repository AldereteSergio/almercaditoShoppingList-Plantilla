import React from "react";
import BarraDeBusqueda from "./componentes/barra de busqueda/search";
import ListaDeProductos from "./componentes/Lista resultados/lista-resultados";
//import filtrarJson from "./services/filtrar json/filtrarjson";

function App() {
  return (
    <>
    <div>
      <BarraDeBusqueda />
    </div>
    <div>
      <ListaDeProductos />
    </div>
    </>

  );
}

export default App;