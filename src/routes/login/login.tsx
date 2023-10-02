import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import formStyle from "../form.module.sass";
function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<{ mail: string[]; password: string[] }>({
    mail: [],
    password: [],
  });
  console.log(error);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setError({ mail: [], password: [] });
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (error.code === "auth/invalid-email") {
          setError((prev) => {
            return { ...prev, mail: prev.mail.concat(["Please input a valid email address"]) };
          });
          console.log("Please input a valid email address");
        } else if (error.code === "auth/missing-password") {
          setError((prev) => {
            return { ...prev, password: prev.password.concat(["Password is required!"]) };
          });
        } else if (
          error.code === "auth/user-not-found" ||
          "auth/invalid-login-credentials"
        ) {
          setError((prev) => {
            return { ...prev, mail: prev.mail.concat(["Email or password incorrect"]) };
          });
        };
      });
  };
  return (
    <>
      <main>
        <section className={formStyle.section}>
          <div>
            <h2>Login</h2>
            <form>
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {
                  error.mail.length > 0 ? 
                  <div>
                    {error.mail.map((type, idx) => {
                      return <span key={idx} className={formStyle.error_text}>{type}</span>
                    })}
                  </div> : null
                }

              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {
                  error.password.length > 0 ? 
                  <div>
                    {error.password.map((type, idx) => {
                      return <span key={idx} className={formStyle.error_text}>{type}</span>
                    })}
                  </div> : null
                }
              </div>

              <div>
                <button className="btn btn-primary rounded" onClick={onLogin}>
                  Login
                </button>
              </div>
            </form>

            <p className="text-sm text-white text-center">
              No account yet? <Link to="/sign-up">Sign up</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
