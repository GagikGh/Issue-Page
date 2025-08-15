function Labels(props) {
    return (
        <>
            <label>Choose a label:</label>
            <select name="labels">
                <option value="">Choose a label</option>
                {labels.map((label) => (
                    <option value={label.name} key={label.id}>
                        {label.name}
                    </option>
                ))}
            </select></>
    )
}

export default Labels;