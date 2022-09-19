import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const TitlePage = () => {
    return (
        <Container>
            <StyledLink to='/login'>Sing in</StyledLink>
            <p>or</p>
            <StyledLink to='/registry'>Create new account</StyledLink>
        </Container>
    );
};

export const Container = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 250px;
    min-height: 35%;
    background-color: ${({ theme }) => theme.items_color};
    border-radius: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;
const StyledLink = styled(NavLink)`
    text-decoration: none;
    transition: 0.6s;

    &:hover {
        text-decoration: underline;
    }
`;
