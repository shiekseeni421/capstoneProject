import React from 'react'
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';


function OrderSucessPage() {
    const navigate = useNavigate();
  return (
    <div><Result
    status="success"
    title="Successfully Purchased Books"
    extra={[
      <Button key="buy" type='primary' onClick={()=>navigate("/")}>Back To Home Page</Button>,
    ]}
  /></div>
  )
}

export default OrderSucessPage