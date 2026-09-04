// SECURITY UPDATE: Keep the old import visible for reference; requests now use the shared VITE_API_BASE_URL client.
// import axios from 'axios';
import swal from 'sweetalert2';
//import { Routes, Route } from 'react-router-dom';
import Header from '../static/header';
import Footer from '../static/footer';
import api from '../api/client';
import ProgressSteps from '../static/progress-steps';

//import Confirmation from './confirmation.jsx';

import { useState, useEffect } from "react";


function REGISTRATION() {

    // SECURITY UPDATE: Never use a token embedded in React as a secret; every visitor can read it.
    // var token = 'OLD_BROWSER_TOKEN_REMOVED';

    const [loading, setLoading] = useState(false); // State variable for loading
    const [town, setTown] = useState([]);
    const [brgy, getBrgyList] = useState([]);
    const [civilStatus, setCivilStatus] = useState([]);

    function calculateAge(birthdate) {
        const today = new Date();
        const dob = new Date(birthdate);
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    }

    function handleCivilStatusChange(event) {
        const selectedCivilStatus = event.target.value;
        const spouseInput = document.getElementsByName("inp_spouse")[0];

        if (selectedCivilStatus === "MARRIED") {
            spouseInput.setAttribute("required", "required");
        } else {
            spouseInput.removeAttribute("required");
        }
    }

    const handleBirthdateChange = (event) => {
        const birthdate = event.target.value;
        const age = calculateAge(birthdate);
        event.target.form.elements.inp_age.value = age;
    }

    /* OLD CODE: Sent the browser token and used a hard-coded production URL.
    function townList() {
        axios({
            method: 'POST',
            url: 'https://agma-api.aselco.dev/index.php/api/town-list', // 'http://127.0.0.1/aselco-agma/agma-api/index.php/api/town-list'
            data: {
                TOKEN: token
            }

        }).then(function (response) {
            setTown(response.data);
        });
    } */

    // SECURITY UPDATE: Towns are public form choices, so request them without a browser credential.
    async function townList() {
        try{
            const response = await api.get('/api/town-list'); // Uses the existing local VITE_API_BASE_URL.
            setTown(response.data);
        }catch(error){
            console.error('Unable to load towns.');
            setTown([]);
        }
    }

    /* OLD CODE: Sent the browser token and used a hard-coded production URL.
    function civilList() {
        axios({
            method: 'POST',
            url: 'https://agma-api.aselco.dev/index.php/api/civil-status-list',
            data: {
                TOKEN: token
            }

        }).then(function (response) {
            setCivilStatus(response.data);
        });
    } */

    // SECURITY UPDATE: Civil statuses are public form choices, so use a simple GET request.
    async function civilList() {
        try{
            const response = await api.get('/api/civil-status-list'); // Uses the existing local VITE_API_BASE_URL.
            setCivilStatus(response.data);
        }catch(error){
            console.error('Unable to load civil statuses.');
            setCivilStatus([]);
        }
    }

    // SECURITY UPDATE: Check again when the form opens because users can leave a page open until after cutoff.
    async function verifyRegistrationIsOpen() {
        try{
            const response = await api.get('/api/cut-off');

            if (response.data.status !== 'ok') {
                sessionStorage.removeItem('registration_intent');
                window.location.replace('/');
            }
        }catch(error){
            // SECURITY UPDATE: If the API cannot confirm registration is open, fail safely and return to consent.
            sessionStorage.removeItem('registration_intent');
            window.location.replace('/');
        }
    }

    /* OLD CODE: Included the readable browser token in the barangay request.
    function handleTownChange(event) {
        setLoading(true);
        const selectedTownCode = event.target.value;
        axios({
            method: 'POST',
            url: 'https://agma-api.aselco.dev/index.php/api/brgy-list',
            data: {
                TOKEN: token,
                TOWN_CODE: selectedTownCode,
                REQUEST: "web"
            }

        }).then(function (response) {
            //console.log(response.data);
            getBrgyList(response.data);
            setLoading(false);
        });
    } */

    // SECURITY UPDATE: Send only the town value needed by the API and always clear the loading state.
    async function handleTownChange(event) {
        setLoading(true);
        const selectedTownCode = event.target.value;

        try{
            const response = await api.post('/api/brgy-list', {
                TOWN_CODE: selectedTownCode,
                REQUEST: 'web' // Kept so the request remains easy to identify in your existing API style.
            });
            getBrgyList(response.data);
        }catch(error){
            console.error('Unable to load barangays.');
            getBrgyList([]);
        }finally{
            setLoading(false);
        }
    }

    const saveRegistration = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to false after response

        // SECURITY UPDATE: The API will also validate this value; this check only gives a clearer browser flow.
        const registrationIntent = sessionStorage.getItem('registration_intent');

        if (!registrationIntent) {
            setLoading(false);
            window.location.replace('/');
            return;
        }

        const town = event.target.inp_town.value;
        const accountno = event.target.inp_accountno.value.toUpperCase();
        const contactno = event.target.inp_contact.value.toUpperCase();
        const comments = event.target.inp_comments.value;
        const lname = event.target.inp_lname.value.toUpperCase();
        const fname = event.target.inp_fname.value.toUpperCase();
        const middle = event.target.inp_middle.value.toUpperCase();
        const spouse = event.target.inp_spouse.value.toUpperCase();
        const purok = event.target.inp_purok.value.toUpperCase();
        const brgy = event.target.inp_brgy.value.toUpperCase();
        const bdate = event.target.inp_birthdate.value.toUpperCase();
        const age = event.target.inp_age.value.toUpperCase();
        const unqid = event.target.inp_accountno.value.toUpperCase();
        const civil_status = event.target.inp_civil_status.value.toUpperCase();
        /* OLD CODE: Sent a browser-readable token and bypassed VITE_API_BASE_URL.
        axios({
            method: 'POST',
            url: 'https://agma-api.aselco.dev/index.php/reg/attendance-registration-online',
            data: {
                TOKEN: token,
                UNQ_ID: unqid,
                ACCOUNT_NO: accountno,
                TOWN: town,
                CONTACT_NO: contactno,
                VENUE: "online",
                REG_MODE: "online",
                COMMENTS: comments,
                LASTNAME: lname,
                FIRSTNAME: fname,
                MIDDLE: middle,
                SPOUSE: spouse,
                PUROK: purok,
                BRGY: brgy,
                BIRTHDATE: bdate,
                AGE: age,
                MEMBER_NO: "",
                AREA: "online",
                CIVIL_STATUS: civil_status
            }

        }).then(function (response) {
            // Clear input fields after successful registration
            if (response.data.status === "success!") {
                //event.target.reset();
                window.location.href = '/confirmation-page';
            } else {
                swal.fire({
                    title: "Registration failed!",
                    text: response.data.message,
                    icon: response.data.status
                });
            }
            setLoading(false);
        }); */

        // SECURITY UPDATE: Public registration is protected on the API by validation/rate controls, not a visible token.
        try{
            const response = await api.post('/reg/attendance-registration-online', {
                REGISTRATION_INTENT: registrationIntent, // SECURITY UPDATE: Proves consent was recorded before submission.
                UNQ_ID: unqid,
                ACCOUNT_NO: accountno,
                TOWN: town,
                CONTACT_NO: contactno,
                VENUE: 'online',
                REG_MODE: 'online',
                COMMENTS: comments,
                LASTNAME: lname,
                FIRSTNAME: fname,
                MIDDLE: middle,
                SPOUSE: spouse,
                PUROK: purok,
                BRGY: brgy,
                BIRTHDATE: bdate,
                AGE: age,
                MEMBER_NO: '',
                AREA: 'online',
                CIVIL_STATUS: civil_status
            });

            if (response.data.status === 'success!') {
                // SECURITY UPDATE: The API returns this only after the attendee record is saved successfully.
                sessionStorage.setItem('registration_receipt', response.data.registration_receipt);
                sessionStorage.removeItem('registration_intent'); // SECURITY UPDATE: Do not reuse a successful one-use permission.
                window.location.href = '/confirmation-page';
            }else{
                swal.fire({
                    title: 'Registration failed!',
                    text: response.data.message,
                    icon: 'error'
                });
            }
        }catch(error){
            if (error.response?.status === 403) {
                // SECURITY UPDATE: Remove expired/used permission so the visitor must agree again.
                sessionStorage.removeItem('registration_intent');
            }

            swal.fire({
                title: 'Registration failed!',
                text: error.response?.data?.message || 'Unable to submit registration. Please try again.',
                icon: 'error'
            });
        }finally{
            setLoading(false); // SECURITY UPDATE: Also stop loading when the API/network returns an error.
        }
    }

    useEffect(() => {
        verifyRegistrationIsOpen(); // SECURITY UPDATE: Do not leave the form usable when registration is closed.
        townList();
        civilList();
    }, []);

    return (
        <div className="container-fluid">

            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12">
                                    <Header />
                                    <ProgressSteps currentStep={2} />
                                    <div className="card page-card">
                                        <div className="card-body">
                                            <div className="card-header page-card-header">
                                                <h1 className="card-title-color page-title">Attendance Registration</h1>
                                            </div>
                                            <center>
                                                <p className="notice-box">
                                                    <i>
                                                        <small>Zoom Meeting invitation details and link will be provided after submitting your registration.</small>
                                                    </i>
                                                </p>
                                            </center>
                                            <div className="row">
                                                <form autoComplete="off" onSubmit={saveRegistration}>
                                                    {/*PERSONAL DETAILS-------------------------------------------------------------------------------------*/}
                                                    <div className="form-section-heading">
                                                        <h2>Personal information</h2>
                                                        <p>Enter your name exactly as it appears on your official records.</p>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                LAST NAME<b className="text-danger">*</b>
                                                            </strong>
                                                            <input name="inp_lname" type="text" className="form-control mb-2 mt-1" required autoComplete="family-name" placeholder="Enter last name" aria-label="Last name" />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                FIRST NAME<b className="text-danger">*</b>
                                                            </strong>
                                                            <input name="inp_fname" type="text" className="form-control mb-2 mt-1" required autoComplete="given-name" placeholder="Enter first name" aria-label="First name" />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                MIDDLE NAME <b className="text-danger">*</b>
                                                            </strong>
                                                            <input name="inp_middle" type="text" className="form-control mt-1" required autoComplete="additional-name" placeholder="Enter middle name" aria-label="Middle name" />
                                                        </div>
                                                    </div>

                                                    {/*ADDRESS-------------------------------------------------------------------------------------*/}
                                                    <div className="form-section-heading">
                                                        <h2>Address information</h2>
                                                        <p>Select your municipality and barangay, then enter your purok or sitio.</p>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                MUNICIPALITY/CITY <b className="text-danger">*</b>
                                                            </strong>

                                                            <select name="inp_town" onChange={handleTownChange} className="form-control mt-2" required style={{ cursor: 'pointer' }} aria-label="Municipality or city">
                                                                <option value=""> -- SELECT MUNICIPALITY/CITY --</option>
                                                                {town.map(app => (
                                                                    <option key={app.data_num} value={app.data_town_code}>{app['data_town_name'].toUpperCase()}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                BARANGAY<b className="text-danger">*</b>
                                                            </strong>
                                                            <select name="inp_brgy" className="form-control mt-2" required disabled={loading} aria-label="Barangay">
                                                                <option value=""> -- SELECT BARANGAY --</option>
                                                                {brgy.map(app => (
                                                                    <option key={app.data_num} value={app.data_brgy_code}>{app['data_brgy_name'].toUpperCase()}</option>
                                                                ))}
                                                            </select>

                                                        </div>
                                                        <div className="col-md-4">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                PUROK/SITIO<b className="text-danger">*</b>
                                                            </strong>
                                                            <input name="inp_purok" type="text" className="form-control mb-2 mt-1" required autoComplete="address-line2" placeholder="Enter purok or sitio" aria-label="Purok or sitio" />
                                                        </div>
                                                    </div>
                                                    {/*CONTACT DETAILS and OTHER DETAILS-------------------------------------------------------------------------------------*/}
                                                    <div className="form-section-heading">
                                                        <h2>Account and contact information</h2>
                                                        <p>Your billing account number can be found on your electric bill.</p>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="col-md-4">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                ACTIVE CONTACT/GCASH NO. <b className="text-danger">*</b>
                                                            </strong>
                                                            <input name="inp_contact" type="tel" inputMode="tel" className="form-control mb-2 mt-1" required autoComplete="tel" placeholder="Example: 09XXXXXXXXX" aria-label="Active contact or GCash number" />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                BILLING ACCOUNT NO. <b className="text-danger">*</b>
                                                            </strong>
                                                            <input name="inp_accountno" type="text" inputMode="numeric" className="form-control mb-2 mt-1" required autoComplete="off" placeholder="Enter billing account number" aria-label="Billing account number" />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                BIRTHDATE <b className="text-danger">*</b>
                                                            </strong>
                                                            <input name="inp_birthdate" type="date" className="form-control mt-1" required autoComplete="bday" onChange={handleBirthdateChange} aria-label="Birthdate" />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                AGE <b className="text-danger">*</b>
                                                            </strong>
                                                            <input name="inp_age" type="number" className="form-control mt-1" required readOnly placeholder="Age" aria-label="Calculated age" />
                                                        </div>
                                                    </div>

                                                    {/*STATUS DETAILS-------------------------------------------------------------------------------------*/}
                                                    <div className="form-section-heading">
                                                        <h2>Additional information</h2>
                                                        <p>Provide your civil status and optional comments.</p>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="col-md-4">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                CIVIL STATUS <b className="text-danger">*</b>
                                                            </strong>
                                                            <select name="inp_civil_status" onChange={handleCivilStatusChange} className="form-control mt-2" required aria-label="Civil status">
                                                                <option value=""> -- SELECT CIVIL STATUS --</option>
                                                                {civilStatus.map(app => (
                                                                    <option key={app.data_num} value={app.data_civil_desc}>{app['data_civil_desc'].toUpperCase()}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                SPOUSE NAME <i>(if married)</i>
                                                            </strong>
                                                            <input name="inp_spouse" type="text" className="form-control mt-1" autoComplete="off" placeholder="Enter spouse name if married" aria-label="Spouse name" />
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className="col-md-12">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                MESSAGE
                                                            </strong>
                                                            <textarea name="inp_comments" className="form-control mt-1" rows="3" placeholder="Enter optional suggestions or comments" aria-label="Message or comments"></textarea>
                                                        </div>
                                                    </div>

                                                    {/*BUTTONS : SUBMIT / CLEAR */}
                                                    <div className="col-md-12">
                                                        <hr />
                                                        <center>
                                                            <p>
                                                                <small>
                                                                    <i>
                                                                        Notice: By submitting, you understand that your participation in this registration process is voluntary. ASELCO is not responsible for any inaccurate or
                                                                        wrong entries in the data you have provided such as but not limited to errors in billing account number, personal information and any other data herein provided.
                                                                    </i>
                                                                </small>
                                                            </p>
                                                        </center>
                                                        <br />
                                                        <center>
                                                            <button id="btn_submit" className="btn btn-success primary-action" disabled={loading}>
                                                                {loading ? 'Submitting...' : 'Register'}
                                                            </button>
                                                            &nbsp;
                                                            <button type="reset" className="btn btn-outline-secondary" disabled={loading}>
                                                                Clear Form
                                                            </button>
                                                        </center>
                                                    </div>
                                                </form>
                                                {loading && <div className="loading-icon" role="status" aria-live="polite"><span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading... please wait.</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <br />

                                    <Footer/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default REGISTRATION;
