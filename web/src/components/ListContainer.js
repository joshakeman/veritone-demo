import React, { useState, useEffect, useCallback } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

import MainContent from './MainContent'
import AddEditModal from './AddEditModal';
import DeleteModalComp from './DeleteModal';

export default function ListContainer() {
    const [items, setItems] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [modal, setModal] = useState({isOpen: false, mode: ''})
    const [deleteModal, setDeleteModal] = useState(false)
    const [inputs, setInputs] = useState({})
    const [editing, setEditing] = useState("")
    const [deleteId, setDeleteId] = useState("")

    useEffect(() => {
        fetchItems()
    }, [ modal, deleteId, editing ])

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
            setDeleteId("")
            // console.log("Resetting inputs and closing modal")
            // setInputs({})
            // setModal({
            //     isOpen:false
            // })
        })
    }

    function editItem(item) {
        console.log(`Editing item with uuid ${item.uuid}`)
        setInputs(item)

        let updatedItem = {
            uuid: item.uuid,
            name: item.name,
            description: item.description,
            amount: item.amount
        }
        fetch('http://localhost:8080/api/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
        })
        .then(data => {
            setEditing("")
            handleClose()
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
                    setEditing={setEditing}
                    setInputs={setInputs}
                    setDeleteModal={setDeleteModal}
                    setDeleteId={setDeleteId}
                />
                <AddEditModal 
                    inputs={inputs} 
                    mode={modal.mode} 
                    open={modal.isOpen} 
                    handleClose={handleClose} 
                    onChangeHandler={onChangeHandler} 
                    createNew={createNew}
                    editItem={editItem} 
                />
                <DeleteModalComp 
                deleteId={deleteId} 
                deleteItem={deleteItem} 
                setDeleteModal={setDeleteModal} 
                open={deleteModal} />
                </>
            )
        }
    </>
    )
}
