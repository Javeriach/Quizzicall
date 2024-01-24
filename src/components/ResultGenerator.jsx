import popper from '../video/popper.gif';
function ResultGenerator({
  username,
  totalcorrectMcqs,
  playAgainResetAll,
  setWelcomePageDisplay,
}) {
  let playAgainHandler = () => {
    setWelcomePageDisplay(true);
    playAgainResetAll();
  };
  return (
    <div className="final-resultDiv d-flex flex-column justify-content-center align-items-center mt-5">
      <div>
        <img className="popper-gif" src={popper}></img>
      </div>
      <p>{username}!!</p>
      <p>Your got {totalcorrectMcqs} marks out of 10</p>
      <button className="play-again" onClick={playAgainHandler}>
        Play Again ?
      </button>
    </div>
  );
}

export default ResultGenerator;
