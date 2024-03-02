import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Popconfirm, Row, Space, Table } from "antd";
import { RiArrowLeftCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function OrderHistoryPage() {
  const selectData = useSelector((state) => state.books.selectData);
  const BookData = Object.values(selectData);
  let LocalHistroy = JSON.parse(localStorage.getItem("LocalHistory"));

  const navigate = useNavigate();

  console.log(BookData);

  const columns = [
    {
      title: "S.NO",
      dataIndex: "Index",
      key: "Index",
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Total Count",
      dataIndex: "TotalCount",
      key: "TotalCount",
    },
    {
      title: "Total Amount",
      dataIndex: "TotalPrice",
      key: "TotalPrice",
    },
  ];

  return (
    <div className="order-container">
      <div className="view-headder">
        <RiArrowLeftCircleFill
          className="Icons"
          onClick={() => {
            navigate("/");
          }}
        />
        <h3 className="heading"> Order HistoryPage</h3>
      </div>

      {LocalHistroy != null ? (
        <div className="container">
          <Row gutter={[12, 24]}>
            {LocalHistroy?.map((item) => (
              <Col span={12}>
                <Card
                  title={`Date of purchased: ${item[0].date}`}
                  hoverable
                  style={{
                    height: "400px",
                    overflowY: "auto",
                    padding: "20px 10px",
                  }}
                >
                  <Table
                    dataSource={item.map((data, index) => {
                      if (index != 0) {
                        return {
                          ...data,
                          Index: index,
                        };
                      }
                    })}
                    columns={columns}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <h3 className="ml-10">No Histroy Found</h3>
      )}
    </div>
  );
}

export default OrderHistoryPage;
