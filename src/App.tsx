import { useState } from "react";
import Issues from "./components/Issues";
import Labels from "./components/Labels";

const tabs = [
    { label: "Issues", value: "issues", component: <Issues key="issues" /> },
    { label: "Labels", value: "labels", component: <Labels key="labels" /> },
];

function App() {
    const [selectTab, setSelectTab] = useState<string>(tabs[0].value);

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

            {tabs.map((tab) => selectTab === tab.value && tab.component)}
        </div>
    );
}

export default App;
