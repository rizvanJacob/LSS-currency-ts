const ProgressBar = () => {
  return (
    <div className="flex justify-center py-5">
      <div className="flex flex-col">
        <label className="text-center">Loading...</label>
        <progress className="progress progress-primary w-56" />
      </div>
    </div>
  );
};

export default ProgressBar;
