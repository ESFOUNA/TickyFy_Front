import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import RoutesConfig from "./routes";

const App: React.FC = () => (
  <BrowserRouter>
    <Navbar />
    <RoutesConfig />
  </BrowserRouter>
);

export default App;