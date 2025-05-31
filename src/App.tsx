import LoginForm from "./components/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                {/*<Route path="/search" element={<SearchPage />} /> */}
            </Routes>
            <LoginForm></LoginForm>
        </Router>
    );
}

export default App;
