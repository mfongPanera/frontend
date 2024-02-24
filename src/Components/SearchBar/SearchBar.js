import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import '../../Styles/searchBar.css'
function SearchBar({setResults, setOpen, value, setInputValue}) {

    const [data,setData] = useState({})

    const fetchDataForSearchEngine = async () => {
        try {
            const response = await fetch("http://localhost:5000/get_all_items_description");
            const result = await response.json()
            setData(result)
        } catch(err) {
            console.log(err.message)
        }
    }
    useEffect(()=> {
        fetchDataForSearchEngine()
    })

    const handleInputValue = (inputValue) => {
        setInputValue(inputValue)
        var res = [];
        if(inputValue.length==0){
            setResults(res)
            setOpen(false)
        }
        else {
                if(data != null && inputValue.length>0) {
                res = data.filter((obj) => {
                    return obj.description.toLowerCase().includes(inputValue.toLowerCase())
                })
                setResults(res)
                setOpen(true)
            }
        }
    }

    const clearSearch = () => {
        setInputValue("")
    }

    return(
        <div className="input-wrapper">
            <FontAwesomeIcon icon={faSearch} className="icon"></FontAwesomeIcon>
            <input placeholder="Type Any Item..." value={value}
            onChange={(e) => handleInputValue(e.target.value)}></input>
            <span className="clearIcon" onClick={() => clearSearch()}><FontAwesomeIcon icon={faX}></FontAwesomeIcon></span>
        </div>
    )
}

export default SearchBar;