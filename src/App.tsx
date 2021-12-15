import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'
import RoutesComponent from './routes';
import "./ui/styles/styles.css"
import theme from './ui/themes/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <RoutesComponent />
          </AuthProvider>
        </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;