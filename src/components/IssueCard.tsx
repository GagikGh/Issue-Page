import React from "react";
import LabelIssue from "./LabelIssue.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import type { Issue, Label, EditModal } from "../../types";

interface IssueCardProps {
    issue: Issue;
    labelsList: Label[];
    setLabelsList:  React.Dispatch<React.SetStateAction<Label[]>>;
    setModalOpen:  React.Dispatch<React.SetStateAction<EditModal>>;
    setIsEditing: (isEditing: boolean) => void;
    setIsDeleteOpen:  React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedIssueId: (id: string) => void;

}

function IssueCard({issue,labelsList, setLabelsList, setModalOpen, setIsEditing, setIsDeleteOpen, setSelectedIssueId} : IssueCardProps) {
    return (
        <div
            className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white shadow rounded-lg border border-gray-200"
        >
            <div className="flex  gap-4">
                <div className="flex flex-col gap-1">
                    <p className="text-xl font-semibold">{issue.title}</p>
                    <span className="text-gray-600">{issue.description}</span>
                </div>

                <LabelIssue
                    labelsList={labelsList}
                    setLabelsList={setLabelsList}
                    selectedLabelsArr={issue.labels}
                />
            </div>
            <div className="flex gap-3 mt-3 md:mt-0">
                <FontAwesomeIcon
                    icon={faPen}
                    className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
                    onClick={() => {
                        setModalOpen({ isOpen: true, data: issue });
                        setIsEditing(true);
                    }}
                />
                <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-600 cursor-pointer hover:text-red-800 transition"
                    onClick={() => {
                        setIsDeleteOpen(true)
                        setSelectedIssueId(issue.id);
                    }}
                />
            </div>
        </div>
    );
}

export default IssueCard;