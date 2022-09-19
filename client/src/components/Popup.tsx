import styled from 'styled-components';

type PopupProps = {
    buttonText: string;
    formOnSubmit(event: React.SyntheticEvent): Promise<void>;
    changePopupVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    author: string;
    isbn: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setAuthor: React.Dispatch<React.SetStateAction<string>>;
    setIsbn: React.Dispatch<React.SetStateAction<string>>;
};

export const Popup: React.FunctionComponent<PopupProps> = ({
    buttonText,
    changePopupVisibility,
    formOnSubmit,
    author,
    isbn,
    setAuthor,
    setIsbn,
    setTitle,
    title,
}) => {
    return (
        <FormContainer>
            {' '}
            <Form onSubmit={(event: React.SyntheticEvent) => formOnSubmit(event)}>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' type='text' />
                <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='Author' type='text' />
                <Input value={isbn} onChange={(e) => setIsbn(e.target.value)} placeholder='ISBN' type='number' />

                <SubmitButton type='submit'>{buttonText}</SubmitButton>
                <BackButton onClick={() => changePopupVisibility(false)}>Back</BackButton>
            </Form>
        </FormContainer>
    );
};

export const FormContainer = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    background-color: #0000009e;
`;

export const Form = styled.form`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 250px;
    height: 35%;
    background-color: ${({ theme }) => theme.items_color};
    border-radius: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 15px;
    z-index: 100;
`;
export const Input = styled.input`
    background-color: ${({ theme }) => theme.background_color};
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: 0.6s;
`;
export const Button = styled.button`
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

export const SubmitButton = styled(Button)`
    background-color: ${({ theme }) => theme.background_color};
    color: white;
    width: 100%;
    height: 30px;
    padding: 0;
`;

export const BackButton = styled.div`
    color: white;
    width: 50%;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.background_color};
    cursor: pointer;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 20px;
    transition: 0.6s;

    &:hover {
        box-shadow: 0px 0px 0px 1px white;
    }
`;
