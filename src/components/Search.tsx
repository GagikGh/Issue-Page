import { useState } from "react";

interface Issue {
    title: string;
    description: string;
    id: number;
    labels: number[];
}

interface SearchProps {
    issuesList: Issue[];
}

function Search({ issuesList, renderLabels }: SearchProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResult, setFilteredResult] = useState<Issue[]>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        const results = issuesList.filter(issue =>
            issue.title.toLowerCase().includes(query.toLowerCase())
        );
        console.log(results);
        
        setFilteredResult(results);
    };

    return (
        <div className="w-full max-w-md mx-auto flex flex-col gap-2">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search issues..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex flex-col gap-2 mt-2">
                {filteredResult.length > 0 ? (
                    filteredResult.map(issue => (
                        <div
                            key={issue.id}
                            className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white shadow rounded-lg border border-gray-200"
                        >
                            <p className="text-xl font-semibold">{issue.title}</p>
                            <span className="text-gray-600">{issue.description}</span>
                            {renderLabels(issue.labels)}
                        </div>
                    ))
                ) : (
                    searchQuery && <p className="text-gray-500">No results found</p>
                )}
            </div>
        </div>
    );
}

export default Search;
