import LoginForm from "./components/LoginForm";
import SearchPage from "./components/SearchPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
    return (
        <Router basename="/fetch-frontend-take-home">
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
        </Router>
    );
}

export default App;
