function DatafetchingMsg({ msg }) {
  return (
    <div
      className={`${
        msg === 'Data Fetching Failed' ? 'fetching-failed' : 'isLoading'
      } p-3 `}
    >
      {msg} <span className="isLoading-dots">...</span>
    </div>
  );
}

export default DatafetchingMsg;
