import React, { useState } from "react";
import { Divider, Table, Button, Popconfirm } from "antd";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import producto from "../../productos.json";
import "./lista-resultados.css";

//agarremos productos.json y con el datasource retornamos los datos que necesitamos market: em supermercado, name en nombre, image en imagen y price en precio
const dataSource = producto
  .map((product) => {
    return product.quotations.map((item) => {
      return {
        key: item.item,
        supermercado: product.market,
        nombre: item.item,
        imagen: item.quotedProducts[0].image,
        precio: item.quotedProducts[0].price,
        cantidad: 1,
      };
    });
  })
  .flat();

export default function ListaResultados() {
  const [data, setData] = useState(dataSource); // Agrega un estado para los datos

  const handleSuma = (key) => {
    setData(
      data.map((item) =>
        item.key === key ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const handleResta = (key) => {
    setData(data.map(item => item.key === key && item.cantidad > 0 ? {...item, cantidad: item.cantidad - 1} : item));
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const columns = [
    {
      title: "Supermercado",
      dataIndex: "supermercado",
      key: "supermercado",
      className: "supermercado",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      className: "nombre",
    },
    {
      title: "Imagen",
      dataIndex: "imagen",
      key: "imagen",
      render: (imagen) => (
        <img src={imagen} alt="Producto" style={{ width: "50px" }} />
      ),
      className: "imagen",
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
      className: "precio",
    },
    {
      title: "Cantidad",
      key: "cantidad",
      render: (record) => (
        <div>
          <Button
            id="suma"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleSuma(record.key)}
          />
          <span style={{ margin: "0 10px" }}>{record.cantidad}</span>
          {record.cantidad > 1 ? (
            <Button
              id="resta"
              type="primary"
              icon={<MinusOutlined />}
              onClick={() => handleResta(record.key)}
            />
          ) : (
            <Popconfirm
            title="¿Estás seguro de que quieres eliminar este item?"
            onConfirm={() => handleDelete(record.key)}
            okText="Sí"
            cancelText="No"
          >
            <Button
              id="resta"
              type="primary"
              icon={<MinusOutlined />}
              onClick={() => handleResta(record.key)}
            />
          </Popconfirm>
          )}
        </div>
      ),
      className: "cantidad",
    },
    {
      title: "Eliminar",
      key: "eliminar",
      render: (text, record) => (
        <Popconfirm
          title="¿Estás seguro de que quieres eliminar este item?"
          onConfirm={() => handleDelete(record.key)}
          okText="Sí"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} type="primary" danger />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Divider orientation="left">Resultados</Divider>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}
