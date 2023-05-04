import { CurrencyStatus, Trainee } from "../../../../@types/trainee";
import { Link } from "react-router-dom";
import { useState } from "react";
import Edit from "../../../../assets/icons/editIcon.svg";
import RedCross from "../../../../assets/icons/redCross.svg";
import DialogModal from "../../../../components/DialogModal";

type Prop = {
  trainee: Trainee;
  category: string;
  overallStatus: CurrencyStatus;
  deleteTrainee: any;
};

const TraineeTableRow = ({
  trainee,
  category,
  overallStatus,
  deleteTrainee,
}: Prop): JSX.Element => {
  const [showModal, setShowModal] = useState(false);

  return (
    <tr>
      <td>
        <Link
          className="btn btn-primary btn-sm btn-block text-sm"
          to={trainee.id.toString()}
        >
          <span className={overallStatus.className + " badge-xs mx-2"}></span>
          <span className="flex-1 text-left">{trainee.callsign}</span>
        </Link>
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950 hidden md:table-cell">
        {category}
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium hidden sm:table-cell text-slate-950">
        {overallStatus.message}
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium text-slate-950 hidden md:table-cell">
        {trainee.users.approved ? "Active" : "Inactive"}
      </td>
      <td className="text-center flex items-center justify-evenly">
        <Link to={`${trainee.id}/edit`}>
          <button className="btn btn-circle btn-outline">
            <img src={Edit} alt="edit" />
          </button>
        </Link>
        <button
          className="btn btn-circle btn-outline"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <img src={RedCross} alt="redCross" />
        </button>
        {showModal && (
          <DialogModal
            title="Delete Trainee?"
            message={`Do you want to delete ${trainee.callsign}? This action cannot be undone.`}
            isOpened={showModal}
            proceedButtonText="Delete"
            onProceed={deleteTrainee(trainee.id)}
            closeButtonText="Cancel"
            onClose={() => setShowModal(false)}
          />
        )}
      </td>
    </tr>
  );
};

export default TraineeTableRow;
