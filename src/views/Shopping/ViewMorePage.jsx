import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookItemById } from "../../Store/booksItem/bookActions";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Table } from "antd";
import "./index.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  RiAddCircleFill,
  RiErrorWarningLine,
  RiAlertLine,
  RiArrowLeftCircleFill,
} from "react-icons/ri";

function ViewMorePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listById = useSelector((state) => state.books.listById);

  useEffect(() => {
    const url = `https://freetestapi.com/api/v1/books/${id}`;
    dispatch(getBookItemById({ url }));
  }, []);

  const columns = [
    {
      title: "Author Name",
      dataIndex: "author",
      key: "author",
      width: 50,
      render: (text) => <h4>{text}</h4>,
    },
    {
      title: "Title",
      dataIndex: "title",
      width: 50,
      key: "title",
    },
    {
      title: "Publication Year",
      dataIndex: "publication_year",
      width: 50,
      key: "publication_year",
      render: (text) => <p>{text} Year</p>,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 100,
      key: "description",
    },
  ];

  const data = [listById];

  console.log(listById, "books item");

  return (
    <div className="ViewMorePage">
      <div>
        <div className="view-headder">
          <RiArrowLeftCircleFill
            className="Icons"
            onClick={() => {
              navigate(-1);
            }}
          />
          <h2>View More Page</h2>
        </div>

        <Row className="mt-30">
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              bordered
              scroll={{ x: 1300 }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ViewMorePage;
