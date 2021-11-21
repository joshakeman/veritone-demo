import React, { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

import MainContent from './MainContent'

export default function ListContainer() {
    const [items, setItems] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [modal, setModal] = useState({isOpen: false, mode: ''})

    useEffect(() => {
        fetchItems()
    })

    function fetchItems() {
        // setIsFetching(true)
        
        // fetch('http://localhost:8080/items')
        // .then(response => response.json())
        // .then(data => console.log(data));
        
        // setIsFetching(false)
    }

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

    return (
        <>
            {
            isFetching ? (
                <CircularProgress sx={{marginTop:'120px'}}/>
            ) : (
                <MainContent items={items} modal={modal} handleOpen={handleOpen} handleClose={handleClose} />
            )
        }
    </>
    )
}
