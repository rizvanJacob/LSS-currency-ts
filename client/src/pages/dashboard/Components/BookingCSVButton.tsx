import getRequest from "../../../utilities/getRequest";
import { useState } from "react";
import { Booking } from "../../../@types/lookup";
import { ExportToCsv } from "export-to-csv";

const BookingCSVButton = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const handleClick = async () => {
    try {
      const response = await getRequest(
        `/api/trainees/bookings/csv`,
        setBookings
      );
      const csvData = response?.response?.data;
      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "Bookings Data",
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: false,
      };
      const csvExporter = new ExportToCsv(options);
      csvExporter.generateCsv(csvData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className="btn btn-primary my-2" onClick={handleClick}>
      Download all bookings as .csv
    </button>
  );
};

export default BookingCSVButton;
