import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import AllRoutes from './routes/AllRoutes';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AllRoutes/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
