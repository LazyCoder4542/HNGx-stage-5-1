import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, getDownloadURL, getBlob } from "firebase/storage";
import { auth, storage } from "../../firebase";
import emailjs from "emailjs-com";
import EditI from "./../../assets/icons/edit.svg?react";
import CopyI from "./../../assets/icons/copy_square.svg?react";
import FaceI from "./../../assets/icons/facebook.svg?react";
import WhatI from "./../../assets/icons/whatsapp.svg?react";
import TeleI from "./../../assets/icons/telegram.svg?react";
import styles from "./File.module.sass";
import { IPopupContext, usePopup } from "../../components/popupContext";
import EmailSent from "../../components/modals/email_sent";
import VideoSnapshot from "video-snapshot";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, query, where, getDocs, limit } from "firebase/firestore";
import {db} from '../../firebase';
import { IUser } from "../../types/core";
function File() {
  const { triggerPopup } = usePopup() as IPopupContext
  const [loading, setLoading] = useState<boolean>(true);
  const { fileName } = useParams();
  const [email, setEmail] = useState("");
  const fileRef = ref(storage, `videos/${fileName}`);
  const [downloadUrl, setDownloadUrl] = useState<string | undefined>();
  const getSnapShot = async (blob: Blob) => {
    const snapshot = new VideoSnapshot(blob);
    const previewSrc = await snapshot.takeSnapshot();
    return previewSrc
  }
  const [trigger, setTrigger] = useState({})
  const [user, setUser] = useState<IUser | null>(null)
  const onSaveHandler = async () => {
    if (user && !user.videos.some(video => video.url === fileName)) {
      
      const VideoBlob = await getBlob(fileRef)
      const snapShotUrl = await getSnapShot(VideoBlob)
      const VideoCollection = collection(db, "users", user.dataSnapShot.id, "videos");
      addDoc(VideoCollection, {
        name: "",
        url: fileName,
        snapShotUrl
      }).then(() => setTrigger({...trigger}))
      .catch(err => {
        console.log(err);
        
      })
    }
    // const docRef = await addDoc(collection(db, "users"), {
    //   todo: todo,
    // });
  }
  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    if (email !== "") {
      // emailJS file attachment is paid 😭
      // getBlob(fileRef).then((blob) => {
      //   //We need to convert the file to base64 so we use the inbuilt javascript
      //   // FileReader class
      //   const reader = new FileReader();
      //   reader.readAsDataURL(blob);
      //   reader.onload = async () => {
      //     const serviceId = "service_zuh0538";
      //     const templateId = "template_e8dri22";
      //     const userId = "3n84DC5ud1rZ3x4hk";
      //     console.log(reader.result)
      //     const emailParams = {
      //       //to_name: "Recipient Name",
      //       from_name: "HelpMeOut",
      //       message: "Email message here",
      //       file: reader.result
      //     };
      //     emailjs.send(serviceId, templateId, emailParams, userId).then(
      //       (result) => {
      //         console.log(result);
      //       },
      //       (error) => {
      //         console.log(error);
      //       }
      //     );
      //   };
      // });
      const serviceId = "service_zuh0538";
      const templateId = "template_e8dri22";
      const userId = "3n84DC5ud1rZ3x4hk";
      const emailParams = {
        //to_name: "Recipient Name",
        from_name: "HelpMeOut",
        message: `Video link (${downloadUrl})`,
      };
      emailjs.send(serviceId, templateId, emailParams, userId).then(
        (result) => {
          console.log(result);
          if (result.text === "OK") {
            triggerPopup(<EmailSent email={email} />, "success")
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }

  };
  useEffect(() => {
    onAuthStateChanged(auth, async (userD) => {
      if (userD) {
        const q = query(collection(db, "users"), where("uid", "==", userD.uid), limit(1));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          const VideoCollection = collection(db, "users", doc.id, "videos");
          const q_v = query(VideoCollection);
          const qS_v = await getDocs(q_v);
          const videos = qS_v.docs.map(el => el.data()) 
          setUser({...userD, videos: videos as any, dataSnapShot: doc})
        });
      }
    })
  }, [trigger])
  useEffect(() => {
    getDownloadURL(fileRef)
      .then((url) => {
        setDownloadUrl(url);
        // This can be downloaded directly:
        // const xhr = new XMLHttpRequest();
        // xhr.responseType = 'blob';
        // xhr.onload = (event) => {
        //   const blob = xhr.response;
        // };
        // xhr.open('GET', url);
        // xhr.send();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(()=>setLoading(false));
  }, []);
  return (
    <div id="container" className={styles.file}>
      {
        !loading ?
        (
          downloadUrl ? (
            <div className={styles.box}>
              <div>
                <h1>Your video is ready!</h1>
                <div className={styles.content}>
                  <div>
                    <span>Name</span>
                    <div>
                      <span>{fileName}</span>
                      <span className="svg-wrapper">
                        <EditI />
                      </span>
                    </div>
                  </div>
                  <div>
                    <input
                      onChange={(e) => {
                        let value = e.target.value;
                        setEmail(value);
                      }}
                      value={email}
                      placeholder="enter the email of the receiver"
                      type="email"
                      name="email"
                      id="email"
                    />
                    <div onClick={handleSubmit}>Send</div>
                  </div>
                  <div>
                    <span>Video Url</span>
                    <div>
                      <input value={downloadUrl} type="text" disabled />
                      <div onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(downloadUrl);
                          alert('Content copied to clipboard');
                        } catch (err) {
                          console.error('Failed to copy: ', err);
                        }
                      }}>
                        <span className="svg-wrapper">
                          <CopyI />
                        </span>
                        <span>Copy</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span>Share your video</span>
                    <div>
                      <div>
                        <span className="svg-wrapper">
                          <FaceI />
                        </span>
                        <span>Facebook</span>
                      </div>
                      <div>
                        <span className="svg-wrapper">
                          <WhatI />
                        </span>
                        <span>Whatsapp</span>
                      </div>
                      <div>
                        <span className="svg-wrapper">
                          <TeleI />
                        </span>
                        <span>Telegram</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.video}>
                  <video src={downloadUrl} controls></video>
                </div>
                {
                  user ?  <div className="btn btn-primary" onClick={onSaveHandler}>{!user.videos.some(video => video.url === fileName) ? "Save" : "Saved"}</div> : null
                }
              </div>
            </div>
          ) : (
            "File not Found"
          )

        ) :
        <div className="loader">
          Loading...
        </div>
      }
    </div>
  );
}

export default File;
