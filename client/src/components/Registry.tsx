import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { Container } from './TitlePage';

interface FormData {
    name: string;
    email: string;
    password: string;
    role: string;
}

interface Validation {
    error: boolean;
    message: string;
}

export const Registry = () => {
    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });

    const [validation, setValidation] = useState<Validation>({
        error: false,
        message: '',
    });

    const { email, name, password, role } = form;
    const { error, message } = validation;

    const updateField = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(form);
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const selectRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(form);
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const navigate = useNavigate();

    async function registerUser(event: React.SyntheticEvent) {
        event.preventDefault();
        formValidation();
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

        if (data.status === 'ok') {
            setValidation({
                error: true,
                message: 'Create account successful',
            });

            setTimeout(() => {
                navigate('/login');
            }, 5000);
        }

        if (data.status === 'error') {
            setValidation({
                error: true,
                message: 'This email already exists',
            });
        }
    }

    const formValidation = () => {
        if (!email || !name || password) {
            setValidation({
                error: true,
                message: 'Not all information',
            });
            return;
        }

        setValidation({
            error: false,
            message: '',
        });
        return;
    };

    return (
        <BiggerContainer>
            <Tile>Registry</Tile>
            <Form onSubmit={(event: React.SyntheticEvent) => registerUser(event)}>
                <Input value={name} onChange={(e) => updateField(e)} placeholder='Name' type='text' name='name' />
                <Input value={email} onChange={(e) => updateField(e)} placeholder='Email' type='email' name='email' />
                <Input
                    value={password}
                    onChange={(e) => updateField(e)}
                    placeholder='Password'
                    type='password'
                    name='password'
                />
                <Select id='role' onChange={(e) => selectRole(e)} name='role'>
                    <option value='user'>User</option>
                    <option value='admin'>Admin</option>
                </Select>
                <Button type='submit' value='Registry' />
            </Form>
            {error && (
                <ErrorContainer>
                    <ErrorMessage>{message}</ErrorMessage>
                </ErrorContainer>
            )}
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
    min-height: 45%;
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

const ErrorMessage = styled.p`
    color: black;
`;
const ErrorContainer = styled.div`
    padding: 10px;
    border-radius: 10px;
    width: 95%;
    background-color: #fcb7bd;
    text-align: center;
`;
