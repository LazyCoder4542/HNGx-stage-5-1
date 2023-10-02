import { IPopupContext, usePopup } from "./popupContext";

import CloseIcon from './../assets/icons/close-circle.svg?react'

import style from "./popup.module.css"
const Popup = () => {
  const { value, status, clearPopup } = usePopup() as IPopupContext;
  
  // useEffect(() => {
  //   if (value !== null) {
  //     const timer = setTimeout(() => {
  //       clearPopup();
  //     },3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [value, clearPopup]);

  return value ?
   <div className={style.popup + ' ' + style[status]}>
    <div className={style.content}>
      <span>{value}</span>
      <span
      className={style.close + " svg-wrapper"}
      onClick={() => {
        clearPopup()
      }}
      >
        <CloseIcon fill="white"/>
      </span>
    </div>
  </div> : null;
};

export default Popup;
