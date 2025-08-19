import { useState } from "react";
import NewIssue from "./components/NewIssue.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import NewLabel from "./components/NewLabel.tsx";
import Search from "./components/Search.tsx";

interface Issue {
    title: string;
    description: string;
    id: number;
    labels: number[];
}

interface Data {
    isOpen: boolean;
    data?: Issue
}

interface Labels {
    id: number;
    name: string;
    color: string
}

const initialIssuesList = [
    { id: 1, title: "Game", description: "Smth about game", labels: [1, 2, 3] },
    { id: 2, title: "Bug-Broken Image", description: "Smth about image", labels: [1] },
    { id: 3, title: "Marketing Digital", description: "Smth about marketing", labels: [1, 2] }
];

const initialLabelsList = [
    { id: 1, name: "bug", color: "red", },
    { id: 2, name: "feature", color: "green" },
    { id: 3, name: "question", color: "orange" },
];

const tabs = [
    { label: "Issues", value: "issues" },
    { label: "Labels", value: "labels" }
];

function App() {
    const [issuesList, setIssuesList] = useState(initialIssuesList);
    const [labelsList, setLabelsList] = useState<Labels[]>(initialLabelsList);
    const [selectTab, setSelectTab] = useState<string>(tabs[0].value);
    const [modalOpen, setModalOpen] = useState<Data>({ isOpen: false });
    const [isEdited, setIsEdited] = useState<boolean>(false);

    const handleDelete = (id: number) => {
        setIssuesList(issuesList.filter(issue => issue.id !== id));
    }

    const handleOpen = () => setModalOpen({ isOpen: true });
    const handleClose = (): void => setModalOpen({ isOpen: false });

    const renderLabels = (selectedLabelsArr: number[]) => {
        const issuesLabels = labelsList.filter(label => selectedLabelsArr.includes(label.id));
        return (
            <div className="flex gap-2 mt-2 flex-wrap">
                {issuesLabels.map((label, i) => (
                    <span key={i} className={`px-2 py-1 rounded-full text-white text-sm`} style={{ backgroundColor: label.color }}>
                        {label.name}
                    </span>
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto mt-10 p-5 flex flex-col gap-6">
     
            <div className="flex border-b border-gray-300">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectTab(tab.value)}
                        className={`px-6 py-3 font-semibold text-lg transition-colors ${
                            selectTab === tab.value
                                ? "border-b-4 border-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-blue-500"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <Search issuesList={issuesList} renderLabels={renderLabels}/>

 
            {selectTab === "issues" && (
                <div className="flex flex-col gap-4">
                    <button
                        className="self-start bg-blue-600 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-700 transition"
                        onClick={() => {
                            handleOpen();
                            setIsEdited(false);
                        }}
                    >
                        New Issue
                    </button>

                    {modalOpen?.isOpen && (
                        <NewIssue
                            issuesList={issuesList}
                            setIssuesList={setIssuesList}
                            labelsList={labelsList}
                            data={modalOpen?.data}
                            handleClose={handleClose}
                            isEdited={isEdited}
                        />
                    )}

                    {issuesList.map((issue) => (
                        <div key={issue.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white shadow rounded-lg border border-gray-200">
                            <div className="flex flex-col gap-1">
                                <p className="text-xl font-semibold">{issue.title}</p>
                                <span className="text-gray-600">{issue.description}</span>
                                {renderLabels(issue.labels)}
                            </div>
                            <div className="flex gap-3 mt-3 md:mt-0">
                                <FontAwesomeIcon
                                    icon={faPen}
                                    className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
                                    onClick={() => {
                                        setModalOpen({ isOpen: true, data: issue });
                                        setIsEdited(true);
                                    }}
                                />
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="text-red-600 cursor-pointer hover:text-red-800 transition"
                                    onClick={() => handleDelete(issue.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            
            {selectTab === "labels" && (
                <div className="flex flex-col gap-4">
                    <NewLabel labels={labelsList} setLabels={setLabelsList} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {labelsList.map((label) => (
                            <div
                                key={label.id}
                                className="px-4 py-3 rounded-lg font-semibold shadow text-white"
                                style={{ backgroundColor: label.color }}
                            >
                                {label.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
