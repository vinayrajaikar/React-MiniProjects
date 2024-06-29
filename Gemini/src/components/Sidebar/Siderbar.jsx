import React, { useState } from 'react';
import './Sidebar.css'; // Ensure this path is correct
import { assets } from '../../assets/assets';
import { useGeminiContext } from '../../context';

const Siderbar = () => {

    const [extended,setExtended]=useState(false);
    const { onSent,prevPrompts,setPrevPrompts,setRecentPrompt,setShowResult} = useGeminiContext();

    const loadPrompt =async(prompt)=>{
      // setRecentPrompt(prompt);
      await onSent(prompt);
    }

    const newchat=()=>{
      setShowResult(false);
    }


  return (
    <div className='sidebar'>
      <div className="top">
        <img onClick={()=>{setExtended(!extended)}} className='menu' src={assets.menu_icon} alt="" />
        <div onClick={()=>newchat()} className="new-chat">
            <img src={assets.plus_icon} alt="" />
            {extended?<p>New Chat</p>:null}
        </div>

        {extended
        ?<div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item,index)=>{
              //  <p>{item}</p>
              return(
              <div onClick={()=>loadPrompt(item)} className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>{item.slice(0,18)}...</p>
              </div>)
            })}

        </div>:null
        }
        
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="" />
            {extended?<p>Help</p>:null}
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            {extended?<p>Activity</p>:null}
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            {extended?<p>Settings</p>:null}
        </div>
      </div>
    </div>
  );
}

export default Siderbar;