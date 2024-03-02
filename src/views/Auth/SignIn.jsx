import React from "react";
import { Button, Card, Checkbox, Col, Form, Input, Modal, Row } from "antd";
import { useNavigate } from "react-router-dom";

import "./index.scss";
import {
  RiAlertLine,
  RiCheckboxCircleLine,
  RiInformationLine,
} from "react-icons/ri";

function SignIn() {
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
        if (FilterData[0].password != values.password) {
          Modal.warning({
            icon: (
              <span className="Warning-Icon">
                <RiInformationLine />
              </span>
            ),
            title: <h5 className="Error-Item">Error</h5>,
            content: (
              <div>
                <p>Please Enter Valid Password !</p>
              </div>
            ),
          });
        } else {
          localStorage.setItem("token", JSON.stringify(true));
          navigate("/");
          window.location.reload();
        }
      } else {
        Modal.error({
          icon: (
            <span className="Error-Icon">
              <RiAlertLine />
            </span>
          ),
          title: <h5 className="Error-Item">Error</h5>,
          content: (
            <div>
              <p>Sorry! User is does Not Exits please Rigister</p>
            </div>
          ),
        });
      }
    } else {
      Modal.error({
        icon: (
          <span className="Error-Icon">
            <RiAlertLine />
          </span>
        ),
        title: <h5 className="Error-Item">Error</h5>,
        content: (
          <div>
            <p>Sorry! User is does Not Exits please Rigister</p>
          </div>
        ),
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div class="login">
      <Card>
        <h1 style={{ textAlign: "center" }}>SIGN IN</h1>
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
                <Input name="username" placeholder="Enter Your Email" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  name="password"
                  placeholder="Enter Your Password"
                />
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
          Don't have an account{" "}
          <a
            onClick={() => {
              navigate("/rgister");
            }}
          >
            Rigister
          </a>
        </p>
      </Card>
    </div>
  );
}

export default SignIn;
