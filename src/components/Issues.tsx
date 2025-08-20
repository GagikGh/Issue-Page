import { useState } from 'react';
import NewIssue from "./NewIssue";
import Search from "./Search";
import Button from "./ui/Button";
import type {EditModal, Issue, Label} from "../../types";
import DeletePopUp from "./DeletePopUp.tsx";
import IssueCard from "./IssueCard.tsx";
import {parsedIssuesList} from "../helper/getIssuesList.ts";
import {parsedLabelsList} from "../helper/getLabelsList.ts";

const itemsPerPage = 2;

const Issues = () => {
    const [labelsList, setLabelsList] = useState<Label[]>(parsedLabelsList);
    const [modalOpen, setModalOpen] = useState<EditModal>({ isOpen: false });
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [filteredResult, setFilteredResult] = useState<Issue[]>(parsedIssuesList);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const totalPages = Math.ceil(filteredResult.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);


    const indexFirstItem = (currentPage - 1) * itemsPerPage;

    const currentIssues = filteredResult.slice(indexFirstItem, indexFirstItem + itemsPerPage);
    console.log(filteredResult);

    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
    const [selectedIssueId, setSelectedIssueId] = useState<string>(labelsList[0].id);

    const handleOpen = () => setModalOpen({ isOpen: true });
    const handleClose = (): void => setModalOpen({ isOpen: false });

    const handleDelete = (id: string) => {
        setFilteredResult(prev => prev.filter(issue => issue.id !== id));
        console.log(id)

    };

    const filterSearchResults = (query: string) => {
        const data = localStorage.getItem("initialIssuesList");
        const issuesList = JSON.parse(data)
        console.log(issuesList)

        const result = issuesList.filter(issue =>
            issue.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredResult(result);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col gap-4">
            <Button
                handleClick={() => {
                    handleOpen();
                    setIsEditing(false);
                }}
                content="Add New Issue"
            />

            <Search filterSearchResults={filterSearchResults} />

            {modalOpen?.isOpen && (
                <NewIssue
                    // handleTrigger={handleTrigger()}
                    filteredResult={filteredResult}
                    setFilteredResult={setFilteredResult}
                    labelsList={labelsList}
                    data={modalOpen?.data}
                    handleClose={handleClose}
                    isEditing={isEditing}
                />
            )}

            {currentIssues.length === 0 ? (
                <p className="text-gray-500">No results found</p>
            ) : (
                currentIssues.map((issue) => (
                    <IssueCard
                        key={issue.id}
                        issue={issue}
                        labelsList={labelsList}
                        setLabelsList={setLabelsList}
                        setSelectedIssueId={setSelectedIssueId}
                        setModalOpen={setModalOpen}
                        setIsEditing={setIsEditing}
                        setIsDeleteOpen={setIsDeleteOpen}

                    />
                ))
            )}

            {isDeleteOpen && (
                <DeletePopUp
                    handleClick={() => {
                        handleDelete(selectedIssueId)
                        setIsDeleteOpen(false)
                    }}
                    handleClose={()=> setIsDeleteOpen(false)}
                />
            )}

            <div className="flex gap-2">
                {pages.map((page) => (
                    <button
                        key={page}
                        className={`px-4 py-2 rounded-xl ${currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Issues;