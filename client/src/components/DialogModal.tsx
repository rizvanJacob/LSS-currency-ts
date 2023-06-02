import { useRef, useEffect } from "react";

type Props = {
  title: string;
  message: string;
  isOpened: boolean;
  proceedButtonText?: string;
  onProceed: () => void;
  closeButtonText?: string;
  onClose: () => void;
};

const DialogModal = ({
  title,
  message,
  isOpened,
  proceedButtonText = "Proceed",
  onProceed,
  closeButtonText = "Close",
  onClose,
}: Props) => {
  const ref: any = useRef(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add("modal-open"); // prevent bg scroll
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpened]);

  const proceedAndClose = () => {
    onProceed();
    onClose();
  };

  const preventAutoClose = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <dialog
      className="card shadow-xl w-96 bg-base-100 text-primary overflow-hidden"
      ref={ref}
      onClick={onClose}
      onKeyDown={onClose}
    >
      <div
        className="flex flex-col gap-y-2 max-w-sm"
        onClick={preventAutoClose}
      >
        <h3 className="font-bold text-lg capitalize">{title}</h3>
        <p className="py-2 whitespace-normal break-normal text-left">
          {message}
        </p>
        <div className="flex justify-end gap-x-2">
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            {closeButtonText}
          </button>
          <button className="btn btn-primary btn-sm" onClick={proceedAndClose}>
            {proceedButtonText}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DialogModal;
