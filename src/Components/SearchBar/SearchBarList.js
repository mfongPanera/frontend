import React, { useEffect, useRef } from "react";
import {
    updateSelectedDataForSelectedItem,
    clearSelectedData,
    setSelectedLocation,
    setLoadingSpinner
  } from "./../../app/dataReducer";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBarList({results, open,setInputValue,setOpen}) {
    const dispatch = useDispatch()

    useEffect(()=>{
        document.addEventListener("click",hideSearchBarOnClick,true)
    })

    const refOne = useRef(null);

    const hideSearchBarOnClick = (e) => {
        if(refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false)
        }
    }

    const handleItemClick = async (item) => {
        try {
            setOpen(false)
            setInputValue(item.textContent)
            dispatch(
                setLoadingSpinner({
                    loadingSpinner: true
                })
            )
            let desc = btoa(item.textContent)
            const response = await fetch(
                `http://localhost:5000/get_item/${desc}`
            );
            const requestedData = await response.json();
            dispatch(
                updateSelectedDataForSelectedItem({
                  requestedData: requestedData,
                  selectedItem: item.textContent
                }),
              );
              dispatch(clearSelectedData());
              dispatch(setSelectedLocation('ALL LOCATIONS'))
              dispatch(
                setLoadingSpinner({
                    loadingSpinner: false
                })
              )
          } catch (err) {
            console.log("error occurred")
            console.error(err.message);
          }
    }
    return (
        <div className="resultsList" ref={refOne}>
            { open && results.map((ele)=> {
                return <div className="listButton"  onClick={(e) => handleItemClick(e.target)}><FontAwesomeIcon icon={faSearch} className="iconList"></FontAwesomeIcon>
                <span className="description">{ele.description}</span></div>
            })}
        </div>
    )
}

export default SearchBarList;