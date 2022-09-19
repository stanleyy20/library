import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Dashboard } from '../components/Dashboard';
import { Login } from '../components/Login';
import { Registry } from '../components/Registry';
import { TitlePage } from '../components/TitlePage';
import { ThemeProvider } from 'styled-components';
import { DarkTheme } from '../styles/theme';

function App() {
    return (
        <ThemeProvider theme={DarkTheme}>
            <Container>
                <Routes>
                    <Route path='/' element={<TitlePage />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/registry' element={<Registry />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
            </Container>
        </ThemeProvider>
    );
}

export default App;

const Container = styled.div`
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: center;
    font-family: Arial;
    margin: 0 auto;
`;
