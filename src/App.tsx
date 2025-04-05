import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import RoutesConfig from "./routes";

const App = () => (
  <BrowserRouter>
    <Navbar />
    <RoutesConfig />
  </BrowserRouter>
);

export default App;
