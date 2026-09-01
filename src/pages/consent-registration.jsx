import axios from 'axios';
import swal from 'sweetalert2';
import { Routes, Route, Link } from 'react-router-dom';
//import Registration from './attendance-registration';
import Header from '../static/header';
import Footer from '../static/footer';

import { useState, useEffect } from "react";
import '../App.css';


function CONSENTREG() {

    const [cutOff, setCutOff] = useState([]);

    var token = 'AGMA-06-01-2024-A$ELC0';

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
    }

    const saveRegistration = async (event) => {
        event.preventDefault();
        const agreeRadio = document.getElementById('rb_agree');

        if (agreeRadio.checked) {
            window.location.href = '/registration-page';
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

                                    <div className="card">
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
                                                    <div className="card-header">
                                                        <center className="card-title-color">CONSENT STATEMENT</center>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <center>
                                                                <br/>
                                                                <p>
                                                                    <i>
                                                                        <small>Notice: Zoom Meeting invitation details and link will be provided after registration.</small>
                                                                    </i>
                                                                </p>
                                                            </center>
                                                            <hr />
                                                            <center>
                                                                <p className="justify-paragraph" >
                                                                    'By ticking on  "I Agree", I confirm that I have read the AGUSAN DEL SUR ELELCTRIC COOPERATIVE, INC’s Data Privacy Statement and hereby allow the Organization to collect, use, process and store my personal information through its official channels for legitimate purposes. I affirm my fundamental right to privacy and my constitutional data privacy rights as stated in the Republic Act No. 10173 of the Philippines. This consent is hereby given on the guarantee that these rights shall be upheld at all times.'
                                                                </p>
                                                                <Link to="/privacy-statement">View full ASELCO's Data Privacy Statement</Link>
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <form autoComplete="off" onSubmit={saveRegistration}>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <input type="radio" id="rb_agree" name="agree" />
                                                                &nbsp; &nbsp; I Agree
                                                            </div>
                                                            <div className="col-md-6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                <button id="btn_submit" className="btn btn-success">
                                                                    Continue
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