import { Space, Table, Typography, ConfigProvider, Avatar, Rate } from 'antd'
import React, { useEffect, useState } from 'react'
import { getInventory } from '../APISERVICE/Service'

const Inventory = () => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    setLoading(true)

    getInventory().then((res) => {
      if(res && res.products){
        setDataSource(res.products)
        setLoading(false)
      }
    }).catch(error => {
      console.log(error);
    })
  }, [])

  const columns = [
    {
      title : "Thumbnail",
      dataIndex: "thumbnail" ,
      key: "thumbnail",
      render : (link) => {
        return <Avatar src={link}/>
      }
    },
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
      title : "Rating",
      dataIndex: "rating" ,
      key: "rating",
      render : (rating) => {
        return <Rate value={rating} allowHalf disabled/>
      }
    },
    {
      title : "Stock",
      dataIndex: "stock" ,
      key: "stock"
    },
    {
      title : "Brand",
      dataIndex: "brand" ,
      key: "brand"
    },
    {
      title : "Category",
      dataIndex: "category" ,
      key: "title"
    },
  ]

  return (
    <Space size={22} direction='vertical'>
      <Typography.Title level={4}>Inventory</Typography.Title>
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

export default Inventory
