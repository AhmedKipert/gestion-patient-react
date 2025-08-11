import React, { useEffect, useState } from 'react'
import '../../styles/AjouterPatient.css'
import Navbar from '../../components/Navbar'
import { getRendezvous, postRendezvous, updateRendezvous } from '../../services/rendezvousService';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getPatients } from '../../services/patientService';
import { getMedecins } from '../../services/medecinService';


export default function ModifierRendezvous() {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [medecins, setMedecins] = useState([]);
    const [rendezvous, setRendezvous] = useState({
        no: '',
        date: '',
        patient: '',
        medecin: ''
    });

    const { id } = useParams();
    // REMPLISSAGE DU FORMULAIRE
    useEffect(() => {
        // Liste des rendez-vous
        getRendezvous(id)
            .then(data => setRendezvous(data.rendezvous))
            .catch(error => alert(error));

        // Liste des patients
        getPatients()
            .then(data => setPatients(data.patients))
            .catch(alert);

        // Liste des médecins
        getMedecins()
            .then(setMedecins)
            .catch(alert);
    }, []);


    // MESSAGE DE NOTIFICATION DE MODIFICATION
    const [notification, setNotification] = useState('');
    // const isDisabled = false;
    const isDisabled = rendezvous.date.trim().length === 0 ||
        rendezvous.patient.trim().length === 0 ||
        rendezvous.medecin.trim().length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        updateRendezvous(id, rendezvous);
        setNotification(`rendezvous modifié comme prévu`);
        navigate('/rendezvous/liste');

        // supprimer la notification d'ajout après 3 secondes
        setTimeout(() => { setNotification('') }, 2);
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setRendezvous({ ...rendezvous, [name]: value });
    }

    return (
        <div>
            <Navbar />

            <div id='main' className='main page w-full h-full flex-full gap position-relative'>
                <Link className="navlink-cta w-fit" to="/rendezvous/ajouter">Liste des rendezvous</Link>
                <h2 className='text-white'>Modifier un rendezvous</h2>
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

                    <input className='btn-primary btn-center' type="submit" value="Modifier" disabled={isDisabled} />
                </form>
                {
                    notification && <div className='succes-message'>{notification}</div>
                }
            </div>
        </div>
    )
}