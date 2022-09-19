export type UserData = {
    status: string;
    name: string;
    role: string;
    _id: string;
};

export type BooksData = {
    _id: string;
    isbn: number;
    title: string;
    author: string;
    available: boolean;
};

export type IssueData = {
    _id: string;
    user: string;
    book: string;
    returned: boolean;
};
