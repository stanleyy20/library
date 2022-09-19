import styled from 'styled-components';
import { VIEW } from './Dashboard';

type UserPanelProps = {
    setWhichListView: React.Dispatch<React.SetStateAction<number>>;
};

export const UserPanel: React.FunctionComponent<UserPanelProps> = ({ setWhichListView }) => {
    const { ALL, AVAILABLE_BOOKS, USER_BOOKS } = VIEW;

    return (
        <Container>
            <h3>User panel</h3>
            <Button onClick={() => setWhichListView(ALL)}>All books</Button>
            <Button onClick={() => setWhichListView(AVAILABLE_BOOKS)}>Available books</Button>
            <Button onClick={() => setWhichListView(USER_BOOKS)}>Show My books</Button>
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

export const FormContainer = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000025;
`;

export const Form = styled.form`
    display: flex;
    width: 250px;
    height: 35%;
    box-shadow: 3px 3px 31px 0px rgba(66, 68, 90, 1);
    border-radius: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    gap: 20px;
`;

const Button = styled.button`
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
