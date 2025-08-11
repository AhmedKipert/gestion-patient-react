import React, { useEffect, useState } from 'react'
import '../../styles/AjouterPatient.css'
import Navbar from '../../components/Navbar'
import { postRendezvous } from '../../services/rendezvousService';
import { Link, useNavigate } from 'react-router-dom';
import { getPatients } from '../../services/patientService';
import { getMedecins } from '../../services/medecinService';

export default function AjouterRendezvous() {
    const navigate = useNavigate()
    const [rendezvous, setRendezvous] = useState({
        date: '',
        patient: '',
        medecin: ''
    });

    const [patients, setPatients] = useState([]);
    const [medecins, setMedecins] = useState([]);

    useEffect(()=> {
        getPatients()
            .then(data => setPatients(data.patients))
            .catch(alert);
        
        getMedecins()
            .then(setMedecins)
            .catch(alert);
    }, []);

    const [notification, setNotification] = useState('');

    const isDisabled = rendezvous.date.trim().length === 0 ||
        rendezvous.patient.trim().length === 0 ||
        rendezvous.medecin.trim().length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        postRendezvous(rendezvous)
            .then(data => {
                navigate('/rendezvous/liste');
                setNotification(data.message);
            })
            .catch(error => alert(error.message));
        
        setNotification(`Rendezvous ajouté comme prévu`);
        setTimeout(() => { setNotification('') }, 3000);
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setRendezvous({ ...rendezvous, [name]: value });
    }

    return (
        <div>
            <Navbar />
            <div className='main page pt-5'>
                <Link className="navlink-cta w-fit" to="/rendezvous/liste">Liste des rendez-vous</Link>
                <div id='main' className=' full flex-full gap position-relative'>
                    <h2 className='text-white'>Ajouter un rendez-vous</h2>
                    <form onSubmit={handleSubmit} className='br5 flex-col gap'>
                        {/* Champ date */}
                        <div className="dateField">
                            <input onChange={handleInput} value={rendezvous.date} className='input' type="date" name='date' id='date' placeholder='Date' />
                            <p className='nomError'></p>
                        </div>

                        {/* Champ Patient */}
                        <div className="patientField flex-col g-5">
                            <label htmlFor="patient">Patient</label>
                            <select className='input' onChange={handleInput} value={rendezvous.patient} name="patient" id="patient">
                                <option value="" disabled hidden selected>Sélectionnez un patient</option>
                                {
                                    patients.map(p => (
                                        <option value={p._id}>{p.prenom + " " + p.nom}</option>
                                    ))
                                }
                            </select>
                            {/* <input onChange={handleInput} value={rendezvous.patient} type="text" className="input" name='patient' id='patient' placeholder='Patient' /> */}
                            <p className='patientError'></p>
                        </div>

                        {/* Champ medecin */}
                        <div className="medecinField flex-col g-5">
                        <label htmlFor="medecin">Médecin</label>
                            <select className='input' onChange={handleInput} value={rendezvous.medecin} name="medecin" id="medecin">
                                <option value="" disabled hidden selected>Sélectionnez un Médecin</option>
                                {
                                    medecins.map(m => (
                                        <option value={m._id}>{m.prenom}</option>
                                    ))
                                }
                            </select>
                            <p className='emailError'></p>
                        </div>

                        <input className='btn-primary btn-center' type="submit" value="Ajouter" disabled={isDisabled} />
                    </form>
                    {
                        notification && <div className='succes-message'>{notification}</div>
                    }
                </div>
            </div>
        </div>
    )
}