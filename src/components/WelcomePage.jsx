import React, { useEffect, useState } from 'react';
function WelcomePage({ setWelcomePageDisplay, setUserName, username }) {
  let [showError, setShowError] = useState(false);
  let userNameHandler = (event) => {
    setUserName(event.target.value);
  };

  let displayHandler = () => {
    if (username === '') {
      setShowError(true);
    } else {
      setWelcomePageDisplay((pre) => !pre);
    }
  };
  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  });
  return (
    <div className="initail--page d-flex justify-content-center">
      <div>
        <div>
          {showError ? (
            <div className="second-attempt mt-4">Enter Your name first!!!</div>
          ) : (
            ''
          )}
        </div>
        <p className="quizlet-heading m-0 p-0">Quizzical</p>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">@</span>
          </div>
          <input
            type="text"
            className="form-control inputName"
            placeholder="Username"
            onChange={userNameHandler}
            value={username}
          />
        </div>
        <p className="mt-0 text-center">Some Description if needed</p>
        <div className="d-flex justify-content-center">
          <button className="startQuix--btn d-block " onClick={displayHandler}>
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
