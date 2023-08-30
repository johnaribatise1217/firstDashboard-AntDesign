import React, {useState, useEffect} from 'react'
import { Space, Table, Typography, ConfigProvider, Avatar} from 'antd'
import { getCustomers } from '../APISERVICE/Service'

const Customers = () => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    setLoading(true)

    getCustomers().then((res) => {
      if(res && res.users){
        setDataSource(res.users)
      }
      setLoading(false)
    }).catch(error => {
      console.log(error);
    })
  }, [])

  const columns = [
    {
      title : "Photo",
      dataIndex: "image" ,
      key: "image",
      render : (link) => {
        return <Avatar src={link}/>
      }
    },
    {
      title : "First Name",
      dataIndex: "firstName" ,
      key: "firstName"
    },
    {
      title : "Last Name",
      dataIndex: "lastName" ,
      key: "lastName",
    },
    {
      title : "Email",
      dataIndex: "email" ,
      key: "email"
    },
    {
      title : "Phone",
      dataIndex: "phone" ,
      key: "phone",
    },
    {
      title : "Address",
      dataIndex: "address" ,
      key: "address",
      render : (address) => {
        return <span>{address.address}, {address.city}</span>
      }
    }
  ]

  return (
    <Space size={22} direction='vertical'>
      <Typography.Title level={4}>Customers</Typography.Title>
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

export default Customers
