import * as React from "react";

export interface Issue {
    title: string;
    description: string;
    id: string;
    labels: string[];
}

export interface Label {
    id: string;
    name: string;
    color: string
}

export interface IssueProps {
    filteredResult: Issue[];
    setFilteredResult: React.Dispatch<React.SetStateAction<Issue[]>>;
    labelsList: LabelsType[];
    handleClose: () => void;
    isEditing: boolean;
    data?: Issue;
}

export interface EditModal {
    isOpen: boolean;
    data?: Issue
}