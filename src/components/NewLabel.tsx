import {useState} from "react";

function NewLabel({labels,setLabels}) {
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState("#B545C4");
    const [labelName, setLabelName] = useState("");

    const handleOpen = () => setIsOpen(true);

    const handleClose = () => setIsOpen(false);

    const handleLabelAdd = (e) => {
        e.preventDefault();
        setLabels([...labels, {id: labels[labels.length - 1].id + 1, name: labelName, color}]);
        setIsOpen(false);
    }

    return (
        <>
            {isOpen && (
                <div className="width-100 p-5 border-1 border-gray-800 rounded-md shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <form>
                        <div className="flex flex-col gap-2">
                            <label className="text-xl">Name</label>
                            <input
                                type="text"
                                className="px-4 py-3 border-1 border-gray-300  text-xl"
                                value={labelName}
                                onChange={(e) => setLabelName(e.target.value)}/>
                        </div>
                        <div>
                            <label className="text-xl">Color</label>
                            <input type="color" value={color} onChange={(e) => setColor(e.target.value)}/>
                        </div>

                        <button
                            className="bg-gray-400 px-4 py-3 text-lg text-white rounded-lg"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>

                        <button
                            className="bg-green-600 px-4 py-3 text-lg text-white rounded-lg"
                            onClick={handleLabelAdd}
                        >
                            Add
                        </button>

                    </form>
                </div>
            )}
           <button
               className="px-4 py-3 text-xl bg-green-600 text-white"
               onClick={handleOpen}
           >
               Add New Label
           </button>
        </>
    )
}

export default NewLabel;