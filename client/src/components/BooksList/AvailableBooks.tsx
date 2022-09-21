import { BooksData } from '../../types/fetch';

import { BookBody, BooksDetails, Text, Title, UserButton } from './AllBooks';

type AllBooksProps = {
    availableBooks: Array<BooksData>;
    deleteBook: (event: React.SyntheticEvent) => Promise<void>;
    handleOnClick: (event: React.SyntheticEvent) => void;
    borrowedBook: (event: React.SyntheticEvent) => Promise<void>;
    userType: string;
};

export const AvailableBooks: React.FunctionComponent<AllBooksProps> = ({
    availableBooks,
    deleteBook,
    handleOnClick,
    borrowedBook,
    userType,
}) => {
    return (
        <>
            {availableBooks?.map((book) => {
                return (
                    <BookBody key={book.isbn}>
                        <Title>{book.title}</Title>
                        <BooksDetails>
                            <Text>Author: {book.author}</Text>
                            <Text>ISBN: {book.isbn}</Text>
                            {book.available ? (
                                userType === 'admin' ? null : (
                                    <>
                                        <UserButton data-issue-id={book.book_id} onClick={borrowedBook}>
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
