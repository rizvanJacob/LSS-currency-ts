import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import { Training } from "../../../../@types/training";
import DownloadFileIcon from "../../../../assets/icons/DownloadFileIcon";
import getRequest from "../../../../utilities/getRequest";
import { buildFullUrl } from "../../../../utilities/stringManipulation";
import {
  decryptFlatJson,
  decryptString,
} from "../../../../utilities/cryptoUtils";
import { PdInfo, PdResponse } from "../../../../@types/pd";
import { useContext } from "react";
import { CurrentUserContext } from "../../../../App";
import { de } from "date-fns/locale";

type Props = {
  training: Training;
};

const GenerateNominalRollButton = ({ training }: Props) => {
  const currentUser = useContext(CurrentUserContext);

  const handleClick = async () => {
    //get PD
    const { response } = await getRequest(
      buildFullUrl(`/api/trainings/${training.id}/pd`),
      () => {}
    );
    const pdResponse = response?.data.training as PdResponse;
    const requestorResponse = response?.data.requestorInfo;

    const encryptedRequestor = JSON.parse(requestorResponse.info || "");
    const decryptedRequestor = await decryptFlatJson(encryptedRequestor);
    decryptedRequestor.id = currentUser?.id || 0;

    //decrypt PD and merge with training
    const traineesWithPd = await mapTraineesFromPdResponse(
      training,
      pdResponse
    );
    const trainingWithTraineesPD = { ...training, trainees: traineesWithPd };

    //generate PDF
    generatePDF(trainingWithTraineesPD, decryptedRequestor);
  };

  return (
    <button
      className="btn btn-square btn-sm btn-primary btn-outline shadow-md"
      onClick={handleClick}
    >
      <DownloadFileIcon className="w-6 h-6" />
    </button>
  );
};

export default GenerateNominalRollButton;

const mapTraineesFromPdResponse = async (
  training: Training,
  pdResponse: PdResponse
) => {
  const resultPromise = training.trainees.map(async (trainee) => {
    const returnTrainee = { ...trainee };
    const traineePd = pdResponse.trainees.find(
      (traineePd) => traineePd.trainee === trainee.trainee
    );

    const encryptedInfo = JSON.parse(traineePd?.info || "");
    const infoPromise = decryptFlatJson(encryptedInfo);
    const encryptedVehicle = traineePd?.vehicle || "";
    const vehiclePromise = decryptString(encryptedVehicle);
    const [info, vehicle] = await Promise.all([infoPromise, vehiclePromise]);

    //combine training + PD to TrainingWithTraineesPD
    returnTrainee.nric = info.nric;
    returnTrainee.name = info.name;
    returnTrainee.contact = info.mobile;
    returnTrainee.vehicle = vehicle;

    return returnTrainee;
  });
  return await Promise.all(resultPromise);
};

const generatePDF = (training: Training, requestor: PdInfo) => {
  const pdf = new jsPDF();

  //ADD TRAINING LEADING INFO
  pdf.setFontSize(12);
  pdf.text("Training Name: " + training.requirements?.name, 15, 20);
  pdf.text("Date: " + dayjs(training.start).format("DD MMM YY"), 15, 30);
  pdf.text("Start Time: " + dayjs(training.start).format("HH:mm"), 15, 40);
  pdf.text("End Time: " + dayjs(training.end).format("HH:mm"), 15, 50);
  pdf.text("Instructions: " + training.instruction, 15, 60);
  pdf.text("Passphrase: " + training.passphrase, 15, 70);

  const leadingInfoHeight = 80;

  //ADD MAIN CONTENT
  let pageHeight = pdf.internal.pageSize.getHeight();
  let pageWidth = pdf.internal.pageSize.getWidth();
  const remainingSpace = pageHeight - leadingInfoHeight - 10; // 10 is a margin

  const rowHeight = 15; // Adjust this value to change the row height
  const maxRowsPerPage = Math.floor(remainingSpace / rowHeight);

  // Add the table starting from the next page if necessary
  let currentPage = 1;
  let rowPosition = leadingInfoHeight;
  let currentRow = 0;

  const tableData = [];
  tableData.push([
    "S/N",
    "NRIC",
    "Name",
    "Contact",
    "Vehicle No",
    "Category",
    "Callsign",
    "Status",
  ]);

  training.trainees.forEach((trainee) => {
    const { nric, name, contact, vehicle } = trainee;
    const { callsign, categories, trainings } = trainee.trainees;
    const category = categories.name;
    const status = trainings && trainings.length ? trainings[0].status : "";

    let statusName = "";
    if (status === 1) {
      statusName = "Booked";
    } else if (status === 2) {
      statusName = "Attended";
    } else if (status === 3) {
      statusName = "Completed";
    } else if (status === 4) {
      statusName = "Withdrawn";
    } else if (status === 5) {
      statusName = "Absent";
    } else if (status === 6) {
      statusName = "Waitlist";
    }

    tableData.push([
      currentRow + 1,
      nric,
      name,
      contact,
      vehicle,
      category,
      callsign,
      statusName,
    ]);

    currentRow++;
    if (currentRow >= maxRowsPerPage) {
      pdf.addPage();
      currentPage++;
      currentRow = 0;
      rowPosition = 10; // Reset the row position for the new page
    }
  });

  autoTable(pdf, {
    head: [tableData[0]],
    body: tableData.slice(1),
    startY: rowPosition,
  });

  //ADD WATERMARK

  //ADD HEADERS, FOOTERS, AND WATERMARK
  const watermarkText = ` ${requestor.id} ${requestor.nric} ${dayjs().format(
    "DD/MM/YYYY HH:mm"
  )}`;
  const classification = "OFFICIAL (CLOSED) / SENSITIVE (NORMAL)";
  const totalPagesExp = "{total_pages_count_string}";
  pdf.internal.pages.forEach((page, index) => {
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();
    pdf.setFontSize(10);
    pdf.text(classification, pageWidth / 2, 10, {
      align: "center",
    });
    pdf.text(classification, pageWidth / 2, pageHeight - 10, {
      align: "center",
    });
    const pageStr = `Page ${index} of ${totalPagesExp}`;
    pdf.text(pageStr, pageWidth + 15, pageHeight - 10, { align: "right" });

    pdf.setTextColor(230, 230, 230);
    pdf.saveGraphicsState();
    pdf.setGState(pdf.GState({ opacity: 0.5 }));
    const watermarkWidth =
      (pdf.getStringUnitWidth(watermarkText) * 10) / pdf.internal.scaleFactor;

    const watermarkRepetitions = Math.ceil(pageHeight / watermarkWidth) * 3;
    for (let i = 0; i <= watermarkRepetitions; i++) {
      pdf.textWithLink(
        (watermarkText + "      ").repeat(15),
        pageWidth / 2,
        watermarkWidth * i + watermarkWidth / 2,
        { url: "", opacity: 0.5, align: "center", angle: 45 }
      );
    }
    pdf.restoreGraphicsState();
  });
  if (typeof pdf.putTotalPages === "function") {
    pdf.putTotalPages(totalPagesExp);
  }

  const trainingName = training.requirements?.name || "Training";
  const trainingDateFormatted = dayjs(training.start).format("MMM YY");
  pdf.save(`Nominal Roll for ${trainingName} on ${trainingDateFormatted}.pdf`);
};
