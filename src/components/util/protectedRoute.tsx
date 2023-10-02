import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
  import { auth } from '../../firebase';
import { Outlet } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { IUser } from '../../types/core';
import {db} from '../../firebase';
interface IProp {
  redirectPath?: string,
}

function ProtectedRoute(props: IProp) {
  // if (auth.currentUser) {
  //   updateProfile(auth.currentUser, {
  //     displayName: "LazyCoder", photoURL: null
  //   })
  // }
  const [user, setUser] = useState<IUser | null>(null)
  const [isRetrieved, setIsRetrieved] = useState<boolean>(false)
  console.log(isRetrieved);
  
  useEffect(()=> {
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
          setIsRetrieved(true)
        });
      }
      else setIsRetrieved(true)
    });
  }, [])
  return isRetrieved ? ( user ? <Outlet context={user} /> : <Navigate to={props.redirectPath ? props.redirectPath : "/login"} replace />) : null; 
}

export default ProtectedRoute;