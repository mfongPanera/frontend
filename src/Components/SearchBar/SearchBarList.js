import React, { useEffect, useState } from "react";
import {
    updateSelectedDataForSelectedItem,
    clearSelectedData,
    setSelectedLocation,
    setLoadingSpinner
  } from "./../../app/dataReducer";
import { useDispatch, useSelector } from "react-redux";

function SearchBarList({results, open,setInputValue,setOpen}) {
    const loadingSpinner = useSelector((state)=> state.dataReducer.loadingSpinner)
    const dispatch = useDispatch()
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
        <div className="resultsList">
            { open && results.map((ele)=> {
                return <div className="listButton" onClick={(e) => handleItemClick(e.target)}>{ele.description}</div>
            })}
        </div>
    )
}

export default SearchBarList;