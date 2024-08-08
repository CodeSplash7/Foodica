export default function ConfirmDelete({
  isModalOpen,
  handleDelete,
  closeModal,
  message
}: {
  isModalOpen: boolean;
  handleDelete: () => void;
  closeModal: () => void;
  message: string;
}) {
  return (
    <div
      className={`${
        isModalOpen ? "flex" : "hidden"
      } fixed inset-0 items-center justify-center bg-black bg-opacity-50 z-[100]`}
    >
      <div className="w-[250px] flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl">
        <div className="">
          <div className="text-center p-3 flex-auto justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 flex items-center text-gray-600 mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <h2 className="text-xl font-bold py-4 text-gray-200">
              Delete Post?
            </h2>
            <p className="text-sm text-gray-500 px-2">{message}</p>
          </div>
          <div className="p-2 mt-2 text-center space-x-1 md:block">
            <div
              onClick={closeModal}
              className="mb-2 md:mb-0 bg-gray-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-700 transition ease-in duration-150"
            >
              Cancel
            </div>
            <div
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider text-white rounded-full transition ease-in duration-150 "
            >
              Confirm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
