import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Decrement,
  Increment,
  RemoveItem,
  clearData,
} from "../../Store/booksItem/bookItemSlice";
import { Button, Card, Popconfirm } from "antd";
import PageTitle from "../../Components/PageTitle/PageTitle";
import { CloseCircleOutlined } from "@ant-design/icons";
import cartBook from "../../assets/cartBook.png.webp";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectData = useSelector((state) => state.books.selectData);

  const BookData = Object.values(selectData);

  const confirm = (e) => {
    dispatch(clearData())
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

        <Card style={{height:"350px",overflowY:"auto",padding:"20px 10px"}}>
          {BookData.length != 0
            ? BookData?.map((item,) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                  key={item.id}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "20px",
                    }}
                  >
                    {item.id}
                    <img
                      alt="book Name"
                      src={cartBook}
                      style={{ height: "100px", width: "100px" }}
                    />

                    <span
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                  <div
                    style={{
                      marginRight: "20px",
                    }}
                  >
                    <Button
                      type="primary"
                      ghost
                      onClick={() => dispatch(Increment(item.id))}
                    >
                      +
                    </Button>
                    <span
                      style={{
                        marginRight: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      {item.count}
                    </span>
                    <Button danger onClick={() => dispatch(Decrement(item.id))}>
                      -
                    </Button>
                  </div>
                  <p
                    style={{
                      marginRight: "20px",
                    }}
                  >
                    Price {item.price * item.count}{" "}
                  </p>
                  <CloseCircleOutlined
                    onClick={() => dispatch(RemoveItem(item.id))}
                  />
                </div>
              ))
            : "No Item are In Cart"}
        </Card>

        {BookData.length != 0 && (
            <Popconfirm
            title="Place Order"
            description="Are you sure want to place the Order?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No">
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
