import React, { useState } from "react";
import { Button as Avatar, Badge, Space, Button, Input, Popconfirm } from "antd";
import { SendOutlined } from "@ant-design/icons";
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
    setLoading(false);
  };

  const manejarEliminacion = (item) => {
    setItems((prevItems) => {
        const newItems = { ...prevItems };
        newItems[item] -= 1;
        if (newItems[item] < 1) {
          delete newItems[item];
        }
        return newItems;
      });
  };

  return (
    <div className="container">
      <form className="search-bar">
        <Input
          type="text"
          value={entrada}
          onChange={manejarCambio}
          onKeyDown={(evento) => {
            if (evento.key === "Enter") {
              manejarEnvio(evento);
            }
          }}
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
          icon={<SendOutlined />}
          loading={loading}
          onClick={manejarEnvioLista}
        >
          Enviar Lista
        </Button>
      </form>
      <ul className="product-list">
        <Space size="large">
          {Object.entries(items).map(([item, count]) =>
            count > 1 ? (
              <Badge id="badge-count" key={item} count={count} showZero={false}>
                <Avatar
                  id="tag-item"
                  shape="square"
                  size="small"
                  onClick={() => manejarEliminacion(item)}
                >
                  {item}
                </Avatar>
              </Badge>
            ) : (
                <Popconfirm
                title="¿Estás seguro de que quieres eliminar este item?"
                onConfirm={() => manejarEliminacion(item)}
                okText="Sí"
                onKeyDown={(evento) => {
                    if (evento.key === "Enter") {
                        manejarEliminacion(item);
                      }}}
                cancelText="No"
              >
              <Avatar
                id="tag-item"
                shape="square"
                size="small"
              >
                {item}
              </Avatar>
            </Popconfirm>
            )
          )}
        </Space>
      </ul>
    </div>
  );
}

export default BarraDeBusqueda;
