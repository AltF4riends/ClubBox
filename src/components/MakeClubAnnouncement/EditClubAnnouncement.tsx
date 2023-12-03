import React from 'react'

const EditClubAnnouncement = () => {

  const announcementTitle = {
    height: "10vh",
    width: "65vw",
  }  

  const announcementBody = {
    height: "55vh",
    width: "65vw",
  }  
  return (
    <div
    style={{
        display: "flex",
        height: "89vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
    }}>
        <form>
            <div
            style={{
                display: "flex",
                height: "75vh",
                width: "80vw",
                backgroundColor: "rgba(255,255,255,0.7)",
                borderRadius: "45px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <div className="form-group" style={announcementTitle}>
                    <label htmlFor="exampleFormControlTextarea1">Club Announcement Title</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Club Announement Title"/>
                </div>

                <div className="form-group" style={announcementBody}>
                    <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1"  rows="20" placeholder='Type in your Club Announcement'></textarea>
                </div>
            </div>
        </form>
    </div>
  )
}

export default EditClubAnnouncement