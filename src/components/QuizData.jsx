import { useEffect, useState } from 'react';
import CreateMcq from './CreateMcq';
import DatafetchingMsg from './DatafetchingMsg';
import ResultGenerator from './ResultGenerator';

function QuizData({ username, setWelcomePageDisplay, setDataFetcing }) {
  let [totalcorrectMcqs, setTotalCorrectMcq] = useState(0);

  let TotalMcqHandler = (value) => {
    setTotalCorrectMcq(value);
  };
  let [apiData, setApiData] = useState([]);
  let [Loading, setLoading] = useState(false);
  let [msg, setMsg] = useState('isLoading');
  let [next, setNext] = useState(false);
  let [currntId, setCurrentId] = useState(0);
  let [dataFetchingFailed, setDataFetchingFailed] = useState(false);

  let nextBtnHandler = (event) => {
    if (currntId < 10) {
      setCurrentId((prs) => prs + 1);
    }
    if (currntId === 9) {
      setDataFetcing(true);
    }
  };

  let playAgainResetAll = () => {
    setCurrentId(0);
    setTotalCorrectMcq(0);
  };

  useEffect(() => {
    if (currntId === 0) {
      async function fetchData() {
        try {
          setLoading(true);
          const response = await fetch(
            `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple`
          );

          if (response.ok) {
            let data = await response.json();

            setApiData(data.results.length > 0 ? data.results : []);
            setMsg(data.results ? '' : 'Data fetching failed');
            setDataFetcing(false);
          }
        } catch (err) {
          {
            setDataFetchingFailed(true);
            setLoading(false);
            setMsg('Data Fetching Failed');
            throw new Error('Some thing want wrong during data fetching!!!');
          }
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }
  }, [currntId]);
  return (
    <div>
      {Loading ? (
        <DatafetchingMsg msg={'is Loading'} />
      ) : dataFetchingFailed ? (
        <DatafetchingMsg msg={msg} />
      ) : apiData.length > 0 ? (
        <div>
          {currntId < 10 && (
            <CreateMcq
              element={apiData[currntId]}
              questionNo={currntId + 1}
              id={currntId}
              nextBtnHandler={nextBtnHandler}
              totalMarksHandler={TotalMcqHandler}
              currntId={currntId}
              totalcorrectMcqs={totalcorrectMcqs}
            />
          )}

          {currntId === 10 && (
            <ResultGenerator
              totalcorrectMcqs={totalcorrectMcqs}
              username={username}
              playAgainResetAll={playAgainResetAll}
              setWelcomePageDisplay={setWelcomePageDisplay}
            />
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default QuizData;
