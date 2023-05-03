import { useRef, useEffect } from "react";

type Props = {
  title: string;
  isOpened: boolean;
  onProceed: () => void;
  onClose: () => void;
  message: React.ReactNode;
};

const DialogModal = ({
  title,
  isOpened,
  onProceed,
  onClose,
  message,
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
      className="card w-96 bg-neutral text-primary"
      ref={ref}
      onClick={onClose}
      onKeyDown={onClose}
    >
      <div className="flex flex-col gap-y-2" onClick={preventAutoClose}>
        <h3 className="font-bold text-lg capitalize">{title}</h3>
        <p>{message}</p>
        <div className="flex justify-end gap-x-2">
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary btn-sm" onClick={proceedAndClose}>
            Proceed
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DialogModal;
