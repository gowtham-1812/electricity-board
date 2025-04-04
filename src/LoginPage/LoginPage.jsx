import React, { useState } from "react";
import "./LoginPage.css";
import Axios from "axios";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userAadhaar, setUserAadhaar] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [inspectorAadhaar, setInspectorAadhaar] = useState("");
  const [inspectorMobile, setInspectorMobile] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const [inspectorLoading, setInspectorLoading] = useState(false);
  const [userError, setUserError] = useState("");
  const [inspectorError, setInspectorError] = useState("");
  const [activeForm, setActiveForm] = useState("user"); // 'user' or 'inspector'
  const [notification, setNotification] = useState({message: "", type: ""});
  
  const showNotification = (message, type) => {
    setNotification({message, type});
    if (type == "success") toast.success(message);
    if (type == "error") toast.error(message);
  }

  const navigate = useNavigate();

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setUserLoading(true);
    setUserError("");

    if (!userAadhaar || userAadhaar.length !== 12) {
      setUserError("Please enter a valid 12-digit Aadhaar number");
      setUserLoading(false);
      return;
    }

    if (!userMobile || userMobile.length !== 10) {
      setUserError("Please enter a valid 10-digit mobile number");
      setUserLoading(false);
      return;
    }

    try {
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      // console.log("User login attempt with:", { userAadhaar, userMobile });
      // alert("User login successful!");

      axios.post("http://localhost:5001/esb/login/user", {
        aadhaar: userAadhaar,
        mobile: userMobile
      }).then((response) => {
        if (response.data.verified)
        {
          const token = response.data.token;
          localStorage.setItem("authToken", token);
          localStorage.setItem("userType", "user"); 
          showNotification("User login successful!", "success");
            navigate("/home");

        }
        else{
          setUserError("Login failed. Please check your credentials.");
          showNotification("Login failed. Please check your credentials.", "error");
        }
      }).catch((error) => {
        console.error(error);
      })

    } catch (err) {
      setUserError("Login failed. Please check your credentials.");
      showNotification("An error occurred during login.", "error");
    } finally {
      setUserLoading(false);
    }
  };

  const handleInspectorLogin = async (e) => {
    e.preventDefault();
    setInspectorLoading(true);
    setInspectorError("");

    if (!inspectorAadhaar || inspectorAadhaar.length !== 12) {
      setInspectorError("Please enter a valid 12-digit Aadhaar number");
      setInspectorLoading(false);
      return;
    }

    if (!inspectorMobile || inspectorMobile.length !== 10) {
      setInspectorError("Please enter a valid 10-digit mobile number");
      setInspectorLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/esb/login/inspector", {
        aadhaar: parseInt(inspectorAadhaar),
        mobile: inspectorMobile,
      });

      if (response.data.verified) {
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        localStorage.setItem("userType", "inspector"); // Set user type in localStorage
        showNotification("Inspector login successful!", "success");
        navigate("/home");
      } else {
        setInspectorError("Login failed. Please check your credentials.");
        showNotification("Login failed. Please check your credentials.", "error");
      }
    } catch (error) {
      console.error(error);
      setInspectorError("Login failed. Please check your credentials.");
      showNotification("An error occurred during login.", "error");
    } finally {
      setInspectorLoading(false);
    }
  
  };

  return (
    <div className="login-container">
      {/* <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      /> */}
      
      <div className="login-header">
        <h1>Authentication Portal</h1>
        <p>Please select your role and enter your credentials</p>
      </div>

      <div className="role-selector">
        <button
          className={`role-tab ${activeForm === "user" ? "active" : ""}`}
          onClick={() => setActiveForm("user")}
        >
          User Login
        </button>
        <div className="divider">OR</div>
        <button
          className={`role-tab ${activeForm === "inspector" ? "active" : ""}`}
          onClick={() => setActiveForm("inspector")}
        >
          Inspector Login
        </button>
      </div>

      <div className="forms-container">
        {/* User Login Form - shown only when activeForm is 'user' */}
        {activeForm === "user" && (
          <div className="login-form user-form">
            <h2>User Login</h2>
            <form onSubmit={handleUserLogin}>
              <div className="form-group">
                <label htmlFor="userAadhaar">Aadhaar Number</label>
                <input
                  type="text"
                  id="userAadhaar"
                  value={userAadhaar}
                  onChange={(e) =>
                    setUserAadhaar(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter 12-digit Aadhaar"
                  maxLength="12"
                  pattern="\d{12}"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="userMobile">Mobile Number</label>
                <input
                  type="text"
                  id="userMobile"
                  value={userMobile}
                  onChange={(e) =>
                    setUserMobile(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                  pattern="\d{10}"
                  required
                />
              </div>
              {userError && <div className="error-message">{userError}</div>}
              <button
                type="submit"
                className="login-button"
                disabled={userLoading}
              >
                {userLoading ? "Logging in..." : "Login as User"}
              </button>
            </form>
          </div>
        )}

        {/* Inspector Login Form - shown only when activeForm is 'inspector' */}
        {activeForm === "inspector" && (
          <div className="login-form inspector-form">
            <h2>Inspector Login</h2>
            <form onSubmit={handleInspectorLogin}>
              <div className="form-group">
                <label htmlFor="inspectorAadhaar">Aadhaar Number</label>
                <input
                  type="text"
                  id="inspectorAadhaar"
                  value={inspectorAadhaar}
                  onChange={(e) =>
                    setInspectorAadhaar(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter 12-digit Aadhaar"
                  maxLength="12"
                  pattern="\d{12}"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="inspectorMobile">Mobile Number</label>
                <input
                  type="text"
                  id="inspectorMobile"
                  value={inspectorMobile}
                  onChange={(e) =>
                    setInspectorMobile(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                  pattern="\d{10}"
                  required
                />
              </div>
              {inspectorError && (
                <div className="error-message">{inspectorError}</div>
              )}
              <button
                type="submit"
                className="login-button"
                disabled={inspectorLoading}
              >
                {inspectorLoading ? "Logging in..." : "Login as Inspector"}
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="login-footer">
        <p>Need help? Contact support at support@example.com</p>
      </div>
    </div>
  );
};

export default LoginPage;
