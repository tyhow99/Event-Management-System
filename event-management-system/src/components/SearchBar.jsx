import React, {useState} from 'react';

function SearchBar({onSearch}){
    const [searchTerm, setSearchTerm] = useState('')

    const inputChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    }

    return(
        <input type="text" placeholder="Search..." value={searchTerm} onChange={inputChange}></input>
    );
}

export default SearchBar;