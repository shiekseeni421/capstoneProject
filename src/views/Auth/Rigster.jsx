import React from "react";
import { Button, Card, Checkbox, Col, Form, Input, Modal, Row } from "antd";
import { useNavigate } from "react-router-dom";

import "./index.scss";
import { RiAlertLine, RiCheckboxCircleLine } from "react-icons/ri";

function Rigster() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    let userData = [
      {
        username: values.username,
        password: values.password,
      },
    ];
    let ItemData = JSON.parse(localStorage.getItem("userData"));

    if (ItemData != null) {
      let FilterData = ItemData.filter((item) => {
        if (item.username == values.username) {
          return item;
        }
      });
      if (FilterData.length != 0) {
        Modal.error({
          icon: (
            <span className="Error-Icon">
              <RiAlertLine />
            </span>
          ),
          title: <h5 className="Error-Item">Error</h5>,
          content: (
            <div>
              <p>Sorry! User is Already Exits please Log in</p>
            </div>
          ),
        });
      } else {
        ItemData.push({
          username: values.username,
          password: values.password,
        });
        console.log(ItemData);
        localStorage.setItem("userData", JSON.stringify(ItemData));

        Modal.success({
          icon: (
            <span>
              <RiCheckboxCircleLine className="Succes-Icon" />
            </span>
          ),
          title: <h5 className="Error-Item">Sucess</h5>,
          content: (
            <div>
              <p>Sucessfully Rigester Please Sign In</p>
            </div>
          ),
        });
        navigate("/signin");
      }
    } else {
      localStorage.setItem("userData", JSON.stringify(userData));

      Modal.success({
        icon: (
          <span>
            <RiCheckboxCircleLine className="Succes-Icon" />
          </span>
        ),
        title: <h5 className="Error-Item">Sucess</h5>,
        content: (
          <div>
            <p>Sucessfully Rigester Please Sign In</p>
          </div>
        ),
      });
      navigate("/signin");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div class="login">
      <Card>
        <h1 style={{ textAlign: "center" }}>REGISTER</h1>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row>
            <Col span={24}>
              <label>Email</label>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input placeholder="Enter Your Email" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <label>Password</label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="Enter Your Password" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 20,
            }}
          >
            <Button type="primary" htmlType="submit" className="Sub">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <p style={{ textAlign: "center", fontWeight: "600" }}>
          Already have an account{" "}
          <a
            onClick={() => {
              navigate("/signin");
            }}
          >
            Click here
          </a>
        </p>
      </Card>
    </div>
  );
}

export default Rigster;
