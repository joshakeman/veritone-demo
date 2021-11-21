import React, { useState, useEffect, useCallback } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

import MainContent from './MainContent'
import AddEditModal from './AddEditModal';

export default function ListContainer() {
    const [items, setItems] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [modal, setModal] = useState({isOpen: false, mode: ''})
    const [inputs, setInputs] = useState({})

    useEffect(() => {
        fetchItems()
    }, [ modal ])

    function fetchItems() {
        setIsFetching(true)
        
        fetch('http://localhost:8080/api/list-all')
        .then(response => response.json())
        .then(data => setItems(data))
        .catch(err => console.log(err))
        
        setIsFetching(false)
    }

    const onChangeHandler = useCallback(
        ({target:{name,value}}) => setInputs(state => ({ ...state, [name]:value }), [])
      );

    function handleOpen( mode ) {
        setModal({
            isOpen: true,
            mode
        })
    }

    function handleClose() {
        setModal({
            isOpen:false
        })
    }

    function createNew() {
        fetch('http://localhost:8080/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
        .then(data => {
            console.log("Resetting inputs and closing modal")
            setInputs({})
            setModal({
                isOpen:false
            })
        })
    }

    function deleteItem(uuid) {
        console.log(`Deleting item with uuid ${uuid}`)
        let reqBody = {
            uuid
        }
        fetch('http://localhost:8080/api/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        })
        .then(data => {
            // console.log("Resetting inputs and closing modal")
            // setInputs({})
            // setModal({
            //     isOpen:false
            // })
        })
    }
    return (
        <>
            {
            isFetching ? (
                <CircularProgress sx={{marginTop:'120px'}}/>
            ) : (
                <>
                <MainContent 
                items={items} 
                modal={modal} 
                handleOpen={handleOpen} 
                handleClose={handleClose} 
                deleteItem={deleteItem} 
                />

                <AddEditModal 
                inputs={inputs} 
                mode={modal.mode} 
                open={modal.isOpen} 
                handleClose={handleClose} 
                onChangeHandler={onChangeHandler} 
                createNew={createNew}
                />
                </>
            )
        }
    </>
    )
}
