import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BooksData, IssueData, UserData } from '../types/fetch';

import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { AdminPanel } from './AdminPanel';
import { BooksList } from './BooksList';
import { UserPanel } from './UserPanel';

export const VIEW = {
    ALL: 1,
    USER_BOOKS: 2,
    AVAILABLE_BOOKS: 3,
};

export const Dashboard = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState<string>('');
    const [userRole, setUserRole] = useState<string>('');
    const [userID, setUserID] = useState<string>('');
    const [allBooks, setAllBooks] = useState<Array<BooksData>>([]);
    const [userBooks, setUserBooks] = useState<Array<BooksData>>([]);
    const [availableBooks, setAvailableBooks] = useState<Array<BooksData>>([]);
    const [issue, setIssue] = useState<Array<IssueData>>([]);
    const [whichListView, setWhichListViews] = useState<number>(VIEW.ALL);

    async function authUser() {
        const req = await fetch('http://localhost:1337/api/user', {
            method: 'GET',
            headers: {
                'x-access-token': String(localStorage.getItem('token')),
            },
        });

        const data: Promise<UserData> = req.json();

        if ((await data).status === 'ok') {
            setUserName((await data).name);
            setUserRole((await data).role);
            setUserID((await data)._id);
        }
    }

    async function getAllBooks() {
        await fetch('http://localhost:1337/api/all-books', {
            method: 'GET',
        })
            .then((response) => {
                if (response.ok) {
                    return response;
                }
                throw response;
            })
            .then((response) => response.json())
            .then((booksData) => setAllBooks(booksData))
            .catch(() => {
                console.error('błąd wczytywania danych, spróbuj ponownie');
            });
    }

    async function getBorrowedBooks() {
        await fetch('http://localhost:1337/api/borrowed-books', {
            method: 'GET',
        })
            .then((response) => {
                if (response.ok) {
                    return response;
                }
                throw response;
            })
            .then((response) => response.json())
            .then((issueData) => setIssue(issueData))
            .catch(() => {
                console.error('błąd wczytywania danych, spróbuj ponownie');
            });
    }

    const deleteBook = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const id = event.currentTarget.getAttribute('data-delete-id');
        const response = await fetch('http://localhost:1337/api/book', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
            }),
        });

        const data = await response.json();

        if (data.status === 'ok') {
            alert('delete book successful');
            getAllBooks();
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwtDecode(token);
            console.log(user);
            if (!user) {
                navigate('/login');
                localStorage.removeItem('token');
            }
            if (user) {
                authUser();
            }
            getAllBooks();
            getBorrowedBooks();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <h1 style={{ paddingLeft: '10px', paddingBottom: '50px' }}>Hello {userName}</h1>
            <Section>
                {userRole === 'admin' ? (
                    <AdminPanel setWhichListView={setWhichListViews} getAllBooks={getAllBooks} />
                ) : null}
                {userRole === 'user' ? <UserPanel setWhichListView={setWhichListViews} /> : null}
                <BooksList
                    userID={userID}
                    getAllBooks={getAllBooks}
                    allBooks={allBooks}
                    userType={userRole}
                    whichListView={whichListView}
                    issue={issue}
                    deleteBook={deleteBook}
                    setAllBooks={setAllBooks}
                    availableBooks={availableBooks}
                    setAvailableBooks={setAvailableBooks}
                    setUserBooks={setUserBooks}
                    userBooks={userBooks}
                    setWhichListViews={setWhichListViews}
                />
            </Section>
        </Container>
    );
};

const Container = styled.div`
    width: 85%;
    margin: 0 auto;
    padding-top: 40px;
    padding-bottom: 40px;
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 50px;

    @media screen and (min-width: 650px) {
        flex-direction: row;
    }
`;
