/* eslint-disable react/prop-types */
function ConfirmationDialog({ isOpen, message, onConfirm, onCancel }) {
  return isOpen ? (
    <div className="z-10 flex items-center justify-center">
      <div className="w-1/2 rounded-lg  bg-slate-100 p-5 shadow-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            className="mr-2 rounded bg-red-500 px-3 py-2 text-white"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded bg-green-500 px-3 py-2 text-white"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default ConfirmationDialog;
