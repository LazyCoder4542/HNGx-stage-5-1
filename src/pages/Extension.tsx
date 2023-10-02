import React from 'react'
import ReactDOM from 'react-dom/client'
import '../index.sass'
import '../App.sass'

import Toggle from "../components/ui/Toggle"
import Icon from "../assets/icons/icon.svg?react";
import SettingIcon from "../assets/icons/setting-2.svg?react";
import MonitorIcon from "../assets/icons/monitor.svg?react";
import TabIcon from "../assets/icons/copy.svg?react";
import VideoIcon from "../assets/icons/video.svg?react";
import MicrophoneIcon from "../assets/icons/microphone.svg?react";

import styles from "./Extension.module.sass"
// import RecordView from "../components/ui/Recorder";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className={styles.extension}>
      <header>
        <div className="logo">
          <span className="svg-wrapper">
            <Icon />
          </span>
          <span>HelpMeOut</span>
        </div>
        <div className={styles.icons}>
          <span className="svg-wrapper">
            <SettingIcon />
          </span>
        </div>
        <p> 
          This extension helps you record and share help videos with ease.
        </p>
      </header>
      <div className={styles.box}>
        <div>
          <div>
            <span className="svg-wrapper">
              <MonitorIcon />
            </span>
            <span>
              Full screen
            </span>
          </div>
          <div>
            <span className="svg-wrapper">
              <TabIcon />
            </span>
            <span>
              Current Tab
            </span>
          </div>
        </div>
        <div>
          <div>
            <span className="svg-wrapper">
              <VideoIcon />
            </span>
            <span>Camera</span>
            <Toggle className={styles.toggle} />
          </div>
          <div>
            <span className="svg-wrapper">
              <MicrophoneIcon />
            </span>
            <span>Audio</span>
            <Toggle className={styles.toggle} />
          </div>
          <button className="btn btn-primary"
          onClick={async () => {
            const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
            console.log(tab.url)
            if (tab.id) {
              try {
                const response = await chrome.tabs.sendMessage(tab.id, {message: "start_recording"});
                if (response) {
                  window.close()
                }
                console.log(response);
              } catch {
                chrome.tabs.reload();
              }
            }
          }}
          >Start Recording</button>
        </div>
      </div>
      {/* <RecordView /> */}
    </div>
  </React.StrictMode>,
)
