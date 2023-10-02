import styles from "./home.module.sass"
import { useOutletContext, Link } from "react-router-dom";
import { IUser } from "../../types/core";
function Home() {
  const user = useOutletContext() as IUser
  return (
    <div id="container" className={styles.home}>
      <header>
        <h2>Hello, {user.displayName}</h2>
        <p>Here are your recorded videos</p>
      </header>
      <section className={styles.files}>
        <header>
          <p>Saved Files</p>
        </header>
        <div className={styles.box}>
          {
            user.videos.map((video, id) => {
              return (
                <Link key={id} to={`/file/${video.url}`}>
                  <div>
                    <img src={video.snapShotUrl} alt="" />
                    <p>{video.name !== "" ? video.name : video.url}</p>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </section>
    </div>
  );
}

export default Home;