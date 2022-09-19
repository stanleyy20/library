import styled from 'styled-components';
import { BooksData } from '../types/fetch';
import { AdminButtons } from './AdminButtons';
import { Button } from './Popup';

type AllBooksProps = {
    allBooks: Array<BooksData>;
    deleteBook: (event: React.SyntheticEvent) => Promise<void>;
    handleOnClick: (event: React.SyntheticEvent) => void;
    borrowedBook: (event: React.SyntheticEvent) => Promise<void>;
    userType: string;
};

export const AllBooks: React.FunctionComponent<AllBooksProps> = ({
    allBooks,
    deleteBook,
    handleOnClick,
    borrowedBook,
    userType,
}) => {
    return (
        <>
            {allBooks?.map((book) => {
                return (
                    <BookBody key={book.isbn}>
                        <Title>{book.title}</Title>
                        <BooksDetails>
                            <Text>Author: {book.author}</Text>
                            <Text>ISBN: {book.isbn}</Text>
                            {book.available ? (
                                userType === 'admin' ? (
                                    <AdminButtons
                                        bookIsbn={book.isbn}
                                        bookID={book._id}
                                        handleOnClick={handleOnClick}
                                        deleteBook={deleteBook}
                                    />
                                ) : (
                                    <>
                                        <UserButton data-issue-id={book._id} onClick={borrowedBook}>
                                            Borrow a book
                                        </UserButton>
                                    </>
                                )
                            ) : (
                                'not available'
                            )}
                        </BooksDetails>
                    </BookBody>
                );
            })}
        </>
    );
};

export const BookBody = styled.div`
    display: flex;
    width: 80%;
    height: 300px;
    border-radius: 10px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.items_color};
    gap: 10px;
    padding: 20px 10px;

    @media screen and (min-width: 800px) {
        width: 45%;
    }

    @media screen and (min-width: 1100px) {
        width: 30%;
    }

    @media screen and (min-width: 1400px) {
        width: 22%;
    }
`;

export const Title = styled.h4`
    text-align: center;
`;

export const Text = styled.p`
    height: 20px;
    text-align: left;
    padding: 10px;
`;

export const BooksDetails = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    gap: 25px;
    justify-content: space-between;
    align-items: center;
`;

export const UserButton = styled(Button)`
    background-color: ${({ theme }) => theme.background_color};
    width: 80%;
`;
