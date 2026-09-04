// SECURITY UPDATE: Keep the old import visible for reference; the shared API client now uses VITE_API_BASE_URL.
// import axios from 'axios';
import api from '../api/client';
import swal from 'sweetalert2';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
//import Registration from './attendance-registration';
import Header from '../static/header';
import Footer from '../static/footer';
import ProgressSteps from '../static/progress-steps';

import { useState, useEffect } from "react";
import '../App.css';


function CONSENTREG() {

    const [cutOff, setCutOff] = useState([]);
    const navigate = useNavigate(); // SECURITY UPDATE: Pass a private navigation marker after I Agree is clicked.

    // SECURITY UPDATE: A browser-shipped token is public, so it must not be used as an API secret.
    // var token = 'OLD_BROWSER_TOKEN_REMOVED';

    /* OLD CODE: Sent a readable token from the browser and repeated the production API URL.
    function getCutOff() {
        axios({
            method: 'POST',
            url: 'https://agma-api.aselco.dev/index.php/api/cut-off', // 'http://127.0.0.1/aselco-agma/agma-api/index.php/api/town-list'
            data: {
                TOKEN: token
            }

        }).then(function (response) {
            setCutOff(response.data.status);
        });
    } */

    // SECURITY UPDATE: This is public event information, so use GET without a fake browser secret.
    async function getCutOff() {
        try{
            const response = await api.get('/api/cut-off'); // Uses the local VITE_API_BASE_URL from .env.local.
            setCutOff(response.data.status);
        }catch(error){
            console.error('Unable to check registration status.'); // Do not expose internal API details to visitors.
            setCutOff('error');
        }
    }

    const saveRegistration = async (event) => {
        event.preventDefault();
        const agreeRadio = document.getElementById('rb_agree');

        if (agreeRadio.checked) {
            // OLD CODE: This only changed pages and did not give the API proof that consent happened.
            // window.location.href = '/registration-page';

            try{
                // SECURITY UPDATE: Ask the API for a short-lived, one-use registration permission.
                const response = await api.post('/api/registration-intent', {
                    CONSENT_ACCEPTED: true
                });

                // SECURITY UPDATE: sessionStorage clears when the browser tab is closed.
                sessionStorage.setItem('registration_intent', response.data.registration_intent);

                // OLD CODE: Changing window.location did not tell the route guard how the visitor reached the page.
                // window.location.href = '/registration-page';

                // SECURITY UPDATE: A manually typed URL has no fromConsent marker and will be redirected.
                navigate('/registration-page', {
                    state: {
                        fromConsent: true
                    }
                });
            }catch(error){
                swal.fire({
                    title: 'Cannot continue',
                    text: error.response?.data?.message || 'Unable to start registration. Please try again.',
                    icon: 'error'
                });
            }
        } else {
            swal.fire({
                title: "",
                text: "To proceed with the registration, please tick 'I Agree.' to indicate your consent.",
                icon: "error"
            });
        }
    }

    useEffect(() => {
        getCutOff();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12">

                                    <Header />
                                    <ProgressSteps currentStep={1} />

                                    <div className="card page-card">
                                        {
                                            cutOff === "error" ? (
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <center style={{ color: 'red' }}>
                                                                Registrations are now closed. The cut-off time was 12:00 noon.
                                                            </center>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="card-body">
                                                    <div className="card-header page-card-header">
                                                        <h1 className="card-title-color page-title">Consent Statement</h1>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <center>
                                                                <br/>
                                                                <p className="notice-box">
                                                                    <i>
                                                                        <small>Notice: Zoom Meeting invitation details and link will be provided after registration.</small>
                                                                    </i>
                                                                </p>
                                                            </center>
                                                            <hr />
                                                            <center>
                                                                <p className="justify-paragraph consent-copy" >
                                                                    By selecting “I Agree,” I confirm that I have read the Agusan del Sur Electric Cooperative, Inc. Data Privacy Statement and allow the organization to collect, use, process, and store my personal information through its official channels for legitimate purposes. I affirm my right to privacy under Republic Act No. 10173 of the Philippines.
                                                                </p>
                                                                <Link to="/privacy-statement">View full ASELCO's Data Privacy Statement</Link>
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <form autoComplete="off" onSubmit={saveRegistration}>
                                                        <div className="row consent-actions align-items-center">
                                                            <div className="col-md-7">
                                                                <label className="consent-option" htmlFor="rb_agree">
                                                                    <input type="radio" id="rb_agree" name="agree" />
                                                                    <span>I have read and agree to the Data Privacy Statement.</span>
                                                                </label>
                                                            </div>
                                                            <div className="col-md-5 consent-submit">
                                                                <button id="btn_submit" className="btn btn-success primary-action">
                                                                    Continue to Registration
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <br />
                                    <Footer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CONSENTREG;
