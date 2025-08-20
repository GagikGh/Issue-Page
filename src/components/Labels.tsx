import NewLabel from "./NewLabel.tsx";
import  {useState} from "react";
import {parsedLabelsList} from "../helper/getLabelsList.ts";

const Labels = () => {
    const [labelsList, setLabelsList] = useState(parsedLabelsList);

    return (
        <div>
            <div className="flex flex-col gap-4">
                <NewLabel labels={labelsList} setLabels={setLabelsList} />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {labelsList?.map((label) => (
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
        </div>
    );
};

export default Labels;