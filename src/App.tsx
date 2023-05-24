import { ThemeProvider } from 'styled-components';
import Theme from './styles/theme';
import GlobalStyles from './styles/globalStyle';
import { TodoProvider } from './context/TodoProvider';
import Main from './pages/Main';

const App = () => {
  return (
    <TodoProvider>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Main />
      </ThemeProvider>
    </TodoProvider>
  );
};

export default App;
