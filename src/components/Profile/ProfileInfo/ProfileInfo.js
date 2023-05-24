import React from "react";
import Preloader from "../../commons/preloader/preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader/>
  }
  return (
    <div>
      <div className={s.image}>
        <img src="https://catherineasquithgallery.com/uploads/posts/2021-03/1614571243_68-p-gorod-na-belom-fone-90.png" />
      </div>
      <div className={s.discriptionBlock}>
        <img src={props.profile.photos.large} />
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        </div>
    </div>
  );
};
export default ProfileInfo;
