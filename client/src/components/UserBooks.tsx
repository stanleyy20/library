import { BooksData } from '../types/fetch';

import { BookBody, BooksDetails, Text, Title, UserButton } from './AllBooks';

type AllBooksProps = {
    userBooks: Array<BooksData>;
    returnBook: (event: React.SyntheticEvent) => Promise<void>;
};

export const UserBooks: React.FunctionComponent<AllBooksProps> = ({ userBooks, returnBook }) => {
    return (
        <>
            {userBooks?.map((book) => {
                return (
                    <BookBody key={book.isbn}>
                        <Title>{book.title}</Title>
                        <BooksDetails>
                            <Text>Author: {book.author}</Text>
                            <Text>ISBN: {book.isbn}</Text>
                            {
                                <UserButton data-issue-id={book._id} onClick={returnBook}>
                                    Return Book
                                </UserButton>
                            }
                        </BooksDetails>
                    </BookBody>
                );
            })}
        </>
    );
};
