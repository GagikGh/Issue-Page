import {useState} from "react";
import * as React from "react";

interface Issue {
    title: string;
    description: string;
    id: number;
    labels: number[];
}

interface IssueProps {
    issuesList: Issue[],
    setIssuesList: React.Dispatch<React.SetStateAction<Issue[]>>,
    labelsList: {
        id: number;
        name: string;
        color: string
    }[],
    handleClose: () => void,
    data?: Issue
    isEdited: boolean;
}

function NewIssue({issuesList, setIssuesList, labelsList, handleClose, data, isEdited} : IssueProps ) {
    const [title, setTitle] = useState<string>(data?.title || '');
    const [description, setDescription] = useState<string>(data?.description || '');
    const [selectedLabels, setSelectedLabels] = useState<number[]>(data?.labels || [])

    const handleAddIssue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!data) {
            if (title.trim() !== '' && description.trim() !== '') {
                setIssuesList([...issuesList, {
                    id: issuesList[issuesList.length - 1]?.id + 1,
                    title,
                    description,
                    labels: selectedLabels
                }]);
                setTitle("");
                setDescription("");
                handleClose();
            }
        } else {
            setIssuesList(
                issuesList.map(issue =>

                    issue.id === data.id
                        ? {...issue, title, description, labels: selectedLabels}
                        : issue
                )
            );

            handleClose();
        }
    }

    const handleSelectedLabels = (e:   React.ChangeEvent<HTMLSelectElement>) => {
        const labelsArray = Array.from(e.target.selectedOptions, option => +option.value);
        setSelectedLabels(labelsArray);
    }

    console.log("data", data);

    return (
        <div className="">
            <div
                className="width-100 bg-gray-200 p-5 border-1 border-gray-800 rounded-md shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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

                    <select multiple value={selectedLabels} onChange={(e) => handleSelectedLabels(e)}>
                        <option disabled>Choose labels</option>
                        {labelsList.map((label) => (
                            <option key={label.id} value={label.id}>{label.name}</option>
                        ))}
                    </select>
                    <div className="flex gap-2">
                        <button
                            className="bg-gray-400 px-4 py-3 text-lg text-white rounded-lg"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-green-600 px-4 py-3 text-lg text-white rounded-lg"
                            onClick={handleAddIssue}
                        >
                            {isEdited ? "Edit" : "Create"}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default NewIssue;