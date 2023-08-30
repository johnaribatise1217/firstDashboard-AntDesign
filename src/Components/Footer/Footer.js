import { Typography } from 'antd'
import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>
      <Typography.Link style={{fontSize : "0.8rem"}} href='tel:+2347053303471'>+2347053303471</Typography.Link>
      <Typography.Link style={{fontSize : "0.8rem"}} href='https://www.google.com' target='_blank'>Privacy Policy</Typography.Link>
      <Typography.Link style={{fontSize : "0.8rem"}}>Terms of Use</Typography.Link>
    </div>
  )
}

export default Footer
