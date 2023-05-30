const PendingCollapseHeader = ({
  showUnapproved,
}: {
  showUnapproved: boolean;
}) => {
  return (
    <div className="collapse-title p-0 flex items-center h-min">
      <h1 className="text-lg font-bold text-left flex-1">Pending approval:</h1>
      <label className="swap swap-rotate h-min px-2">
        <input type="checkbox" checked={showUnapproved} readOnly />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="swap-on w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="swap-off w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </label>
    </div>
  );
};

export default PendingCollapseHeader;
