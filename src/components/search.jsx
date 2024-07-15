import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const loadOptions = async (inputValue, loadedOptions) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=5289cade5c22487d92285423240707&q=${inputValue}`
    );
    const responseJSON = await response.json();


    return {
      options: responseJSON.map((city) => ({
        label: city.name + ", " + city.region,
        value: city.id,
      })),
      hasMore: false,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      options: [],
      hasMore: false,
    };
  }
};

function Search({ onCityChange }) {
  const [search, setSearch] = useState(null);

  const handleOnChange = (selectedOption) => {
    setSearch(selectedOption);
    onCityChange(selectedOption.label.split(",")[0]);
  };

  return (
    <AsyncPaginate
      placeholder="Search for a city"
      debounceTimeout={500}
      value={search}
      loadOptions={loadOptions}
      onChange={handleOnChange}
      className="search"
    />
  );
}

export default Search;
