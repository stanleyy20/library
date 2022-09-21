import { useState } from 'react';
import styled from 'styled-components';
import { Container } from './TitlePage';

export const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function loginUser(event: React.SyntheticEvent) {
        event.preventDefault();
        const response = await fetch('http://localhost:1337/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if (data.user) {
            localStorage.setItem('token', data.user);
            alert('Login successful');
            window.location.href = '/dashboard';
        }

        if (!data.user) {
            alert('Please check your username and password');
            console.log(data);
        }
    }

    return (
        <Container>
            <Tile>Login</Tile>
            <Form onSubmit={loginUser}>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' type='email' />
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    type='password'
                />
                <Button type='submit' value='Login' />
            </Form>
        </Container>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;
const Input = styled.input`
    width: 80%;
    cursor: pointer;
    background-color: ${({ theme }) => theme.background_color};
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    transition: 0.6s;
    outline: none;
`;
const Tile = styled.h1``;

const Button = styled(Input)`
    &:hover {
        box-shadow: 0px 0px 0px 1px white;
    }
`;
