import React, { useState } from "react";
import { Drawer, Button, Row, Col } from "antd";
import RightComponent from "./RightComponent";
import CapstoneImge from "../../assets/CapstoneImge.png";
import "./index.scss";

function NavBar() {
  const [cuurent, setCurrent] = useState("mail");
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <nav className="menuBar">
      <img className="logo" src={CapstoneImge} alt="LogoImge" />

      <div className="menuCon">
        <div className="rightMenu">
          <RightComponent />
        </div>
        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={onClose}
          open={visible}
        >
          <RightComponent />
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBar;
