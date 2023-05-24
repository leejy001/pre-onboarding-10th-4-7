import { ThemeProvider } from 'styled-components';
import Theme from './styles/theme';
import GlobalStyles from './styles/globalStyle';
import { TodoProvider } from './context/TodoProvider';
import { SearchProvider } from './context/SearchProvider';
import Main from './pages/Main';

const App = () => {
  return (
    <TodoProvider>
      <SearchProvider>
        <ThemeProvider theme={Theme}>
          <GlobalStyles />
          <Main />
        </ThemeProvider>
      </SearchProvider>
    </TodoProvider>
  );
};

export default App;
