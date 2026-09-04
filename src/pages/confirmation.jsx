
import Header from '../static/header';
import Footer from '../static/footer';

// SECURITY UPDATE: Keep the old import visible for reference; the shared API client now uses VITE_API_BASE_URL.
// import axios from 'axios';
import api from '../api/client';
import { useEffect, useRef, useState } from 'react';
import ProgressSteps from '../static/progress-steps';

function CONFIRMATION() {

    const [zoom, setZoom] = useState([]);

    // SECURITY UPDATE: A browser-shipped token is public, so it must not be used as an API secret.
    // var token = 'OLD_BROWSER_TOKEN_REMOVED';

    /* OLD CODE: Sent a readable token from the browser and repeated the production API URL.
    function zoomDetails() {
        axios({
            method: 'POST',
            url: 'https://agma-api.aselco.dev/index.php/api/zoom-details', // 'http://127.0.0.1/aselco-agma/agma-api/index.php/api/town-list'
            data: {
                TOKEN: token
            }

        }).then(function (response) {
            setZoom(response.data);
        });
    } */

    /* OLD CODE: Zoom details were public and could be requested without successful registration.
    async function zoomDetails() {
        try{
            const response = await api.get('/api/zoom-details');
            setZoom(response.data);
        }catch(error){
            console.error('Unable to load meeting details.');
            setZoom([]);
        }
    } */

    const hasRequestedZoom = useRef(false); // SECURITY UPDATE: Prevent React development mode from requesting the one-use receipt twice.

    // SECURITY UPDATE: Send the receipt created only after a successful registration.
    async function zoomDetails() {
        const registrationReceipt = sessionStorage.getItem('registration_receipt');

        if (!registrationReceipt) {
            window.location.replace('/');
            return;
        }

        try{
            const response = await api.post('/api/zoom-details', {
                REGISTRATION_RECEIPT: registrationReceipt
            });

            setZoom(response.data);
            sessionStorage.removeItem('registration_receipt'); // SECURITY UPDATE: Refreshing cannot request the details again.
        }catch(error){
            console.error('Unable to load meeting details.');

            if (error.response?.status === 403) {
                sessionStorage.removeItem('registration_receipt'); // Invalid, expired, or already-viewed receipt must not be retried.
                window.location.replace('/');
            }

            setZoom([]);
        }
    }

    var zoom_link = '';
    var meeting_id = '';
    var meeting_passcode = '';

    zoom.map(
        (app) => {
            zoom_link = app['data_link'];
            meeting_id = app['data_meeting_id'];
            meeting_passcode = app['data_passcode'];
        }
    );

    useEffect(() => {
        if (!hasRequestedZoom.current) {
            hasRequestedZoom.current = true;
            zoomDetails();
        }
    }, []);

    return (
        <>
            {
                <div className="container">
                    <Header />
                    <ProgressSteps currentStep={3} />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card page-card">
                                <div className="card-body">
                                    <div className="card confirmation-card">
                                        <div className="card-header page-card-header">
                                            <h1 className="card-title-color page-title">Registration Successful</h1>
                                        </div>
                                        <br />
                                        <center>
                                            <p className="confirmation-message">
                                                Thank you! Your attendance registration has been recorded.
                                            </p>
                                        </center>
                                        <center>
                                            <div className="meeting-details" aria-live="polite">
                                                <p className="meeting-details-title">Zoom Meeting Details</p>
                                                <div className="meeting-detail-row">
                                                    <span>Meeting ID</span>
                                                    <strong>{meeting_id || 'Loading...'}</strong>
                                                </div>
                                                <div className="meeting-detail-row">
                                                    <span>Passcode</span>
                                                    <strong>{meeting_passcode || 'Loading...'}</strong>
                                                </div>
                                            </div>
                                        </center>
                                        <center>
                                            <p>
                                                {zoom_link && (
                                                    <a className="btn btn-success primary-action join-meeting-button" href={zoom_link} target="_blank" rel="noopener noreferrer">
                                                        Join Zoom Meeting
                                                    </a>
                                                )}
                                            </p>
                                        </center>
                                        <br />
                                        <center>
                                            <p><small>
                                                <i>
                                                    We are also live via official Facebook page.
                                                </i>
                                            </small>
                                            </p>
                                        </center>

                                    </div>
                                    <br />
                                    <Footer/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>
    )
}

export default CONFIRMATION;
