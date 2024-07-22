
import { Provider } from './Provider'
import { AuthProvider } from '../context/AuthContext';
import { Router } from './Router';

function App() {
  
  
  return (
      <AuthProvider>
        <Provider>
          <Router />
        </Provider>
      </AuthProvider>
  )
};

export default App
