import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useReactMediaRecorder } from "react-media-recorder";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { useStopwatch } from "react-timer-hook";
// import App from '../App'
import styles from "./context.module.sass";
import RecordView from "../components/ui/Recorder";
import "./../index.sass";
const root = document.createElement("div");
root.id = styles["hmo-root"];
document.body.append(root);
console.log("My extension");

const Controls = () => {
  const generateFileName = (type?: string) => {
    const dateO = new Date();
    const date = dateO.toLocaleDateString().split("/").reverse().join("");
    const time = dateO.toLocaleTimeString().split(" ")[0].split(":").join("");
    return `Untitled_${type ? type : "File"}_${date}_${time}`;
  };
  const onStopHandler = (blobUrl: string, blob: Blob) => {
    reset(new Date(), false)
    if (blob) {
      let fileName = generateFileName("Video");
      const blobRef = ref(storage, `videos/${fileName}`);
      uploadBytes(blobRef, blob).then(() => {
        console.log("Uploaded a blob");
        chrome.runtime.sendMessage({
          message: "recording_completed",
          fileName,
        });
      });
    }
    console.log(blobUrl, blob);
  };
  const onStartHandler = () => {
    start()
  }
  // const { status, startRecording, stopRecording, mediaBlobUrl , pauseRecording, error, resumeRecording, } =
  const {
    status,
    startRecording,
    stopRecording,
    clearBlobUrl,
    pauseRecording,
    resumeRecording,
    previewStream,
    isAudioMuted,
    muteAudio,
    unMuteAudio
  } = useReactMediaRecorder({
    screen: true,
    video: true,
    onStop: onStopHandler,
    onStart: onStartHandler
  });
  const [showCtrls, setShowCtrls] = useState<boolean>(false);
  const [showCam, setShowCam] = useState<boolean>(true);
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch();
  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      console.log(
        sender.tab
          ? "from a content script:" + sender.tab.url
          : "from the extension"
      );
      if (request.message === "start_recording") {
        sendResponse({ response: "okay" });
        setShowCtrls(true);
        startRecording();
        return true;
      }
    });
  });
  if (showCtrls) {
    return (
      <div>
        <RecordView
          recorder={{
            status,
            startRecording,
            stopRecording,
            clearBlobUrl,
            pauseRecording,
            resumeRecording,
            previewStream,
            isAudioMuted,
            muteAudio,
            unMuteAudio
          }}
          cam={[showCam, setShowCam]}
          timer={{hours,minutes,seconds, isRunning,pause, resume: start}}
        />
      </div>
    );
  }
  return null;
};
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Controls />
  </React.StrictMode>
);
export {}
