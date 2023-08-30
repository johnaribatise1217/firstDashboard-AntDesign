import React, { useEffect, useState } from 'react'
import { Badge, Drawer, Image, List, Space, Typography } from 'antd'
import {BellFilled, MailOutlined} from "@ant-design/icons"
import { getComments, getOrders } from '../APISERVICE/Service'

const Header = () => {
  const [comments, setComments] = useState([])
  const [orders , setOrders] = useState([])
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [notifications, setNotifications] = useState(false)

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments)
    }).catch(error => {
      console.log(error)
    })

    getOrders().then((res) => {
      setOrders(res.products)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <div className='header'>
      <Image width={120} style={{mixBlendMode : "darken"}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOW4v-XfCaYE2FrTw704cmBGdsLYTj6FfxPQ&usqp=CAU' alt='logo'/>
      <Typography.Title style={{fontFamily : "sans-serif"}}>
        John's DashBoard
      </Typography.Title>
      <Space>
        <Badge count={comments.length} dot>
            <MailOutlined style={{fontSize : 25, marginRight: 10, cursor: "pointer"}}
              onClick={() => {
                setCommentsOpen(true)
              }}
            />
        </Badge>
        <Badge count={orders.length}>
            <BellFilled style={{fontSize : 25, marginRight : 10, cursor : "pointer"}}
              onClick={() => {
                setNotifications(true)
              }}
            />
        </Badge>
      </Space>
      <Drawer title="Comments" open={commentsOpen} onClose={() => {
        setCommentsOpen(false)
      }} maskClosable>
        <List dataSource={comments} renderItem={(item) => {
          return <List.Item style={{fontSize : "0.9rem"}}>{item.body}</List.Item>
        }}></List>
      </Drawer>
      <Drawer title="Notifications" open={notifications} onClose={() => {
        setNotifications(false)
      }}>
        <List dataSource={orders} renderItem={(item) => {
          return <List.Item style={{fontSize : "0.9rem"}}>{item.title} has been ordered!</List.Item>
        }}></List>
      </Drawer>
    </div>
  )
}

export default Header
