import React from "react";
import { Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { BsArrowLeftCircleFill } from "react-icons/bs";

import "../index.scss";

export default function PageTitle(props) {
  const history = useNavigate();
  const { pageTitle, goBack } = props;

  return (
    <Col span={24}>
      <div className="pageTitleEl">
        <div>
          {goBack && (
            <Link
              to="#"
              onClick={() => {
                history.goBack(-1);
              }}
            >
              <BsArrowLeftCircleFill className="Icon" />
            </Link>
          )}
        </div>
        {pageTitle && <p className="pageTitel">{pageTitle}</p>}
      </div>
    </Col>
  );
}
