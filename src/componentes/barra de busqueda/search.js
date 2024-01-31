import React, { useState } from "react";
import { Tag as Avatar, Badge, Space, Button, Input } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import "./search.css";

function BarraDeBusqueda() {
  const [entrada, setEntrada] = useState("");
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(false);

  const manejarCambio = (evento) => {
    setEntrada(evento.target.value);
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    if (entrada.trim() !== "") {
      const newItems = entrada.split(",").map((item) => item.trim());
      setItems((prevItems) => {
        const newCount = { ...prevItems };
        newItems.forEach((item) => {
          if (newCount[item]) {
            newCount[item]++;
          } else {
            newCount[item] = 1;
          }
        });
        return newCount;
      });
      setEntrada("");
    }
  };

  const manejarReinicio = () => {
    setItems({});
  };

  const manejarEnvioLista = () => {
    setLoading(true);
    // Aquí puedes manejar el envío de la lista
    setLoading(false);
  };

  return (
    <div className="container">
      <form className="search-bar">
        <Input 
          type="text"
          value={entrada}
          onChange={manejarCambio}
          placeholder="Agrega items separados por comas"
        />
        <Button type="primary" onClick={manejarEnvio}>
          Agregar
        </Button>
        <Button type="primary" danger onClick={manejarReinicio}>
          Reiniciar
        </Button>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loading}
          onClick={manejarEnvioLista}
        >
          Enviar Lista
        </Button>
      </form>
      <ul className="product-list">
        <Space size="large">
          {Object.entries(items).map(([item, count]) => (
            <Badge
              id="badge-count"
              key={item}
              count={count}
              showZero
              overflowCount={999}
            >
              <Avatar id="tag-item" shape="square" size="large">
                {item}
              </Avatar>
            </Badge>
          ))}
        </Space>
      </ul>
    </div>
  );
}

export default BarraDeBusqueda;
