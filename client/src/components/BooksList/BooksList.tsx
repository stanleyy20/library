/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { VIEW } from '../Dashboard';
import { Popup } from '../Popup';

import { BooksData, IssueData } from '../../types/fetch';
import { UserBooks } from './UserBooks';
import { AvailableBooks } from './AvailableBooks';
import { AllBooks } from './AllBooks';

type BooksListProps = {
    setAllBooks: React.Dispatch<React.SetStateAction<Array<BooksData>>>;
    setUserBooks: React.Dispatch<React.SetStateAction<Array<BooksData>>>;
    setAvailableBooks: React.Dispatch<React.SetStateAction<Array<BooksData>>>;
    setWhichListViews: React.Dispatch<React.SetStateAction<number>>;
    getAllBooks(): Promise<void>;
    getBorrowedBook(): Promise<void>;
    allBooks: Array<BooksData>;
    userBooks: Array<BooksData>;
    availableBooks: Array<BooksData>;
    issue: Array<IssueData>;
    userType: string;
    userID: string;
    whichListView: number;
    userRole: string;
};

export const BooksList: React.FunctionComponent<BooksListProps> = ({
    userType,
    userID,
    whichListView,
    issue,
    allBooks,
    availableBooks,
    getAllBooks,
    setAllBooks,
    setAvailableBooks,
    setUserBooks,
    userBooks,
    getBorrowedBook,
    userRole,
}) => {
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [isbn, setIsbn] = useState<string>('');
    const [editBookId, setEditBookId] = useState<string | null>(null);
    const [editPopup, setEditPopup] = useState<boolean>(false);

    const { ALL, AVAILABLE_BOOKS, USER_BOOKS } = VIEW;

    const returnBook = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const bookID = event.currentTarget.getAttribute('data-issue-id');
        const response = await fetch(`http://localhost:1337/api/issue/${bookID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookID,
                userRole,
            }),
        });

        const data = await response.json();

        if (data.status === 'ok') {
            availabilityChange(event, bookID, true);
            alert('return book successful');
            getBorrowedBook();
        }
    };

    const deleteBook = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const id = event.currentTarget.getAttribute('data-delete-id');
        const response = await fetch(`http://localhost:1337/api/book/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                userRole,
            }),
        });

        const data = await response.json();

        if (data.status === 'ok') {
            alert('delete book successful');
            getAllBooks();
        }
    };

    const editBook = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:1337/api/book/${editBookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                editBookId,
                title,
                author,
                isbn,
                userRole,
            }),
        });

        const data = await response.json();

        if (data.status === 'ok') {
            alert('edit book successful');
            setEditPopup(false);
            setTitle('');
            setAuthor('');
            setIsbn('');
            getAllBooks();
            setAllBooks(allBooks);
        }

        if (data.status !== 'ok') {
            alert('Not all information');
        }
    };

    const borrowedBook = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const bookID = event.currentTarget.getAttribute('data-issue-id');
        const response = await fetch('http://localhost:1337/api/issue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID,
                bookID,
                userRole,
            }),
        });

        const data = await response.json();

        if (data.status === 'ok') {
            alert('borrow book successful');
            availabilityChange(event, bookID, false);
            getAllBooks();
        }
    };

    const availabilityChange = async (event: React.SyntheticEvent, bookID: any, available: boolean) => {
        event.preventDefault();
        await fetch(`http://localhost:1337/api/available/${bookID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookID,
                available,
                userRole,
            }),
        });
    };

    const changeBooksList = async () => {
        if (whichListView === ALL) {
            setAllBooks(allBooks);
        }
        if (whichListView === AVAILABLE_BOOKS) {
            const tempBooks = allBooks?.filter((allBooks) => allBooks.available === 'true');
            setAvailableBooks(tempBooks);
        }
        if (whichListView === USER_BOOKS) {
            const userBooks = issue?.filter((issue) => issue.user_id === userID);
            console.log(issue);
            const tempBooks = userBooks?.map((userBook) => {
                return allBooks.filter((userBok) => userBook.book_id === userBok.book_id);
            });
            setUserBooks(tempBooks.flat());
        }
    };

    const handleOnClick = (event: React.SyntheticEvent) => {
        setEditBookId(event.currentTarget.getAttribute('data-edit-id'));
        setEditPopup(true);
    };

    useEffect(() => {
        changeBooksList();
    }, [whichListView]);

    return (
        <Container>
            {whichListView === USER_BOOKS && <UserBooks returnBook={returnBook} userBooks={userBooks} />}
            {whichListView === AVAILABLE_BOOKS && (
                <AvailableBooks
                    availableBooks={availableBooks}
                    borrowedBook={borrowedBook}
                    deleteBook={deleteBook}
                    handleOnClick={handleOnClick}
                    userType={userType}
                />
            )}
            {whichListView === ALL && (
                <AllBooks
                    allBooks={allBooks}
                    borrowedBook={borrowedBook}
                    deleteBook={deleteBook}
                    handleOnClick={handleOnClick}
                    userType={userType}
                />
            )}

            {editPopup && (
                <Popup
                    buttonText='Edit'
                    changePopupVisibility={setEditPopup}
                    formOnSubmit={editBook}
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
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: space-evenly;
    align-items: center;
`;
