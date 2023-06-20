import { useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "./login.scss";

import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import authStore from "../../context/auth";

const Login = () => {
  const [setUser] = authStore((state) => [state.setUser]);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/grid");
        setUser(user);
        // let token = await auth.currentUser.getIdToken(true);
        // console.log(token);
        // dispatch({ type: "LOGIN", payload: user });
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        setError(true);
        // ..
      });
  };

  return (
    <div className="loginContainer">
      <div className="title">KAJIPETA</div>
      <div className="formContainer">
        <div className="formBox">
          <form onSubmit={handleLogin}>
            <p>Enter your email and password</p>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPass(e.target.value)}
            />
            <button>Login</button>

            {error && <span>Wrong email or password!</span>}
          </form>
        </div>
      </div>
      <div className="map">
        <MapContainer
          zoomControl={false}
          zoom={4}
          center={[-2.5930493195979762, 72.5029695443392]}
          attributionControl={false}
        >
          <TileLayer url="https://api.mapbox.com/styles/v1/rosyidi/ckyjqu6j3k58t15pc67odh67v/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9zeWlkaSIsImEiOiJja3lqcXJ1aGowNmQ0MnZydW83OTZoNnlzIn0.p5ZLTV3RD7IYWhsmzLQ7tw" />
        </MapContainer>
      </div>
    </div>
  );
};

export default Login;
