type Prop = {
  id: string;
  header: string;
  message: string;
  buttonText: string;
  open?: boolean;
  buttonAction?: () => void;
  hasCancelButton?: boolean;
};

const ConfirmPopup = ({
  id,
  header,
  message,
  buttonText,
  open = false,
  buttonAction = () => {},
  hasCancelButton = false,
}: Prop) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" checked={open} />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{header}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label htmlFor={id} className="btn">
              {buttonText}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmPopup;
