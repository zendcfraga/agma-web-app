
import Header from '../static/header';
import Footer from '../static/footer';

import axios from 'axios';
import { useEffect, useState } from 'react';

function CONFIRMATION() {

    const [zoom, setZoom] = useState([]);

    var token = 'AGMA-06-01-2024-A$ELC0';

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
        zoomDetails();
    }, []);

    return (
        <>
            {
                <div className="container">
                    <Header />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card">
                                        <div className="card-header">
                                            <center className="card-title-color">Thank you for registering!</center>
                                        </div>
                                        <br />
                                        <center>
                                            <p>
                                                Zoom Meeting details: <br />
                                                Meeting ID: <i><b>{meeting_id}</b></i><br />
                                                Passcode: <b><i>{meeting_passcode}</i></b>
                                            </p>
                                        </center>
                                        <center>
                                            <p>
                                                or
                                            </p>
                                        </center>
                                        <center>
                                            <p>
                                                <i>
                                                    Join thru this link: <br />
                                                    <a href={zoom_link} target="_blank" rel="noopener noreferrer">
                                                        {zoom_link}
                                                    </a>
                                                </i>
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