import styles from "./email_sent.module.sass"
import gif from "./../../assets/gif/kite_success.gif"
function EmailSent({email}: {email: string}) {
  return (
    <div className={styles.email_sent}>
      <img src={gif} alt="kite_success" />
      <p>
      Your video link has been sent to <span>{email}</span>
      </p>
      <div>
        <p>Would you need to view this video later? Save to your account now!</p>
        <div className="btn btn-primary">Save Video</div>
        <span>Don’t have an account? <a>Create account</a></span>
      </div>
    </div>
  );
}

export default EmailSent;