export type UserData = {
    status: string;
    name: string;
    role: string;
    user_id: string;
};

export type BooksData = {
    book_id: string;
    isbn: number;
    title: string;
    author: string;
    available: string;
};

export type IssueData = {
    book: string;
    id: string;
    user_id: string;
    book_id: string;
    returned: boolean;
};
