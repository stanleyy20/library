import styled from 'styled-components';
import { Button } from './Popup';

type AdminButtonsProps = {
    bookID: string;
    bookIsbn: number;
    deleteBook: (event: React.SyntheticEvent) => Promise<void>;
    handleOnClick: (event: React.SyntheticEvent) => void;
};

export const AdminButtons: React.FunctionComponent<AdminButtonsProps> = ({
    bookID,
    bookIsbn,
    deleteBook,
    handleOnClick,
}) => {
    return (
        <>
            <StyledButton data-delete-id={bookID} onClick={deleteBook}>
                delete
            </StyledButton>
            <StyledButton data-edit-id={bookIsbn} onClick={(event) => handleOnClick(event)}>
                edit
            </StyledButton>
        </>
    );
};

const StyledButton = styled(Button)`
    background-color: ${({ theme }) => theme.background_color};
    width: 80%;
`;
