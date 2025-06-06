import React from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import Content from '../../components/Content/Content'
import './Home.css'
function Home() {
  return (
    <>
      <Header />
      <div className='main'>
        <Sidebar />
        <Content />
      </div>
    </>
  )
}

export default Home