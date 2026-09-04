import { Navigate } from 'react-router-dom';

// SECURITY UPDATE: Only a successful registration can create this receipt.
// Api.php still checks the receipt, so changing sessionStorage cannot reveal Zoom details.
function CONFIRMATIONGUARD({ children }) {
    const registrationReceipt = sessionStorage.getItem('registration_receipt');

    if (!registrationReceipt) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default CONFIRMATIONGUARD;
