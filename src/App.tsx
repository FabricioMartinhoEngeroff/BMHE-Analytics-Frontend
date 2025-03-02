import { GlobalStyles } from "./styles/GlobalStyles";
import { AppRoutes } from "./route/AppRoutes"; 
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  return (
    <AuthProvider> 
      <GlobalStyles />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
