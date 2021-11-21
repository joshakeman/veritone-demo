import React from 'react'
import ListContainer from '../components/ListContainer'
import Container from '@mui/material/Container';

export default function Home() {
    return (
        <Container maxWidth="md" 
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                    }}>
            <ListContainer />
        </Container>
    )
}
