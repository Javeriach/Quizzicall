import { useEffect, useState } from 'react';
import CreateSingleOption from './CreateSingleOption';

function CreateMcq({
  element,
  questionNo,
  id,
  nextBtnHandler,
  totalMarksHandler,
  currntId,
}) {
  let optionsTempArray = [
    element.correct_answer,
    element.incorrect_answers[0],
    element.incorrect_answers[1],
    element.incorrect_answers[2],
  ];
  let [options, setOptions] = useState([]);
  let [selectedTrue, setSelectedTrue] = useState(false);
  let [selectedfalse, setSelectedfalse] = useState(false);
  let [secondAttempt, setSecondAttempt] = useState(false);
  let [totalcorrectMcqs, setTotalCorrectMcq] = useState(0);
  let [selectedOption, setSelectedOption] = useState({
    answer: '',
    id: null,
  });
  let [notSelected, setNotSelected] = useState(false);

  let optionSelectedHandler = (event) => {
    setSelectedOption((prs) => {
      if (prs.id === event.target.id) {
        setSecondAttempt(true);
        return prs;
      } else {
        if (event.target.value === optionsTempArray[0]) {
          setTotalCorrectMcq((pre) => pre + 1);
        }

        return { answer: event.target.value, id: event.target.id };
      }
    });
  };

  let checkAnswer = () => {
    if (selectedOption.answer === '') {
      setNotSelected(true);
    }
    if (selectedOption.answer === optionsTempArray[0]) {
      setSelectedTrue(true);
    } else if (
      selectedOption.answer !== optionsTempArray[0] &&
      selectedOption.answer !== ''
    )
      setSelectedfalse(true);
  };

  useEffect(() => {
    setOptions(() => {
      let randomNumber = Math.floor(Math.random() * 4) + 1;
      for (let i = 0; i < 4; i++) {
        if (i === randomNumber) {
          let temp = optionsTempArray[i];
          optionsTempArray[i] = optionsTempArray[0];
          optionsTempArray[0] = temp;
        }
      }
      return optionsTempArray;
    });
  }, [element]);

  let nextHandlerFunction = (event) => {
    if (selectedOption.answer === '') {
      setNotSelected(true);
    } else {
      nextBtnHandler(event);
      setSelectedOption({
        answer: '',
        id: null,
      });
    }
  };

  useEffect(() => {
    if (selectedTrue) {
      setTimeout(() => {
        setSelectedTrue(false);
      }, 3000);
    }

    if (selectedfalse) {
      setTimeout(() => {
        setSelectedfalse(false);
      }, 3000);
    }
    if (secondAttempt) {
      setTimeout(() => {
        setSecondAttempt(false);
      }, 3000);
    }

    if (notSelected) {
      setTimeout(() => {
        setNotSelected(false);
      }, 3000);
    }
  });

  useEffect(() => {
    if (currntId === 9) {
      totalMarksHandler(totalcorrectMcqs);
    }
  }, [currntId , totalcorrectMcqs]);

  return (
    <div className="mcq-div">
      <div className="mcq--innerDiv">
        <div className="totalmcqs">
          <h4>Total Mcqs : {totalcorrectMcqs} / 10</h4>
        </div>
        <h3 className="text-center">Question No: {questionNo}</h3>
        <p className="question">Statement: {element.question}</p>
        <div className="allMcqs-div">
          {options.map((mcq, index) => (
            <CreateSingleOption
              option={mcq}
              optionSelected
              optionSelectedHandler={optionSelectedHandler}
              character={
                index === 0 ? 'A' : index === 1 ? 'B' : index === 2 ? 'C' : 'D'
              }
              selectedOption={selectedOption}
              key={index}
              id={currntId}
            />
          ))}
        </div>

        <div>
          <div className="Result-div">
            {selectedTrue === true ? (
              <div className="CorrectAnswer-appearance border border-2">
                <span className="tickMark">✅</span>Correct Answer
              </div>
            ) : (
              ''
            )}

            {selectedfalse ? (
              <div className="Wrong-resultDiv">
                {' '}
                <div className="">
                  <p className="text-center wrong-Text">
                    {' '}
                    <span className="tickMark">❌</span>Wrong Answer
                  </p>
                  <p className="text-center">
                    Correct Answer <br /> 👉{optionsTempArray[0]}
                  </p>
                </div>
              </div>
            ) : (
              ''
            )}
            {secondAttempt ? (
              <div className="second-attempt">
                <p>Second Attemp Not allowed☠</p>{' '}
              </div>
            ) : (
              ''
            )}

            {notSelected ? (
              <div className="second-attempt">
                <p>Please Select any option☠</p>{' '}
              </div>
            ) : (
              ''
            )}
          </div>

          <div className="next-btnDiv ">
            <button className="checkBtn" onClick={checkAnswer}>
              Check Solution
            </button>
            <button className="nextBtn" onClick={nextHandlerFunction} id={id}>
              Next
            </button>
          </div>
        </div>
      </div>
      {currntId === 10 && (
        <ResultGenerator
          totalcorrectMcqs={totalcorrectMcqs}
          username={username}
        />
      )}
    </div>
  );
}

export default CreateMcq;
