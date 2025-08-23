
export const ConfirmModal = ({
  open,
  message,
  onConfirm,
  onCancel
}: {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
        <h2 className="text-lg font-semibold">{message}</h2>
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onCancel} className="px-4 py-2 rounded-xl bg-gray-200">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-red-500 text-white">Delete</button>
        </div>
      </div>
    </div>
  );
};
