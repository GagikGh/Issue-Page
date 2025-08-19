import { useState } from "react";
import * as React from "react";

interface Issue {
    title: string;
    description: string;
    id: number;
    labels: number[];
}

interface IssueProps {
    issuesList: Issue[];
    setIssuesList: React.Dispatch<React.SetStateAction<Issue[]>>;
    labelsList: { id: number; name: string; color: string }[];
    handleClose: () => void;
    data?: Issue;
    isEdited: boolean;
}

function NewIssue({ issuesList, setIssuesList, labelsList, handleClose, data, isEdited }: IssueProps) {
    const [title, setTitle] = useState<string>(data?.title || '');
    const [description, setDescription] = useState<string>(data?.description || '');
    const [selectedLabels, setSelectedLabels] = useState<number[]>(data?.labels || []);

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
                        ? { ...issue, title, description, labels: selectedLabels }
                        : issue
                )
            );
            handleClose();
        }
    }

    const handleSelectedLabels = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const labelsArray = Array.from(e.target.selectedOptions, option => +option.value);
        setSelectedLabels(labelsArray);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg relative flex flex-col gap-4">
                <h2 className="text-2xl font-bold">{isEdited ? "Edit Issue" : "New Issue"}</h2>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-semibold">Title:</label>
                        <input
                            placeholder="Enter issue title"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-semibold">Description:</label>
                        <textarea
                            placeholder="Enter issue description"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-semibold">Labels:</label>
                        <select
                            multiple
                            value={selectedLabels}
                            onChange={handleSelectedLabels}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            {labelsList.map((label) => (
                                <option key={label.id} value={label.id}>{label.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                            onClick={handleAddIssue}
                        >
                            {isEdited ? "Edit" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewIssue;
