import * as React from "react";

interface SearchProps {
    filterSearchResults: (query: string) => void;
}

function Search({ filterSearchResults }: SearchProps) {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;

        filterSearchResults(query);
        //debounce
    };

    return (
        <div className="w-full max-w-md mx-auto flex flex-col gap-2">
            <input
                type="text"
                onChange={handleSearch}
                placeholder="Search issues..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
    );
}

export default Search;
