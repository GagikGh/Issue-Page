import type {Issue} from "../../types";
import {v4 as uuidv4} from "uuid";
import {parsedLabelsList} from "./getLabelsList.ts";

export let issuesList = localStorage.getItem("initialIssuesList");

if (!issuesList) {
    const initialIssuesList: Issue[] = [
        { id: uuidv4(), title: "Game", description: "Smth about game", labels: [parsedLabelsList[0].id, parsedLabelsList[1].id, parsedLabelsList[2].id] },
        { id: uuidv4(), title: "Bug-Broken Image", description: "Smth about image", labels: [parsedLabelsList[1].id, parsedLabelsList[2].id] },
        { id: uuidv4(), title: "Marketing Digital", description: "Smth about marketing", labels: [parsedLabelsList[0].id] },
        { id: uuidv4(), title: "React Scripts Build", description: "#17121 In facebook/create-react-app;· Ruksana9966 opened on Jul 16", labels: [parsedLabelsList[0].id, parsedLabelsList[1].id] },
        { id: uuidv4(), title: "I Cannot Create a React Application", description: "17118 In facebook/create-react-app;· by MohamadG004 was closed on Jul 11", labels: [parsedLabelsList[2].id] },
        { id: uuidv4(), title: "README.md", description: "Status: #17049 In facebook/create-react-app;· S33G opened on Apr 5", labels: [parsedLabelsList[0].id, parsedLabelsList[2].id] },
    ];
    localStorage.setItem("initialIssuesList", JSON.stringify(initialIssuesList));
    issuesList = JSON.stringify(initialIssuesList);
}

export const parsedIssuesList: Issue[] = JSON.parse(issuesList);