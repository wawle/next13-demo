import React from "react";

interface Props {
  params: {
    searchTerm: string;
  };
}

type SearchResult = {
  organic_results: [
    {
      position: number;
      title: string;
      link: string;
      thumbnail: string;
      snippet: string;
    }
  ];
};

const fetchSearchResults = async (searchTerm: string) => {
  const res = await fetch(
    `https://serpapi.com/search.json?q=${searchTerm}&api_key=${process.env.API_KEY}`,
    { next: { revalidate: 60 } }
  );
  //throw new Error("Whoops something broke!");
  const searchResult: SearchResult = await res.json();
  return searchResult;
};

const SearchResults = async ({ params }: Props) => {
  const { searchTerm } = params;
  const searchResults = await fetchSearchResults(searchTerm);

  return (
    <div>
      <p className="text-gray-500 text-sm">You searched fpr: {searchTerm}</p>

      <ol className="space-y-5 p-5">
        {searchResults.organic_results.map((result) => (
          <li key={result.position} className="list-decimal">
            <p className="font-bold">{result.title}</p>
            <p>{result.snippet}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default SearchResults;
