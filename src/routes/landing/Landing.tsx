import BlueGridI from "../../assets/icons/grid_blue.svg?react"
import GreenGridI from "../../assets/icons/grid_green.svg?react"
import ArrRI from "./../../assets/icons/arrow-right.svg?react"
import RecordI from "./../../assets/icons/record_icon.svg?react"
import ShareI from "./../../assets/icons/share_icon.svg?react"
import RevisitI from "./../../assets/icons/revisit_icon.svg?react"
import styles from "./Landing.module.sass"
import thumbnail from "./../../assets/images/thumbnail.png"
import hero1 from "./../../assets/images/hero1.jpeg"
import hero2 from "./../../assets/images/hero2.jpeg"
import hero3 from "./../../assets/images/hero3.jpeg"
import feature from "./../../assets/images/feature.png"
function Landing() {
  return (
    <div id="container" className={styles.landing}>
      <section id={styles.intro}>
        <header>
          <h1>Show Them Don’t Just Tell</h1>
          <p>Help your friends and loved ones by creating and sending videos on how to get things done on a website.</p>
          <div className="btn btn-primary">
            <span>Install HelpOut</span>
            <span className="svg-wrapper">
              <ArrRI />
            </span>
          </div>
        </header>
        <div>
          <img src={hero1} alt="hero1" />
          <img src={hero2} alt="hero2" />
          <img src={hero3} alt="hero3" />
          <span className="svg-wrapper"><BlueGridI /></span>
          <span className="svg-wrapper"><GreenGridI /></span>
        </div>
      </section>
      <section id={styles.features}>
        <header>
          <h2>Features</h2>
          <p>Key Highlights of Our Extension</p>
        </header>
        <div>
          <div>
            <div>
              <span className="svg-wrapper">
                <RecordI />
              </span>
              <h3>Simple Screen Recording</h3>
              <p>Effortless screen recording for everyone. Record with ease, no tech expertise required.</p>
            </div>
            <div>
              <span className="svg-wrapper">
                <ShareI />
              </span>
              <h3>Easy-to-Share URL</h3>
              <p>Share your recordings instantly with a single link. No attachments, no downloads.</p>
            </div>
            <div>
              <span className="svg-wrapper">
                <RevisitI />
              </span>
              <h3>Revisit Recordings</h3>
              <p>Access and review your past content effortlessly. Your recordings, always at your fingertips.</p>
            </div>
          </div>
          <div>
            <img src={feature} alt="features" />
          </div>
        </div>
      </section>
      <section id={styles.how_it_works}>
        <header>
          <h2>How it works</h2>
        </header>
        <div>
          <div>
            <div>
              <h3>Record Screen</h3>
              <p>Click the "Start Recording" button in our extension.  choose which part of your screen to capture and who you want to send it to.</p>
            </div>
            <img src={thumbnail} alt="thumbnail" />
          </div>
          <div>
            <div>
              <h3>Share Your Recording</h3>
              <p>We generate a shareable link for your video. Simply send it to your audience via email or copy the link to send via any platform.</p>
            </div>
            <img src={thumbnail} alt="thumbnail" />
          </div>
          <div>
            <div>
              <h3>Learn Effortlessly</h3>
              <p>Recipients can access your video effortlessly through the provided link, with our user-friendly interface suitable for everyone.</p>
            </div>
            <img src={thumbnail} alt="thumbnail" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;