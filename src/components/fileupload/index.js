import React, { useState } from 'react';
// import axios from 'axios';
export default function FileUpload (props) {
    const [profileImg, setProfileImage] = useState([]);
    const onFileChange = (e) => {
        setProfileImage(e.target.files[0])
    }
    const onSubmit = (e) => {
        // e.preventDefault()
        // const formData = new FormData()
        // formData.append('profileImg', profileImg)
        // axios.post("http://localhost:4000/api/user-profile", formData, {
        // }).then(res => {
        //     console.log(res)
        // })
    }
  
    return (
        <div className="container">
            <div className="row">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="file" onChange={onFileChange} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Upload Poster</button>
                    </div>
                </form>
            </div>
        </div>
    )
}