import { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import cookie from "js-cookie";
import User from "../../../controller/UserController";
import router from "next/router";
import Layout from "../../components/Layout";
import style from "../editprofile/Editprofile.module.css";

function CreateProfile() {
  const email = cookie.get("email")
  const [ profile, setProfile ] = useState({
    email: email,
    username: "",
    fullname: "",
    avatar: "",
    total_score: 0
  })

  const [ usernameValid, setusernameValid ] = useState({
    notValid: true,
    isTouched: false,
  })

  const [ fullnameValid, setfullnameValid ] = useState({
    notValid: true,
    isTouched: false,
  })

  const [ isLoading, setIsLoading ] = useState(false)

  const fileInput = useRef(null);

  const handleUserNameChange = (e) => {
    e.preventDefault();
    setProfile(profile => ({
      ...profile,
      username: e.target.value
    }));
  }

  const handleFullNameChange = (e) => {
    e.preventDefault();
    setProfile(profile => ({
      ...profile,
      fullname: e.target.value
    }));
  }

  const validateUserName = () => {
    if (profile.username === "") {
      setusernameValid(usernameValid => ({
        ...usernameValid,
        isTouched: true,
        notValid: true
      }))
    } else {
      setusernameValid(usernameValid => ({
        ...usernameValid,
        notValid: false
      }))
      User.checkUserName(profile.username)
    }
  }

  const validateFullName = () => {
    if (profile.fullname === "") {
      setfullnameValid(fullnameValid => ({
        ...fullnameValid,
        isTouched: true,
        notValid: true
      }))
    } else {
      setfullnameValid(fullnameValid => ({
        ...fullnameValid,
        notValid: false
      }))
    }
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
    if (usernameValid.notValid || fullnameValid.notValid) {
      alert("Check your data")
      return
    }

    setIsLoading(true)
    const user = {}
    if (profile.avatar) {
      const newAvatar = await changeAvatar()
      user.avatar = newAvatar
    } else {
      user.avatar = ""
    }
    user.username = profile.username
    user.email = profile.email
    user.fullname = profile.fullname
    user.total_score = 0
    
    User.createNewUser(user)

    cookie.set(
      "profile",
      JSON.stringify(user),
      { path: "/" }
    );

    setIsLoading(false)
    alert("Profile created")
    router.push("/home")
  }

  return (
    <div className="homeWrapper">
      <h2>Create Profile</h2>
      {isLoading ?
        <h4>Updating...</h4> : 
        <div className={style.editProfile}>
          <div className={style.profileForm}>
            <div className={style.editfieldContainer}>
              <label>Username</label>
              <input
                type="text"
                required
                name="username"
                value={profile.username}
                onChange={handleUserNameChange}
                onBlur={validateUserName}
              />
              {usernameValid.isTouched && usernameValid.notValid &&
                <p>Required</p>}
            </div>   
            <div className={style.editfieldContainer}>
              <label>Fullname</label>
              <input
                type="text"
                required
                name="fullname"
                value={profile.fullname}
                onChange={handleFullNameChange}
                onBlur={validateFullName}
              />
               {fullnameValid.isTouched && fullnameValid.notValid &&
                <p>Required</p>}
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
      <button className={style.finishEdit} onClick={finishEdit}>Create profile</button>
    </div>       
  );
}

CreateProfile.Layout = Layout;

export default CreateProfile;