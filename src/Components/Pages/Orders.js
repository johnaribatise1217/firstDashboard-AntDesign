import React, { useEffect, useState } from 'react'
import { Space, Table, Typography, ConfigProvider, Avatar, Rate } from 'antd'
import { getOrders } from "../APISERVICE/Service"

const Orders = () => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    setLoading(true)

    getOrders().then((res) => {
      if(res && res.products){
        setDataSource(res.products)
      }
      setLoading(false)
    }).catch(error => {
      console.log(error);
    })
  }, [])

  const columns = [
    {
      title : "Title",
      dataIndex: "title" ,
      key: "title"
    },
    {
      title : "Price",
      dataIndex: "price" ,
      key: "price",
      render : (value) => {
        return <span>${value}</span>
      }
    },
    {
      title : "DiscountedPrice",
      dataIndex: "discountedPrice" ,
      key: "price",
      render : (value) => {
        return <span>${value}</span>
      }
    },
    {
      title : "Quantity",
      dataIndex: "quantity" ,
      key: "quantity",
    },
    {
      title : "Total",
      dataIndex: "total" ,
      key: "total"
    },
  ]

  return (
    <Space size={22} direction='vertical'>
      <Typography.Title level={4}>Orders</Typography.Title>
      <ConfigProvider
      theme={{
        components: {
          Table : {
            fontSize : "0.89rem",
          }
        }
      }}>
        <Table
        columns={columns}
        loading={loading}
        dataSource={dataSource}
        pagination = {{
          defaultPageSize : 5,
        }}>
          
        </Table>
      </ConfigProvider>
    </Space>
  )
}

export default Orders
