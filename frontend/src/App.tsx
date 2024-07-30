import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return <QueryClientProvider client={queryClient}>Hello</QueryClientProvider>;
}

export default App;
