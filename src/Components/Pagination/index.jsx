import React from "react";
import { Row, Pagination } from "antd";

function PaginationComponet({
  pageSize,
  page,
  Count,
  showTotal,
  onPageChange,
}) {
  console.log(Count, "count");
  return (
    <Row justify="end">
      <Pagination
        current={page}
        page_size={pageSize}
        total={Count}
        showTotal={showTotal}
        showSizeChanger
        onChange={onPageChange}
      />
    </Row>
  );
}

export default PaginationComponet;
