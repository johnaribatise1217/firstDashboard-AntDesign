import { ShoppingCartOutlined, DollarCircleOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons'
import { Card, Space, Statistic, Typography, ConfigProvider, Table } from 'antd'
import { getCustomers, getInventory, getOrders } from '../APISERVICE/Service'
import { getRevenue } from '../APISERVICE/Service';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [orders, setOrders] = useState(0)
  const [Inventory, setInventory] = useState(0)
  const [customers, setCustomers] = useState(0)
  const [revenue, setRevenue] = useState(0)

  const CardData = [
  {
    title : "Orders",
    value : orders,
    icon : <ShoppingCartOutlined style={{color : "green", backgroundColor : "rgba(0,255, 0, 0.2)", fontSize : "1.5rem", 
    borderRadius : 12, padding : 8, cursor : "pointer"
    }}/>
  },
  {
    title : "Inventory",
    value : Inventory,
    icon : <ShopOutlined
      style={{color : "blue", backgroundColor : "rgba(0,0, 255, 0.2)", fontSize : "1.5rem", 
      borderRadius : 12, padding : 8, cursor : "pointer"
      }}
    />
  },
  {
    title : "Customers",
    value : customers,
    icon : <UserOutlined
      style={{color : "purple", backgroundColor : "rgba(0,255, 255, 0.2)", fontSize : "1.5rem", 
      borderRadius : 12, padding : 8, cursor : "pointer"
      }}
    />
  },
  {
    title : "Revenue",
    value : revenue,
    icon  : <DollarCircleOutlined
      style={{color : "red ", backgroundColor : "rgba(255,0, 0, 0.2)", fontSize : "1.5rem", 
      borderRadius : 12, padding : 8, cursor : "pointer"
      }}
    />
  },
]

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total)
      setRevenue(res.discountedTotal)
    })

    getInventory().then((res) => {
      setInventory(res.total) 
    })

    getCustomers().then((res) => {
      setCustomers(res.total)
    })
  }, [])

  return (
    <div className='dashboard'>
      <Space size={20} direction='vertical'>
        <Typography.Title level={4}>
        Dashboard Panel
        </Typography.Title>
        <Space direction='horizontal'>
          {CardData.map((card) => {
            return(
              <Dashboardcard icon ={card.icon} title={card.title} value={card.value}/>
            )
          })}
        </Space>
        <Space direction='horizontal'>
          <RecentOrders/>
          <DashBoardChart/>
        </Space>
      </Space>
    </div>
  )
}

const Dashboardcard = (props) => {
  const {title , value, icon} = props
  return(
    <Card>
      <Space direction='horizontal'>
        {icon}
        <ConfigProvider
          theme={{
            components : {
              Statistic : {
                titleFontSize : "1rem",
                fontFamily : "Tahoma",
                fontWeightStrong : "bold"
              }
            }
          }}
        >
          <Statistic key={title} style={{paddingLeft : 20}} title= {title} value={value}/>
        </ConfigProvider>
      </Space>
    </Card>
  )
}

const RecentOrders = () => {
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
        if (res && res.products) {
          setDataSource(res.products.splice(0, 4));
        }
      }).catch((error) => {
        console.error("Error fetching orders:", error);
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  const columns=[
    {
      title : "Title",
      dataIndex : "title",
      key : "title",
    },
    {
      title : "Quantity",
      dataIndex : "quantity",
      key : "quantity"
    },
    {
      title : "Price",
      dataIndex : "discountedPrice",
      key : "discountedPrice"
    }
  ]
  
  return (
    <>
      <Typography.Title>Recent Orders</Typography.Title>
      <ConfigProvider
        theme={{
          components : {
            Table : {
              colorTextHeading : "Red",
              fontSize : "0.8rem",
              fontWeightStrong : 20,
            }, 
          }
        }}>
        <Table
        columns={columns}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
        style={{marginBottom : "2rem"}}
        >
        </Table>
      </ConfigProvider>
    </>
  )
}

const DashBoardChart = () => {
  const [revData, setRevData] = useState({
    labels: [],
    datasets: []
  })

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`
      })

      const data = res.carts.map((cart) => {
        return cart.discountedTotal
      })

      const dataSource = {
        labels,
        datasets : [
          {
            label : "Revenue",
            data : data,
            backgroundColor : "rgba(255,0,0, 0.7)",
          }
        ]
      }
      setRevData(dataSource)
    })
  }, [])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Order Revenue',
      },
    },
  };

  return (
    <Card
    style={{
      width : 550,
      height : 350,
      marginLeft : 10,
    }}>
      <Bar style={{paddingTop : "1rem", fontSize : "2rem"}} options={options} data={revData}/>
    </Card>
  )
}

export default Dashboard
