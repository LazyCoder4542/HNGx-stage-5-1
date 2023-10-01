import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, getDownloadURL, getBlob } from "firebase/storage";
import { storage } from "../../firebase";
import emailjs from "emailjs-com";
import EditI from "./../../assets/icons/edit.svg?react";
import CopyI from "./../../assets/icons/copy_square.svg?react";
import FaceI from "./../../assets/icons/facebook.svg?react";
import WhatI from "./../../assets/icons/whatsapp.svg?react";
import TeleI from "./../../assets/icons/telegram.svg?react";
import styles from "./File.module.sass";
function File() {
  const [loading, setLoading] = useState<boolean>(true);
  const { fileName } = useParams();
  const [email, setEmail] = useState("");
  const fileRef = ref(storage, `videos/${fileName}`);
  const [downloadUrl, setDownloadUrl] = useState<string | undefined>();
  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    if (email !== "") {
      getBlob(fileRef).then((blob) => {
        //We need to convert the file to base64 so we use the inbuilt javascript
        // FileReader class
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = async () => {
          const serviceId = "service_zuh0538";
          const templateId = "template_e8dri22";
          const userId = "3n84DC5ud1rZ3x4hk";

          const emailParams = {
            //to_name: "Recipient Name",
            from_name: "HelpMeOut",
            message: "Email message here",
            file: reader.result,
          };
          emailjs.send(serviceId, templateId, emailParams, userId).then(
            (result) => {
              console.log(result);
            },
            (error) => {
              console.log(error);
            }
          );
        };
      });
    }
  };
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
                      <span>Untitled_Video_20232509</span>
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
                      <input value={"https://www.helpmeout.com/Untitled_Video_20232509"} type="text" disabled />
                      <div>
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
