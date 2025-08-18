import {useState} from "react";
import NewIssue from "./components/NewIssue.tsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faPen} from '@fortawesome/free-solid-svg-icons';
import NewLabel from "./components/NewLabel.tsx";

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
    {id: 1, title: "Game", description: "Smth about game", labels: [1, 2, 3]},
    {id: 2, title: "Bug-Broken Image", description: "Smth about image", labels: [1]},
    {id: 3, title: "Marketing Digital", description: "Smth about marketing", labels: [1, 2]}
]

const initialLabelsList = [
    {id: 1, name: "bug", color: "red",},
    {id: 2, name: "feature", color: "green"},
    {id: 3, name: "question", color: "orange"},
];

const tabs = [
    {
        label: "Issues",
        value: "issues"
    },
    {
        label: "NewLabel",
        value: "labels"
    }
];

function App() {
    const [issuesList, setIssuesList] = useState(initialIssuesList);
    const [labelsList, setLabelsList] = useState<Labels[]>(initialLabelsList);
    const [selectTab, setSelectTab] = useState<string>(tabs[0].value);
    const [modalOpen, setModalOpen] = useState<Data>({
        isOpen: false,
    });
    const [isEdited, setIsEdited] = useState<boolean>(false)

    const handleDelete = (id: number) => {
        const filteredIssues = issuesList.filter(issue => {
            return issue.id !== id;
        })
        setIssuesList(filteredIssues)
    }

    const handleOpen = () => setModalOpen({isOpen: true});
    const handleClose = (): void => setModalOpen({isOpen: false});

    const renderLabels = (selectedLabelsArr: number[]) => {
        const issuesLabels = labelsList.filter(label => {
            return selectedLabelsArr.includes(label.id);
        })


        return (
            <div>
                {issuesLabels.map((label, i) => (
                    <div key={i}>{label.name}</div>
                ))}
            </div>
        )
    }

    return (
        <div className="py-5 mt-10 w-200 flex flex-col gap-5 items-start border-2 border-blue-200 rounded-md mx-auto">
            <div className="flex border-1 border-gray-300">
                {
                    tabs.map((tab, index) => (
                        <div
                            key={index}
                            className="border-1 border-gray-300 px-4 py-3 text-2xl bg-gray-400"
                            onClick={() => setSelectTab(tab.value)}
                        >
                            {tab.label}
                        </div>
                    ))
                }
            </div>
            {
                selectTab === "issues" && (
                    <div className="w-full flex flex-col gap-2 p-5 text-blue-400">
                        <button
                            className="px-4 py-3 text-xl bg-green-600 text-white"
                            onClick={() => {
                                handleOpen();
                                setIsEdited(false)
                            }}
                        >
                            New Issue
                        </button>
                        {modalOpen?.isOpen &&
                            <NewIssue issuesList={issuesList} setIssuesList={setIssuesList} labelsList={labelsList}
                                      data={modalOpen?.data} handleClose={handleClose} isEdited={isEdited}/>}
                        {issuesList.map((issue) => (
                            <div key={issue.id} className="flex justify-between items-center border-b-1 border-blue-500">
                                <div className="flex flex-col  ">
                                    <p className="text-2xl">{issue.title}</p>
                                    <span className="text-lg">{issue.description}</span>
                                </div>

                                {renderLabels(issue.labels)}

                                <div>
                                    <FontAwesomeIcon icon={faTrash} size="lg" onClick={() => handleDelete(issue.id)}/>
                                    <FontAwesomeIcon icon={faPen} size="lg" onClick={() => {
                                        setModalOpen({
                                            isOpen: true,
                                            data: issue,
                                        })
                                        setIsEdited(true)
                                    }}/>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
            {
                selectTab === "labels" && (
                    <div className="w-full flex flex-col items-start gap-2 p-5 ">
                        <NewLabel labels={labelsList} setLabels={setLabelsList}/>
                        {labelsList.map((label) => (

                            <div
                                key={label.id}
                                className={`bg-gray-200 text-xl  border-1  px-5 py-4 rounded-xl`}
                                style={{color: label.color}}
                            >
                                {label.name}
                            </div>
                        ))}
                    </div>
                )
            }

        </div>
    )
}

export default App
