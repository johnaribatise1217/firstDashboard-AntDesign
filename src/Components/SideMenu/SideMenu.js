import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SideMenu = () => {
  const location = useLocation()
  const [selectedPage, setSelectedPage] = useState('/')

  useEffect(() => {
    const pathName = location.pathname
    setSelectedPage(pathName)
  }, [location.pathname])

  const navigate = useNavigate()
  return (
    <div className='sidebar'>
      <Menu 
        className='sideVertical'
        mode='vertical'
        onClick={(item) => {
          navigate(item.key)
        }}
        style={{marginTop : 10}}
        selectedKeys={[selectedPage]}
        items={[
        {
            label : "Dashboard",
            icon : <AppstoreOutlined/>,
            key : "/",
        },
        {
            label : "Inventory",
            key : "/inventory",
            icon : <ShopOutlined/>,
        },
        {
            label : "Orders",
            key : "/orders",
            icon : <ShoppingCartOutlined/>
        },
        {
            label : "Customers",
            key : "/customers",
            icon : <UserOutlined/>
        },
      ]}>

      </Menu>
    </div>
  )
}

export default SideMenu
