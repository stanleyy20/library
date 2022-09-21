import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from './TitlePage';

export const Registry = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<string>('user');

    const navigate = useNavigate();

    async function registerUser(event: React.SyntheticEvent) {
        event.preventDefault();
        const response = await fetch('http://localhost:1337/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                role,
            }),
        });

        const data = await response.json();
        console.log(data);

        if (data.status === 'ok') {
            alert('Create account successful');
            navigate('/login');
        }

        if (data.status !== 'ok') {
            alert('This email has benn used');
        }
    }

    return (
        <BiggerContainer>
            <Tile>Registry</Tile>
            <Form onSubmit={(event: React.SyntheticEvent) => registerUser(event)}>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' type='text' />
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' type='email' />
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    type='password'
                />
                <Select id='role' onChange={(e) => setRole(e.target.value)}>
                    <option value='user'>User</option>
                    <option value='admin'>Admin</option>
                </Select>
                <Button type='submit' value='Registry' />
            </Form>
        </BiggerContainer>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 20px;
`;

const BiggerContainer = styled(Container)`
    height: 45%;
    padding: 20px 10px;
`;

const Input = styled.input`
    width: 100%;
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

const Select = styled.select`
    width: 100%;
    cursor: pointer;
    background-color: ${({ theme }) => theme.background_color};
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    transition: 0.6s;
    outline: none;
`;
