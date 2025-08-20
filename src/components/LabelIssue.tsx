import type {Label} from "../../types";

const LabelIssue = ({labelsList,  selectedLabelsArr} : {labelsList: Label[], selectedLabelsArr: string[]}) => {
    const issuesLabels = labelsList.filter(label => selectedLabelsArr.includes(label.id));
    return (
        <div className="flex gap-2 justify-center items-center mt-2 flex-wrap">
            {issuesLabels.map((label, i) => (
                <span key={i} className={`px-2 py-1 rounded-full text-white text-sm`}
                      style={{backgroundColor: label.color}}>
                        {label.name}
                    </span>
            ))}
        </div>
    );
};

export default LabelIssue;