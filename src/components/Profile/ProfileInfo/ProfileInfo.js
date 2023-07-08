import React, { useState } from "react";
import Preloader from "../../commons/preloader/preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userphoto from './../../assets/images/userphoto.png'
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
  let [editMode, setEditMode] = useState(false);
  if (!props.profile) {
    return <Preloader/>
  }
  const onMainPhotoSelected = (e) => {
        if(e.target.files.length){
          props.savePhoto(e.target.files[0])
        }
      }
  const onSubmitForm = (values) => {
        props.saveProfile(values);
        setEditMode(false)
    }
  return (
    <div>
      <div className={s.image}>
        <img src="https://catherineasquithgallery.com/uploads/posts/2021-03/1614571243_68-p-gorod-na-belom-fone-90.png" />
      </div>
      <div className={s.discriptionBlock}>
        <img src={props.profile.photos.large || userphoto} />
        {props.isOwner && <input type="file" onChange={onMainPhotoSelected} />}
        {editMode ? <ProfileDataForm onSubmitForm={onSubmitForm} /> : <ProfileData goToEditMode={() => {setEditMode(true)}} isOwner={props.isOwner} profile={props.profile}/>}
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        </div>
    </div>
  );
};
const Contacts = ({contactTitle,contactValue}) => {
  return <div>
    <b className={s.contact}>{contactTitle}</b>: {contactValue}
  </div>
}
const ProfileData = ({profile, isOwner, goToEditMode}) => {
  return <div>
    {isOwner && <div><button onClick={goToEditMode} >Edit</button></div>}
  <div>
    <b>Full name</b>: {profile.fullName}
  </div>
  <div>
    <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
  </div>
  <div>
    <b>Professional skills</b>: {profile.lookingForAJobDescription}
  </div>
  <div>
    <b>About me</b>: {profile.aboutMe}
  </div>
  <div>
    <b>Contacts</b>: {Object.keys(profile.contacts).map(key =>{
      return <Contacts contactTitle={key} contactValue={profile.contacts[key]} />
    })}
  </div>
</div>
}

export default ProfileInfo;
