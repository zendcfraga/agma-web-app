import { Navigate, useLocation } from 'react-router-dom';

// SECURITY UPDATE: Do not show the registration page unless the visitor came from the consent page.
// This is only a screen guard; Reg.php still performs the real security check.
function REGISTRATIONGUARD({ children }) {
    const registrationIntent = sessionStorage.getItem('registration_intent');
    const location = useLocation(); // SECURITY UPDATE: Typed URLs and page refreshes have no consent navigation marker.
    const cameFromConsent = location.state?.fromConsent === true;

    if (!registrationIntent || !cameFromConsent) {
        sessionStorage.removeItem('registration_intent'); // SECURITY UPDATE: Remove stale permission when flow is bypassed.
        return <Navigate to="/" replace />;
    }

    return children;
}

export default REGISTRATIONGUARD;
