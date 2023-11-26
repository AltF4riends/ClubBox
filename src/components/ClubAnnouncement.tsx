import React from 'react'

import NavBar from './HomePage/NavBar';
import Footer from './HomePage/Footer';
import ManageClubBody from './ManageClubPage/ManageClubBody';
import EditClubAnnouncement from './MakeClubAnnouncement/EditClubAnnouncement';

const ClubAnnouncement = () => {
  return (
    <div>
        <NavBar/>
        <EditClubAnnouncement/>
        <Footer/>
    </div>
  )
}

export default ClubAnnouncement