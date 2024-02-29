import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookDummyImge from "../../assets/BookDummyImge.png";

import { Button, Card, Col, Row, Divider, Spin, Pagination, Input } from "antd";

import PageTitle from "../../Components/PageTitle/PageTitle";
import { getBookItem } from "../../Store/booksItem/bookActions";
import {
  Decrement,
  Increment,
  addItemsarray,
  changeParams,
} from "../../Store/booksItem/bookItemSlice";
import PaginationComponet from "../../Components/Pagination";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let list = useSelector((state) => state.books.list);
  const selectData = useSelector((state) => state.books.selectData);

  const loading = useSelector((state) => state.books.loading);
  const pageParams = useSelector((state) => state.books.pageParams);
  let count = list.length != 0 && list.length;
  const { Search } = Input;
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue == "") {
      const url = "https://freetestapi.com/api/v1/books";
      // const url = "https://api.itbook.store/1.0/new";
      dispatch(getBookItem({ url }));
    } else if (searchValue != "") {
      list = list.filter((item) => {
        if (item.title.toLowerCase().includes(searchValue)) {
          return item;
        }
      });
    }
  }, []);

  const onSearch = (value) => {
    setSearchValue(value.toLowerCase());
  };

  function showTotal(total) {
    return "Total " + total + " items";
  }

  function onPageChange(page, page_size) {
    dispatch(
      changeParams({
        page: page,
        page_size: page_size,
      })
    );
  }

  return (
    <>
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Books Store</h1>
        <div>
          <Search
            placeholder="Enter a value"
            onSearch={onSearch}
            enterButton
          />
        </div>
      </div>

      <Spin tip="Loading..." spinning={loading} delay={500}>
        <Row gutter={[24, 24]} style={{ padding: "20px" }}>
          {list
            ?.slice(
              (pageParams.page - 1) * pageParams.page_size,
              pageParams.page * pageParams.page_size
            )
            ?.map((item) => (
              <Col span={24} sm={8} lg={4} key={item.id}>
                <Card hoverable>
                  <img
                    src={BookDummyImge}
                    style={{ objectFit: "cover", height: "25%", width: "100%" }}
                  />
                  <Divider />
                  <div style={{ textAlign: "center" }}>
                    <p>Name: {item.title}</p>
                    <p>Price: ${item.id * 10}</p>

                    {selectData[item.id]?.count != undefined &&
                    selectData[item.id]?.count != 0 ? (
                      <div style={{ marginTop: "10px" }}>
                        <Button
                          type="primary"
                          ghost
                          onClick={() => dispatch(Increment(item.id))}
                        >
                          +
                        </Button>{" "}
                        <span>{selectData[item.id]?.count}</span>{" "}
                        <Button
                          danger
                          onClick={() => dispatch(Decrement(item.id))}
                        >
                          -
                        </Button>
                      </div>
                    ) : (
                      <Button
                        type="primary"
                        onClick={() =>
                          dispatch(
                            addItemsarray({
                              id: item.id,
                              title: item.title,
                              price: item.id * 10,
                            })
                          )
                        }
                      >
                        Add Cart
                      </Button>
                    )}
                  </div>
                  <div
                    style={{ textAlign: "center", marginTop: "20px" }}
                    onClick={() => {
                      navigate(`/viewmorePage/${item.id}`);
                    }}
                  >
                    <Button type="primary">View More</Button>
                  </div>
                </Card>
              </Col>
            ))}

          <Col span={24}>
            <PaginationComponet
              page={pageParams.page}
              Count={list.length}
              pageSize={pageParams.page_size}
              showTotal={showTotal}
              onPageChange={onPageChange}
            />
          </Col>
        </Row>
      </Spin>
    </>
  );
}

export default HomePage;
