import type {Label} from "../../types";
import {v4 as uuidv4} from "uuid";

let labelsList = localStorage.getItem("initialLabelsList");

if(!labelsList) {
    const initialLabelsList: Label[] = [
        { id: uuidv4(), name: "bug", color: "red", },
        { id: uuidv4(), name: "feature", color: "green" },
        { id: uuidv4(), name: "question", color: "orange" },
    ];
    localStorage.setItem("initialLabelsList", JSON.stringify(initialLabelsList));
    labelsList = JSON.stringify(initialLabelsList);
}

export const parsedLabelsList: Label[] = JSON.parse(labelsList);