import axios from 'axios';
import swal from 'sweetalert2';
import { Routes, Route, Link } from 'react-router-dom';
//import Registration from './attendance-registration';
import Header from '../static/header';
import Footer from '../static/footer';

import { useState, useEffect } from "react";
import '../App.css';

import { useNavigate } from "react-router-dom";

function PrivacyStatement() {

    const navigate = useNavigate();
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

                                            <div className="card-body">
                                                <div className="card-header">
                                                    <center className="card-title-color">AGUSAN DEL SUR ELECTRIC COOPERATIVE INC. DATA PRIVACY STATEMENT</center>
                                                </div>
                                                <div className="card-body">
                                                    <div className="col-md-12">
                                                        <p>The right to privacy is a fundamental human right. Acknowledging this, the AGUSAN DEL SUR ELECTRIC COOPEPRATIVE INC., hereafter referred to as “Organization”, endeavors to safeguard its stakeholders’ data privacy by adhering to data privacy principles and employing standard safety measures in the collection, processing, disclosure and retention of Personal information in accordance with the Data Privacy Act of 2012 (R.A. 10173), its Implementing Rules and Regulations (IRR) and to issuances of the National Privacy Commission.
                                                        </p>
                                                        <p>This Organization Data Privacy Statement (the “ODPS”) contains an outline of the general practices of the Organization in the context of data collection and processing. All other data privacy statements released or to be released by the Organization specific to a particular office, function or procedure shall be in congruence with the ODPS. Designed for general knowledge, the UDPS may not include specific information pertaining to the data collection and processing mechanism of a specific office, function or procedure. Thus, whenever applicable, a more specific data privacy statement or notice should be consulted.
                                                        </p>
                                                        <p>For a comprehensive and detailed view of the Organization’s data privacy policies, please refer to the Organization’s Data Privacy Manual.
                                                        </p>
                                                        <p><b>What Personal information the Organization may collect and process?</b>
                                                        </p>
                                                        <p>The Organization collects and processes only the type and amount of data necessary to perform its core and auxiliary functions. As an institution composed of heterogeneous entities, the Organization may collect a variety of personal information in different contexts and for different specific purposes.
                                                        </p>
                                                        <p>In general, among the common Personal information the Organization may collect include:
                                                        </p>
                                                        <p>
                                                            <ul>
                                                                <li>Name</li>
                                                                <li>Specimen signatures</li>
                                                                <li>Home address</li>
                                                                <li>Email address</li>
                                                                <li>Biographical information</li>
                                                                <li>Academic information</li>
                                                                <li>Nationality</li>
                                                                <li>Phone number</li>
                                                                <li>Government or Non-government Identification Number / Card</li>
                                                                <li>Financial information</li>
                                                                <li>Employment details</li>
                                                                <li>Images via CCTV and other similar recording devices</li>
                                                                <li>Internet Protocol (IP) addresses</li>
                                                                <li>Cookie session data</li>
                                                            </ul>
                                                        </p>
                                                        <p>As a premiere research institution, the Organization may also collect sensitive personal information in the conduct of relevant researches and studies. For instance, a Organization- affiliated researcher may collect data pertaining to an individual’s ethnic origin, political opinions or criminal history to achieve the objectives of a particular study.
                                                        </p>
                                                        <p>All Personal information collection and processing can only be done when the Organization acquires the consent of the data subject, either explicitly or implicitly, after the latter has been informed of the nature and extent of data collection and processing.</p>
                                                        <p><b>Why does the Organization collect and process Personal information?</b></p>
                                                        <p>The purpose of Personal information collection and processing may vary from one Organization procedure (e.g. Client admission, visitor entry, human resource management, etc.) to another. However, the general principle governing the Organization’s data collection process is legitimacy of purpose.
                                                            <br /><br />
                                                            The Organization shall only collect and process data for legitimate purposes in consonance with its inherent functions and in compliance with legal requirements. These legitimate purposes may include, but may not be limited to, the following:
                                                            <br /><br />
                                                            <ul>
                                                                <li>To verify Clients’ and employees’ identity; </li>
                                                                <li>To generate statistics and analytics useful for administrative decisions;</li>
                                                                <li>To strengthen security measures and facilitate investigations of reported violations;</li>
                                                                <li>To easily generate statutory reports;</li>
                                                                <li>For employee and human resources management purposes (as may be required by applicable laws);</li>
                                                                <li>For research purposes or endeavors contributing to the body of knowledge;</li>
                                                                <li>To comply with legal or regulatory obligations;</li>
                                                                <li>To establish, exercise or defend legal claims</li>
                                                            </ul>

                                                            <b>How does the Organization share or disclose Personal information? </b>
                                                            <br /><br />
                                                            Utmost care and due diligence are practiced by the Organization in handling Personal information. The Organization shall never share or disclose data to third-parties without prior consent from the data subjects. Whenever disclosure of data is necessary and permitted, the Organization conscientiously reviews the privacy and security policies of the authorized third- party service providers or external partners. The Organization may also be required to disclose data in compliance with legal or regulatory obligations.
                                                            <br /><br />
                                                            Internal disclosure of Personal information from one unit to another within the Organization shall be subjected to an institutionalized standard data request procedure. This ensures that data is transmitted through official channels and shared for legitimate purposes.
                                                            <br /><br />
                                                            Regardless of the context of data disclosure, the Organization shall always practice the principle of data minimization which means that only the minimum amount of data needed to serve a particular purpose is shared to the requesting entity.
                                                            <br /><br />
                                                            <b>How does the Organization protect Personal information? </b>
                                                            <br /><br />
                                                            The Organization shall employ necessary or reasonable safeguards in the form of physical, technological, logical and administrative controls. Internal access to stored Personal information will be kept to a minimum number of authorized individuals and bounded by confidentiality agreements. These individuals are subjected to regular training for proper handling of information in accordance to the Organization’s data privacy policies and other related laws, regulations or issuances.
                                                            <br /><br />
                                                            <b>How long does the Organization retain Personal information? </b>
                                                            <br /><br />
                                                            Personal information are retained only for as long as necessary to serve its declared purpose or comply with regulatory and legal requirements. Depending on the nature of data and purpose it serves, the retention period could range from days (e.g. CCTV recording) to years (e.g. Client academic information). Whenever retention becomes unnecessary, the Organization shall dispose the Personal information properly through a secure and confidential means.
                                                        </p>

                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-between align-items-center mx-3 mt-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <button className="btn btn-success"
                                                        onClick={() => navigate('/')}
                                                    >
                                                        Back
                                                    </button>
                                                </div>

                                            </div>
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

export default PrivacyStatement;