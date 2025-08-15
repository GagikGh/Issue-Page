import { useState } from "react";
import NewIssue from "./components/NewIssue.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const initialIssuesList = [
    { id: 1, title: "Game", description: "Smth about game", labels: [1, 2, 3]},
    { id: 2, title: "Bug-Broken Image", description: "Smth about image", labels: [1] },
    { id: 3, title: "Marketing Digital", description: "Smth about marketing", labels: [1, 2] }
]

const initialLabelsList = [
    { id: 1, name: "bug", color: "red", },
    { id: 2, name: "feature", color: "green" },
    { id: 3, name: "question", color: "red" },
]



function App() {
 const [issuesList, setIssuesList] = useState(initialIssuesList);
 const [labels, setLabels] = useState<string[]>(initialLabelsList);

    const handleDelete = (id) => {
        const filteredIssues = issuesList.filter(issue => {
             return issue.id !== id;

        })

        setIssuesList(filteredIssues)
    }

  return (
    <div className="py-5 mt-10 w-200 flex flex-col gap-5 items-start border-2 border-blue-200 rounded-md mx-auto">

        <NewIssue issuesList={issuesList} setIssuesList={setIssuesList} />
        <div className="w-full flex flex-col gap-2 p-5 text-blue-400">
            {issuesList.map((issue) => (
                <div key={issue.id} className="flex justify-between items-center border-b-1 border-blue-500">
                    <div className="flex flex-col  ">
                        <p className="text-2xl">{issue.title}</p>
                        <span className="text-lg">{issue.description}</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faTrash} size="lg"  onClick={() => handleDelete(issue.id)}/>
                    </div>

                </div>
            ))}
        </div>
    </div>
  )
}

export default App
