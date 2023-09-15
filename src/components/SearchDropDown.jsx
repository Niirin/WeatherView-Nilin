import { useState, useEffect, useRef } from "react";

const SearchDropDown=({onSubmit}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [inputValue, setInputValue] = useState('Search for any city');
    const [suggests, setSuggests] = useState([]);
    const [clickedSearch, setClickedSearch] = useState(false);
    const [location, setLocation]= useState([]);

    const inputRef = useRef(null);


    //Let's use API to send the search term to get suggestions
    const apiURL = import.meta.env.VITE_APP_API_GEO;
    const apikey = import.meta.env.VITE_GEOCODER_KEY;


    const handleInputChange = (e) => {
        const val = e.target.value;
        setSearchTerm(val);
    };

    const handleClickSearch = async (e) => {
        try {
            const response = await fetch(`${apiURL}q=${searchTerm}&key=${apikey}`)
            const res = await response.json();
            setSuggests(res.results);
            console.log(res.results);
            setClickedSearch(true);
        } catch (error) {
            console.log('Error fetching query term for city:', error);
        }
    };

    const handleSelectChange = (city) => {
        setClickedSearch(!clickedSearch);
        console.log(city);
        setInputValue(city.formatted);
        inputRef.current.value= '';
        // console.log(city.geometry);
        // onSubmit(cityLocation);
        setLocation(city.geometry);

    }

    const handleSubmit= (e) => {
        e.preventDefault();
        console.log(location);
        onSubmit(location);
    }


    return <div className="search-cont">
        <form className="search-bar" onSubmit={handleSubmit}>
            <input 
                className="search-field"
                ref={inputRef}
                type = "text"
                onChange= {handleInputChange}
                placeholder={inputValue}
            />
            <img className="search" src="./src/assets/search_icon.svg" alt="search" onClick={handleClickSearch} />
            </form>
            {clickedSearch && (
                <ul className="suggests-cont">
                    {suggests.map((suggest, index)=> (
                        <li className="suggest" onClick={() => handleSelectChange(suggest)} key={index}>{suggest.formatted}</li>
                    ))}
                </ul>
            )}
        </div>
}
export default SearchDropDown;