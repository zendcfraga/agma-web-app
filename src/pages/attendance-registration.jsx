import axios from 'axios';
import swal from 'sweetalert2';
//import { Routes, Route } from 'react-router-dom';
import Header from '../static/header';
import Footer from '../static/footer';

//import Confirmation from './confirmation.jsx';

import { useState, useEffect } from "react";


function REGISTRATION() {

    var token = 'AGMA-06-01-2024-A$ELC0';

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
    }

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
    }

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
    }

    const saveRegistration = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to false after response

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
        });
    }

    useEffect(() => {
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
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-header">
                                                <center className="card-title-color">ATTENDANCE REGISTRATION</center>
                                            </div>
                                            <center>
                                                <p>
                                                    <i>
                                                        <small>Zoom Meeting invitation details and link will be provided after submitting your registration.</small>
                                                    </i>
                                                </p>
                                            </center>
                                            <div className="row">
                                                <form autoComplete="off" onSubmit={saveRegistration}>
                                                    {/*PERSONAL DETAILS-------------------------------------------------------------------------------------*/}
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                LAST NAME<b className="text-danger">*</b>
                                                            </strong>
                                                            <input name="inp_lname" type="text" className="form-control mb-2 mt-1" required placeholder="LAST NAME HERE.." />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                FIRST NAME<b className="text-danger">*</b>
                                                            </strong>
                                                            <input name="inp_fname" type="text" className="form-control mb-2 mt-1" required placeholder="FIRST NAME HERE.." />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                MIDDLE NAME <b className="text-danger">*</b>
                                                            </strong>
                                                            <input name="inp_middle" type="text" className="form-control mt-1" required placeholder="MIDDLE NAME HERE.." />
                                                        </div>
                                                    </div>

                                                    {/*ADDRESS-------------------------------------------------------------------------------------*/}
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                MUNICIPALITY/CITY <b className="text-danger">*</b>
                                                            </strong>

                                                            <select name="inp_town" onChange={handleTownChange} className="form-control mt-2" required style={{ cursor: 'pointer' }}>
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
                                                            <select name="inp_brgy" className="form-control mt-2" required >
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
                                                            <input name="inp_purok" type="text" className="form-control mb-2 mt-1" required placeholder="PUROK/SITIO HERE.." />
                                                        </div>
                                                    </div>
                                                    {/*CONTACT DETAILS and OTHER DETAILS-------------------------------------------------------------------------------------*/}
                                                    <div className='row'>
                                                        <div className="col-md-4">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                ACTIVE CONTACT/GCASH NO. <b className="text-danger">*</b>
                                                            </strong>
                                                            <input name="inp_contact" type="text" className="form-control mb-2 mt-1" required placeholder="ACTIVE CONTACT NO. HERE.." />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                BILLING ACCOUNT NO. <b className="text-danger">*</b>
                                                            </strong>
                                                            <input name="inp_accountno" type="text" className="form-control mb-2 mt-1" required placeholder="ACCOUNT NUMBER HERE.." />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                BIRTHDATE <b className="text-danger">*</b>
                                                            </strong>
                                                            <input name="inp_birthdate" type="date" className="form-control mt-1" required onChange={handleBirthdateChange} />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                AGE <b className="text-danger">*</b>
                                                            </strong>
                                                            <input name="inp_age" type="number" className="form-control mt-1" required placeholder="AGE HERE.." />
                                                        </div>
                                                    </div>

                                                    {/*STATUS DETAILS-------------------------------------------------------------------------------------*/}
                                                    <div className='row'>
                                                        <div className="col-md-4">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                CIVIL STATUS <b className="text-danger">*</b>
                                                            </strong>
                                                            <select name="inp_civil_status" onChange={handleCivilStatusChange} className="form-control mt-2" required >
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
                                                            <input name="inp_spouse" type="text" className="form-control mt-1" placeholder="SPOUSE NAME HERE.." />
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className="col-md-12">
                                                            <strong style={{ color: '#343A40', letterSpacing: '1px', fontSize: '11px' }}>
                                                                MESSAGE
                                                            </strong>
                                                            <input name="inp_comments" type="text" className="form-control mt-1" placeholder="ENTER YOUR SUGGESTIONS/COMMENTS HERE.." />
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
                                                            <button id="btn_submit" className="btn btn-success">
                                                                REGISTER
                                                            </button>
                                                            &nbsp;
                                                            <button type="reset" className="btn btn-danger">
                                                                CLEAR
                                                            </button>
                                                        </center>
                                                    </div>
                                                </form>
                                                {loading && <div className="loading-icon"><br />Loading... please wait.</div>}
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