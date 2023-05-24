import ProgressBar from "./ProgressBar";

const LoadingPage = () => {
  return (
    <div className="fixed z-40 w-full h-full bg-base-100 left-0">
      <ProgressBar />
    </div>
  );
};

export default LoadingPage;
