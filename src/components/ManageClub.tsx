import React from 'react'

import NavBar from './HomePage/NavBar';
import Footer from './HomePage/Footer';
import ManageClubBody from './ManageClubPage/ManageClubBody';


const ManageClub = () => {
  return (
    <div>
        <NavBar/>
        <ManageClubBody/>
        <Footer/>
    </div>
  )
}

export default ManageClub