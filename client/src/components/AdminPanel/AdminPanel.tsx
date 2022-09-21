import { useState } from 'react';

import styled from 'styled-components';
import { VIEW } from '../Dashboard';
import { Popup } from '../Popup';

type AdminPanelProps = {
    getAllBooks(): Promise<void>;
    setWhichListView: React.Dispatch<React.SetStateAction<number>>;
};

export const AdminPanel: React.FunctionComponent<AdminPanelProps> = ({ setWhichListView, getAllBooks }) => {
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [isbn, setIsbn] = useState<string>('');
    const [addBooksPopup, setAddBooksPopup] = useState<boolean>(false);

    async function addBook(event: React.SyntheticEvent) {
        event.preventDefault();
        const response = await fetch('http://localhost:1337/api/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                author,
                isbn,
            }),
        });

        const data = await response.json();

        if (data.status === 'ok') {
            alert('add book successful');
            setTitle('');
            setAuthor('');
            setIsbn('');
            getAllBooks();
        }

        if (data.status !== 'ok') {
            alert('Not all information');
        }
        setAddBooksPopup(false);
    }

    const handleOnClick = () => {
        setAddBooksPopup(true);
    };

    const { ALL, AVAILABLE_BOOKS } = VIEW;

    return (
        <Container>
            <h3>Administration panel</h3>
            <Button onClick={handleOnClick}>Add Books</Button>
            <Button onClick={() => setWhichListView(AVAILABLE_BOOKS)}>Available books</Button>
            <Button onClick={() => setWhichListView(ALL)}>All books</Button>
            {addBooksPopup && (
                <Popup
                    buttonText='Add'
                    changePopupVisibility={setAddBooksPopup}
                    formOnSubmit={addBook}
                    author={author}
                    title={title}
                    isbn={isbn}
                    setAuthor={setAuthor}
                    setIsbn={setIsbn}
                    setTitle={setTitle}
                />
            )}
        </Container>
    );
};

const Container = styled.div`
    padding: 10px;
    display: flex;
    gap: 20px;
    flex-direction: column;

    @media screen and (min-width: 650px) {
        width: 20%;
    }
`;

export const Button = styled.button`
    background-color: ${({ theme }) => theme.items_color};
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: 0.6s;

    &:hover {
        box-shadow: 0px 0px 0px 1px white;
    }
`;
