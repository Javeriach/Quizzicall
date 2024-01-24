function CreateSingleOption({
  option,
  optionSelectedHandler,
  selectedOption,
  character,
  id,
}) {
  return (
    <div>
      <div
        className={`singleOptionsDiv ${
          selectedOption.answer === option ? 'selectedOptionBG ' : ''
        }`}
      >
        <div className="btn-div">
          <button
            value={option}
            className={`option-btn ${
              option === selectedOption.answer ? 'selected' : ''
            }`}
            onClick={optionSelectedHandler}
            id={id}
          >
            {character}
          </button>
        </div>

        <p className="option m-0  p-0">{option}</p>
      </div>
    </div>
  );
}

export default CreateSingleOption;
