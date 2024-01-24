import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import WelcomePage from './components/WelcomePage';
import QuizData from './components/QuizData';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  let [WelcomePageDisplay, setWelcomePageDisplay] = useState(true);
  let [Username, setUserName] = useState('');
  let [dataFetching, setDataFetcing] = useState(true);

  return (
    <div
      className={` ${
        !WelcomePageDisplay && dataFetching === false ? 'bodyDiv2' : 'bodyDiv'
      }`}
    >
      <div className={`d-flex justify-content-center main-div w-100 `}>
        {WelcomePageDisplay && (
          <WelcomePage
            setWelcomePageDisplay={setWelcomePageDisplay}
            setUserName={setUserName}
            username={Username}
          />
        )}
        {!WelcomePageDisplay && (
          <QuizData
            username={Username}
            setWelcomePageDisplay={setWelcomePageDisplay}
            setDataFetcing={setDataFetcing}
          />
        )}
      </div>
    </div>
  );
}

export default App;
