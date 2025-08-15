import {useState} from "react";

function NewIssue({issuesList,setIssuesList}) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [isOpen, setIsOpen] = useState<boolean>(false);


    const handleClick = () => {
        setIssuesList([...issuesList, {title, description: '', id: issuesList[issuesList.length - 1].id + 1}]);
    }

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);
    const handleAddIssue = (e) => {
        e.preventDefault();
        if (title.trim() !== '' && description.trim() !== '') {
            console.log(title,description)
            setIssuesList([...issuesList, {id: issuesList[issuesList.length - 1].id + 1,  title, description}]);
            setIsOpen(false);
        }

    }

    return (


        <div className="">
            {isOpen && (
                <div className="width-100 p-5 border-1 border-gray-800 rounded-md shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <form className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <label className="text-xl">Title:</label>
                            <input
                                placeholder="Enter issue title"
                                className="px-4 py-3 border-1 border-gray-300  text-xl"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xl">Description:</label>
                            <textarea placeholder="Enter issue description"
                                      className="px-4 py-3 border-1 border-gray-300"
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="bg-gray-400 px-4 py-3 text-lg text-white rounded-lg">Cancel</button>
                            <button className="bg-green-600 px-4 py-3 text-lg text-white rounded-lg" onClick={handleAddIssue}>Create</button>
                        </div>
                    </form>
                </div>
            )}


            <button
                className="px-4 py-3 text-xl bg-green-600 text-white"
                onClick={handleOpen}
            >
                New Issue
            </button>
        </div>
    )
}

export default NewIssue;