

const DeletePopUp = ({handleClick,handleClose } : {handleClick: ()=> void, handleClose: ()=> void}) => {

    return  (
        <div className="fixed inset-0 bg-gray-800/25 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Permanently delete issue</h2>
                <p>Once you delete this issue, you will not be able to see it again.</p>
                <p>Deleting this issue will remove it from all issues and pull requests.</p>
                <div className="flex justify-end gap-3 mt-2">
                    <button
                        className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                        onClick={handleClick}
                    >
                        Delete this issue
                    </button>
                </div>
            </div>
        </div>


    );
};

export default DeletePopUp;