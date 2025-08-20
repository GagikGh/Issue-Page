import { useState } from "react";
import * as React from "react";
import type {IssueProps} from "../../types";
import { issueSchema } from "../../validation.ts";


function NewIssue({filteredResult, setFilteredResult, labelsList, handleClose, data, isEditing}: IssueProps) {
    const [title, setTitle] = useState<string>(data?.title || '');
    const [description, setDescription] = useState<string>(data?.description || '');
    const [selectedLabels, setSelectedLabels] = useState<string[]>(data?.labels || []);


    const [error, setError] = useState<Error | null>(null);

    const handleAddIssue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const { error, value } = issueSchema.validate(
            { title, description, labels: selectedLabels },
            { abortEarly: false }
        );

        if (error) {
            console.log("error", error.details)
            // const messages = error.details.map((d) => d.message).join(", ");
            // setError(new Error(messages));
            return;
        }

        if (!data) {
            if (title.trim() !== '' && description.trim() !== '') {
                // TODO: instead of setting setFilteredResult add item in local storage
                // TODO: trigger a function in parent component and in parent component re-fetch data from local storage
                const response = localStorage.getItem("initialIssuesList");
                const issueList = JSON.parse(response)


                const issue = {
                    id: filteredResult[filteredResult.length - 1]?.id + 1,
                    title: value.title,
                    description: value.description,
                    labels: value.labels
                }

                issueList.push(issue);
                localStorage.setItem("initialIssuesList", JSON.stringify(issueList));
                setFilteredResult(issueList);
                setTitle("");
                setDescription("");
                handleClose();
            }
        } else {
            setFilteredResult(
                filteredResult.map(issue =>
                    issue.id === data.id
                        ? {...issue, title: value.title, description: value.description, labels: value.labels}
                        : issue
                )
            );
            handleClose();
        }

        console.log(filteredResult);
        setError(null);
    }

    const handleSelectedLabels = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const labelsArray = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedLabels(labelsArray);
    };

    return (
        <div className="fixed inset-0 bg-gray-800/25 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg relative flex flex-col gap-4">
                <h2 className="text-2xl font-bold">{isEditing ? "Edit Issue" : "New Issue"}</h2>
                <form className="flex flex-col gap-4">
                    <label className="flex flex-col gap-1 text-lg font-semibold">
                        Title:
                        <input
                            placeholder="Enter issue title"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {error && <p className="text-red-600">{error.message}</p>}
                    </label>
                    <label className="flex flex-col gap-1 text-lg font-semibold">
                        Description:
                        <textarea
                            placeholder="Enter issue description"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-lg font-semibold">
                        Labels:
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
                        {error && <p className="text-red-600">{error.message}</p>}
                    </label>
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
                            {isEditing ? "Edit" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewIssue;
