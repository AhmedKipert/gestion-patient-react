import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getPatient } from "../services/patientService";


export default function Details() {
    const { id } = useParams();
    const [patient, setPatient] = useState({});
    useEffect(() => {
        getPatient(id)
            .then(data => setPatient(data.patient))
            .catch(alert)
    }, []);

    return (

        <div className="">
            <Navbar />
            <div className="main full text-white p-md gap flex-col align-center border">
                <div className="details w-full">
                    <img src="/reactback.jpg" style={{
                        height: "70px",
                        objectFit: 'cover',
                        borderRadius: '8px'
                    }} />
                    <h2 className="text-center" style={{borderBottom: "2px solid royalblue"}}>Information du patient</h2>
                    <h3>Prénom: <span className="fwn">{patient.prenom}</span></h3>
                    <h3>Nom: <span className="fwn">{patient.nom}</span></h3>
                    <h3>Email: <span className="fwn">{patient.email}</span></h3>
                    <h3>Age: <span className="fwn">{patient.age}</span></h3>
                    <h3>Sexe: <span className="fwn">{patient.sexe}</span></h3>
                    <h3>Date de consultation: <span className="fwn">{patient.dateConsultation}</span></h3>
                </div>
                <Link className="navlink-cta w-fit m-auto b-white" to={"/patients/liste"}>Retournez</Link>
            </div> 
        </div>
    )
}