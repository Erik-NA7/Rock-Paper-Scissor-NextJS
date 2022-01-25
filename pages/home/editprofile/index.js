import { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import cookie from "js-cookie";
import User from "../../../controller/UserController";
import router from "next/router";
import useSWR from "swr";
import HomeLayout from "../HomeLayout";
import style from "./Editprofile.module.css";

const getData = async (url) => cookie.get(url);

function EditProfile() {
  const { data } = useSWR("profile", getData);
  let user = data ? JSON.parse(data) : "";
  
  const [ profile, setProfile ] = useState(user)
  const [ isLoading, setIsLoading ] = useState(false)
  const fileInput = useRef(null);

  const handleNameChange = (e) => {
    setProfile(profile => ({
      ...profile,
      fullname: e.target.value
    }));
  }

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onabort = () => alert('file reading was aborted')
      reader.onerror = () => alert('file reading has failed')
      reader.onload = () => {
        setProfile(profile => ({
          ...profile,
          avatar: URL.createObjectURL(file),
          avatarFile: file
        }));
      }
      reader.readAsArrayBuffer(file) 
    }) 
  }, []);

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
    accepts: "image/*",
    multiple: false,
  });

  const avatarChangeFromFile = () => {
    setProfile(profile => ({
      ...profile,
      avatar: URL.createObjectURL(fileInput.current.files[0]),
      avatarFile: fileInput.current.files[0]
    }));
  }

  const changeAvatar =  async () => {
    const url = "https://api.cloudinary.com/v1_1/erikna7/upload";
    const formData = new FormData();
    formData.append('file', profile.avatarFile);
    formData.append('upload_preset', 'kzapto6c');
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.url
  };
  
  const finishEdit = async () => {
    setIsLoading(true)
    if (user.fullname !=  profile.fullname) {
      user.fullname = await profile.fullname
      User.updateFullName(user.username, user.fullname);
    }

    if (user.avatar != profile.avatar) {
      user.avatar = await changeAvatar()
      User.updateAvatar(user.username, user.avatar)
    }

    cookie.set(
      "profile",
      JSON.stringify(user),
      { path: "/" }
    );

    setIsLoading(false)
    alert("Profile updated")
    router.push("/home")
  }

  return (
    <div className="homeWrapper">
      <h2>Edit Profile</h2>
      {isLoading ?
        <h4>Updating...</h4> : 
        <div className={style.editProfile}>
          <div className={style.profileForm}>
          <label>Username (Can&apos;t change)</label>
          <div className={style.editfieldContainer}>
            <input
              type="text"
              required
              name="username"
              disabled
              value={profile.username}
            /> 
          </div>   
          
          <label>Fullname</label>
          <div className={style.editfieldContainer}>
            <input
              type="text"
              required
              name="fullname"
              value={profile.fullname}
              onChange={handleNameChange}
            />
          </div>

          {/* Change email function is a work on progress */}
          {/* <label className={style.label}>Email</label>
          <div className={style.editfieldContainer}>
            <input
              className={style.input}
              type="text"
              required
              name="fullname"
              value={profile.email}
              onChange={handleChange}
            />
            <button className={style.update} onClick={updateFullName}>Save</button>
          </div> */}
          <div className={style.editfieldContainer}>
            <Link href="/resetpassword" passHref>
              <button>Change Password</button>
            </Link>
          </div>
        </div>

        <div className={style.dropContainer}>
          <div className={style["avatar-handler"]}>
            <label htmlFor="file" className={style["select-img-btn"]}>Choose file</label>
            <p>or drag your picture here:</p>
            <input
              id="file"
              className={style["file-input"]}
              type="file"
              onChange={avatarChangeFromFile}
              accept="image/*"
              ref={fileInput}
            />
          </div>
          <div {...getRootProps()} className={`${style.dropzone} ${isDragActive ? style.active : null}`}>
            { profile.avatar ? (
            <img src={profile.avatar} width={"100%"} height={"100%"} alt="avatar"/>
            ) : (
              <p>No avatar</p>
            )}  
          </div>
          
          </div>
        </div>
      }
      <button className={style.finishEdit} onClick={finishEdit}>Update profile</button>
      <br/>
    </div>       
  );
}

EditProfile.Layout = HomeLayout;

export default EditProfile;
