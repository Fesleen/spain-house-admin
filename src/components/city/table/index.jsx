import * as React from "react";
import { useSelector } from "react-redux";
import "./style.module.css";
import TableCommon from "../../common/table";

export default function TableAdd({ onClickDelete, onClickPut }) {
  const productGetState = useSelector((state) => state.product);
  const rows = productGetState.productGet?.data;

  const data = [];
  rows.map((elem) => {
    data.push({
      key: elem.id,
      Имя: (
        <div>
            <img src={elem.images} width={50} height={50} alt="" />
        </div>
      ),
      Типпродукта : (
          <div>
            <span>{elem.name}</span>
          </div>
      ),
      Назначение : (
        <div>
          <span>{elem.title}</span>
        </div>
    ),
      Действие: (
        <div className="btn-wrap">
          <button onClick={onClickPut} id={elem.id}>
            <i id={elem.id} class="bx bx-message-square-edit"></i>
          </button>
          <button onClick={onClickDelete} id={elem.id}>
            <i id={elem.id} class="bx bxs-trash"></i>
          </button>
        </div>
      ),
    });
  });

  const columns = [
    {
      title: "Имя",
      dataIndex: "Имя",
      key: "Имя",
      fixed: "left",
    },
    {
      title: "Тип продукта",
      dataIndex: "Типпродукта",
      key: "Типпродукта",
    },
    {
      title: "Назначение",
      dataIndex: "Назначение",
      key: "Назначение",
    },
    {
      title: "Действие",
      dataIndex: "Действие",
      key: "Действие",
      fixed: "right",
    },
  ];

  return (
    <>
      <TableCommon
        bordered
        columns={columns}
        data={data}
        pagination={false}
        scroll={{
          x: 1500,
          y: 400,
        }}
      />
    </>
  );
}
