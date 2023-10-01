import { useRef, useEffect, useCallback, memo } from "react";
import { StatusMessages } from "react-media-recorder";
import styles from "./Recorder.module.sass";
import RecordI from "./../../assets/icons/recording.svg?react";
import PauseI from "./../../assets/icons/pause.svg?react";
import StopI from "./../../assets/icons/stop.svg?react";
import VideoI from "./../../assets/icons/video.svg?react";
import AudioI from "./../../assets/icons/microphone.svg?react";
import TrashI from "./../../assets/icons/trash.svg?react";
interface IProp {
  recorder: {
    status: StatusMessages;
    startRecording: () => void;
    stopRecording: () => void;
    clearBlobUrl: () => void;
    resumeRecording: () => void;
    pauseRecording: () => void;
    previewStream: MediaStream | null;
    isAudioMuted: boolean;
    muteAudio: () => void;
    unMuteAudio: () => void
  }
  cam: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  timer: {
    hours: number
    minutes: number
    seconds: number,
    resume: () => void
    pause: () => void
    isRunning: boolean
  }
}
const RecordView = ({ recorder, cam, timer }: IProp) => {
  const {
    status,
    startRecording,
    stopRecording,
    clearBlobUrl,
    resumeRecording,
    pauseRecording,
    isAudioMuted,
    muteAudio,
    unMuteAudio
  } = recorder;
  const [showCam, setShowCam] = cam
  const isRecording = useCallback(() => {
    if (["recording", "paused"].some((key) => status === key)) {
      return true;
    }
    return false;
  }, [status]);
  const VideoPreview = useCallback(memo(() => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          videoRef.current && (videoRef.current.srcObject = stream);
        });
    }, []);
    return <video ref={videoRef} width={200} height={200} autoPlay />;
  }), []);
  const toggleMuted = () => {
    if (isAudioMuted) unMuteAudio(); else muteAudio();
  }
  // const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
  //   const videoRef = useRef<HTMLVideoElement>(null);
  
  //   useEffect(() => {
  //     if (videoRef.current && stream) {
  //       videoRef.current.srcObject = stream;
  //     }
  //   }, [stream]);
  //   if (!stream) {
  //     return <img src={chrome.runtime.getURL(img)} alt="" /> ;
  //   }
  //   return <video ref={videoRef} width={500} height={500} autoPlay />;
  // };
  return (
    <div className={styles[status]} id={styles.record}>
      {
        showCam ?
        <div className={styles.images}>
          <VideoPreview />
        </div> : null
      }
      <div className={styles.wrapper}>
        {isRecording() ? (
          <>
            <div className={styles.time}>
              <p>
                {
                  [timer.hours, timer.minutes, timer.seconds].map(t => {
                    return t < 10 ? ("0" + t) : t
                  }).join(":")
                }
              </p>
              <span className="svg-wrapper">
                <RecordI />
              </span>
            </div>
            <div className={styles.divider}></div>
          </>
        ) : null}
        <div className={styles.actions}>
          {isRecording() ? (
            <div>
              <span
                className="svg-wrapper"
                onClick={() => {
                  if (status === "paused") {
                    timer.resume()
                    resumeRecording();
                  } else {
                    timer.pause()
                    pauseRecording()
                  }
                }}
              >
                <PauseI />
              </span>
              <span>{status === "paused" ? "Play" : "Pause"}</span>
            </div>
          ) : null}
          <div>
            <span
              className="svg-wrapper"
              onClick={() =>
                isRecording() ? stopRecording() : startRecording()
              }
            >
              <StopI fill={isRecording() ? "none" : "red"} />
            </span>
            <span>{isRecording() ? "Stop" : "Start"}</span>
          </div>
          <div
          onClick={() => {
            setShowCam(!showCam)
          }}
          >
            <span className={"svg-wrapper " + (!showCam ? styles.disabled : "")}>
              <VideoI />
            </span>
            <span>Camera</span>
          </div>
          <div
          onClick={toggleMuted}
          >
            <span className={"svg-wrapper " + (isAudioMuted ? styles.disabled : "")}>
              <AudioI />
            </span>
            <span>Mic</span>
          </div>
        </div>
        {isRecording() ? (
          <div className={styles.remove} onClick={clearBlobUrl}>
            <span className="svg-wrapper">
              <TrashI />
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RecordView;
