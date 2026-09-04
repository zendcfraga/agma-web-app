// SECURITY UPDATE: The old direct Axios import is no longer needed because all API URLs now come from VITE_API_BASE_URL.
// import axios from 'axios';
import swal from 'sweetalert2';
import { Routes, Route, Link } from 'react-router-dom';
//import Registration from './attendance-registration';

import { useState, useEffect } from "react";
import '../App.css';
import api from '../api/client';


function HEADER() {

    const [info, setInfo] = useState([]);

    // SECURITY UPDATE: Never put an API token in browser code; visitors can always read the compiled JavaScript.
    // var token = 'OLD_BROWSER_TOKEN_REMOVED';

    /* function getInfo() {
        axios({
            method: 'POST',
            url: 'https://agma-api.aselco.dev/index.php/api/getInfo', // 'http://127.0.0.1/aselco-agma/agma-api/index.php/api/town-list'
            data: {
                TOKEN: token
            }

        }).then(function (response) {
            setInfo(response.data);
        });
    } */

    async function getInfo() {
        try{
            const response = await api.get("/api/getInfo");
            setInfo(response.data);
        }catch(error){
            console.error("Unable to load event information.");
            setInfo([]);
        }
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <div>
            <center>
                <br />
                <img src='/agma.png' className="agma-header-logo" alt="AGMA Online Registration" />
                {info.length > 0 && (
                    <p>
                        <i>
                            {/* <small> */}
                                {info[0].data_theme1} <br /><b>{info[0].data_theme2}</b>
                            {/* </small> */}
                        </i>
                    </p>
                )}
            </center>
            <hr />
            <center>
                {info.length > 0 && (
                    <p>
                        <small>{info[0].data_date}</small>
                    </p>
                )}
            </center>
        </div>
    )
}

export default HEADER;
