import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Decrement,
  Increment,
  RemoveItem,
  clearData,
} from "../../Store/booksItem/bookItemSlice";
import { Button, Card, Popconfirm, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

import moment from "moment";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectData = useSelector((state) => state.books.selectData);
  const BookData = Object.values(selectData);

  const columns = [
    {
      title: "S.NO",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Total Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Total Price",
      key: "price",
      render: (row) => <p>{row.count * row.price}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (row) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            onClick={() => dispatch(Increment(row.id))}
          >
            +
          </Button>
          <span
            style={{
              marginRight: "10px",
              marginLeft: "10px",
            }}
          >
            {row.count}
          </span>
          <Button danger onClick={() => dispatch(Decrement(row.id))}>
            -
          </Button>

          <Popconfirm
            title="Place Order"
            description="Are you sure want to Delete the Order?"
            onConfirm={() => dispatch(RemoveItem(row.id))}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data = BookData?.map((row, index) => {
    return {
      ...row,
      index: index + 1,
    };
  });

  const confirm = (e) => {
    var TotalData = BookData?.map((row, index) => {
      return {
        Name: row.title,
        TotalCount: row.count,
        TotalPrice: row.count * row.price,
      };
    });

    let date = moment().format("llll");

    TotalData = [{ date: date }, ...TotalData];
    console.log(TotalData);

    let LocalHistroy = JSON.parse(localStorage.getItem("LocalHistory"));
    console.log(LocalHistroy, "local");

    if (LocalHistroy == null) {
      localStorage.setItem("LocalHistory", JSON.stringify([TotalData]));
    } else {
      let newData = [...LocalHistroy, TotalData];
      localStorage.setItem("LocalHistory", JSON.stringify(newData));
    }

    console.log(TotalData);

    dispatch(clearData());
    navigate("/sucessfully");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          alignItems: "center",
        }}
      >
        <h2>My Cart</h2>

        <Card
          style={{ height: "350px", overflowY: "auto", padding: "20px 10px" }}
        >
          <Table dataSource={data} columns={columns} pagination={false} />
        </Card>

        {BookData.length != 0 && (
          <Popconfirm
            title="Place Order"
            description="Are you sure want to place the Order?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" style={{ marginTop: "10px" }}>
              Buy Items
            </Button>
          </Popconfirm>
        )}
      </div>
    </div>
  );
}

export default CartPage;
