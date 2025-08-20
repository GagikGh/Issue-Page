import { useState } from "react";
import Button from "./ui/Button.tsx";
import type {Label} from "../../types";
import * as React from "react";

function NewLabel({ labels, setLabels }: { labels: Label[], setLabels:  React.Dispatch<React.SetStateAction<Label[]>>}) {
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState("#B545C4");
    const [labelName, setLabelName] = useState("");

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleLabelAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setLabels([...labels, { id: labels[labels.length - 1].id + 1, name: labelName, color }]);
        setLabelName("");
        setColor("#B545C4");
        setIsOpen(false);
    }

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-gray-800/25 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg flex flex-col gap-4">
                        <h2 className="text-2xl font-bold">New Label</h2>
                        <form className="flex flex-col gap-3">
                            <label className="flex flex-col gap-1 text-lg font-semibold">
                                Name
                                <input
                                    type="text"
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={labelName}
                                    onChange={(e) => setLabelName(e.target.value)}
                                />
                            </label>
                            <label className="flex flex-col gap-1 text-lg font-semibold">
                                Color
                                <input
                                    type="color"
                                    className="w-16 h-10 cursor-pointer"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                />
                            </label>
                            <div className="flex justify-end gap-3 mt-2">
                                <button
                                    className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                                    onClick={handleLabelAdd}
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Button handleClick={handleOpen} content="Add New Label" />
        </>
    )
}

export default NewLabel;
