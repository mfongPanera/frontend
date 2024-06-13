import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import '../../Styles/searchBar.css'
import { Modal, ModalHeader,ModalTitle, ModalBody, ModalFooter, Button, Container,Row,Col } from "react-bootstrap";
import { clearSelectedData, setSelectedLocation, updateSelectedDataForDescription } from "../../app/dataReducer";
function SearchBar({setResults, setOpen, value, setInputValue}) {

    const [data,setData] = useState({})
    const [searchRes,setSearchRes] = useState([])
    const dispatch = useDispatch();
    const [showModal,setShowModal] = useState(false)
    const [modalMessage,setModalMessage] = useState(null)
    const [searchType,setSearchType]=useState("name")

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
        }
        else {
                if(data != null && inputValue.length>0) {
                console.log(data)
                res = data.filter((obj) => {
                    return obj.description.toLowerCase().includes(inputValue.toLowerCase())
                })
                setSearchRes(res)
            }
        }
    }

    const clearSearch = () => {
        setInputValue("")
    }
    
    const serachById = async (id) => {
        const res = await fetch(`http://localhost:5000/getById/${id}`, 
        {
            method:"GET",
            headers:{"Content-Type":"application/json"},
        });
        console.log(res)
        const rows = await res.json();
        if(res.status === 404) {
            setModalMessage(rows.message)
            setShowModal(true)
        } else {
            dispatch(
                updateSelectedDataForDescription({
                    requestedData:rows
                })
            )  
            dispatch(clearSelectedData())
            dispatch(setSelectedLocation("ALL LOCATIONS"))
        }
    }

    const searchByCategory = async (category) => {
        const res = await fetch(`http://localhost:5000/getByCategory/${category}`, 
        {
            method:"GET",
            headers:{"Content-Type":"application/json"}
        });
        const rows = await res.json();
        if(res.status===404) {
            setModalMessage(rows.message)
            setShowModal(true)
        } else {
            dispatch(
                updateSelectedDataForDescription({
                    requestedData:rows
                })
            )  
            dispatch(clearSelectedData())
            dispatch(setSelectedLocation("ALL LOCATIONS"))
        }
    }

    /*const searchBySubCategory = async (subCategory) => {
        const res = await fetch(`http://localhost:5000/getBySubCategory/${subCategory}`, 
        {
            method:"GET",
            headers:{"Content-Type":"application/json"}
        });
        const rows = await res.json();
        if(res.status===404) {
            setModalMessage(rows.message)
            setShowModal(true)
        } else {
            dispatch(
                updateSelectedDataForDescription({
                    requestedData:rows
                })
            )  
            dispatch(clearSelectedData())
            dispatch(setSelectedLocation("ALL LOCATIONS"))
        }
    } */ 


    const searchResult = async () => {
        const descriptions=[]
        let inputval = value.toLowerCase()
        console.log(value)
        if(inputval === 'all items') {
            data.forEach((e)=>{
                if(e.description.includes("'")) {
                    let desc = e.description
                    desc = desc.replace(/'/g,"''")
                    descriptions.push(desc)
                } else{
                    descriptions.push(e.description)
                }
            })
        } else {
            searchRes.forEach((e)=>{
                if(e.description.includes("'")) {
                    let desc = e.description
                    desc = desc.replace(/'/g,"''")
                    descriptions.push(desc)
                } else{
                    descriptions.push(e.description)
                }
            })
        }
        const res = await fetch(`http://localhost:5000/getAllItemsWithDesc/`,
        {
            method:'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                description:descriptions
            })
        });
        const rows = await res.json();
        if(rows.hasOwnProperty('message')) {
            setModalMessage(rows.message)
            setShowModal(true)
        } else {
            dispatch(
                updateSelectedDataForDescription({
                    requestedData:rows.data
                })
            )  
            dispatch(clearSelectedData())
            dispatch(setSelectedLocation("ALL LOCATIONS"))
        }
    }

    const hideModal = () => {
        setShowModal(false)
    }

    const handleEnter = (e) => {
        if(e.key==='Enter') {
            if(searchType==='name'){
                searchResult()
            } else if(searchType==='id') {
                serachById(e.target.value)
            } else if(searchType==='category') {
                searchByCategory(e.target.value)
            }
        }

    }

    const handleOptionChange = (e) => {
        setSearchType(e.target.value)
    }

    return(
        <React.Fragment>
        <Container className="input-wrapper">
            <Row className="searchRow">
                <Col lg={2} className="searchCol">
                    <select className="dropDown" id="searchOption" onChange={(e)=>handleOptionChange(e)}>
                        <option value="name">Name</option>
                        <option value="id">ID</option>
                        <option value="category">Category</option>
                    </select>
                </Col>
                <Col lg={10} className="searchCol clearIconDiv">
                    <input placeholder="Type Any Item..." value={value}
                        onChange={(e) => handleInputValue(e.target.value)}
                        onKeyUp={(e) => handleEnter(e)} className="bar"></input>
                    <div className="clearIcon" onClick={() => clearSearch()}><FontAwesomeIcon icon={faX}></FontAwesomeIcon></div>
                </Col>
            </Row>
        </Container>
        <Modal show={showModal} onHide={hideModal} centered backdrop="static" keyboard={false}>
                <ModalHeader closeButton>
                    <ModalTitle>Status</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    {modalMessage}
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={hideModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}

export default SearchBar;