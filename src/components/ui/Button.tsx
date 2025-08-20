
const Button = ({handleClick, content}: {handleClick: () => void, content: string}) => {
    return (
        <div>
            <button
                className="self-start bg-blue-600 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-700 transition"
                onClick={handleClick}
            >
                {content}
            </button>
        </div>
    );
};

export default Button;