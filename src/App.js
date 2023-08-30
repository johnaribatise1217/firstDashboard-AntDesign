import React from 'react'
import {Space} from "antd"
import './App.css'
import SideMenu from './Components/SideMenu/SideMenu';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import PageContent from './Components/PageContent/PageContent';


function App() {
  return (
    <div className="App">
      <Header/>
      <Space className='sideAndPage'>
        <SideMenu />
        <PageContent/>
      </Space>
      <Footer/>
    </div>
  );
}

export default App;
