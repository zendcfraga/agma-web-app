import Consent from '../pages/consent-registration.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from '../pages/attendance-registration.jsx'; // Import your registration page component
import ConfirmationPage from '../pages/confirmation.jsx';
import PrivacyStatement from '../pages/data-privacy-statement.jsx';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Other routes */}
                <Route path="/registration-page" element={<RegistrationPage />} />
                <Route path="/confirmation-page" element={<ConfirmationPage />} />
                <Route path="/privacy-statement" element={<PrivacyStatement />} />
                <Route path="/" element={<Consent />} /> {/* Define your main route */}
            </Routes>
        </Router>
    );
}

export default AppRoutes;