import Consent from '../pages/consent-registration.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from '../pages/attendance-registration.jsx'; // Import your registration page component
import ConfirmationPage from '../pages/confirmation.jsx';
import PrivacyStatement from '../pages/data-privacy-statement.jsx';
import RegistrationGuard from './registration-guard.jsx';
import ConfirmationGuard from './confirmation-guard.jsx';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Other routes */}
                {/* OLD CODE: Registration page was directly accessible without passing through consent. */}
                {/* <Route path="/registration-page" element={<RegistrationPage />} /> */}

                {/* SECURITY UPDATE: Redirect direct visitors to the consent page first. */}
                <Route path="/registration-page" element={
                    <RegistrationGuard>
                        <RegistrationPage />
                    </RegistrationGuard>
                } />
                {/* OLD CODE: Anyone could open the confirmation page directly. */}
                {/* <Route path="/confirmation-page" element={<ConfirmationPage />} /> */}

                {/* SECURITY UPDATE: Only continue when successful registration created a receipt. */}
                <Route path="/confirmation-page" element={
                    <ConfirmationGuard>
                        <ConfirmationPage />
                    </ConfirmationGuard>
                } />
                <Route path="/privacy-statement" element={<PrivacyStatement />} />
                <Route path="/" element={<Consent />} /> {/* Define your main route */}
            </Routes>
        </Router>
    );
}

export default AppRoutes;
