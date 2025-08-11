import React, { useEffect, useState } from 'react'
import '../../styles/AjouterPatient.css'
import Navbar from '../../components/Navbar'
import { getPatient, updatePatient } from '../../services/patientService';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function ModifierPatient() {
    const navigate = useNavigate();
    const [patients, setPatients] = useState({
        nom: '',
        prenom: '',
        email: '',
        age: '',
        sexe: '',
        dateConsultation: ''
    });

    const { id } = useParams();
    // REMPLISSAGE DU FORMULAIRE
    useEffect(() => {
        getPatient(id)
            .then(data => setPatients(data.patient))
            .catch(error => alert(error));
    }, []);

    // MESSAGE DE NOTIFICATION DE MODIFICATION
    const [notification, setNotification] = useState('');
    // const isDisabled = false;
    const isDisabled = patients.nom.trim().length === 0 ||
        patients.prenom.trim().length === 0 ||
        patients.email.trim().length === 0 ||
        patients.age <= 0 ||
        patients.sexe.trim().length === 0 ||
        patients.dateConsultation.trim().length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        updatePatient(id, patients);
        setNotification(`Patient ${patients.prenom + " " + patients.nom} modifié comme prévu`);
        navigate('/patients/liste');

        // supprimer la notification d'ajout après 3 secondes
        setTimeout(() => { setNotification('') }, 2);
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setPatients({ ...patients, [name]: value });
    }

    return (
        <div>
            <Navbar />

            <div id='main' className='main page w-full h-full flex-full gap position-relative'>
                <Link className="navlink-cta w-fit" to="/patients/liste">Liste des patients</Link>
                <h2 className='text-white'>Modifier un patient</h2>
                <form onSubmit={handleSubmit} className='br5 flex-col gap'>
                    {/* Champ Nom */}
                    <div className="omField">
                        <input onChange={handleInput} value={patients.nom} className='input' type="text" name='nom' id='nom' placeholder='Nom' />
                        <p className='nomError'></p>
                    </div>

                    {/* Champ Prénom */}
                    <div className="prenomField">
                        <input onChange={handleInput} value={patients.prenom} type="text" className="input" name='prenom' id='prenom' placeholder='Prénom' />
                        <p className='prenomError'></p>
                    </div>

                    {/* Champ Email */}
                    <div className="emailField">
                        <input onChange={handleInput} value={patients.email} type="email" className="input" name='email' id='email' placeholder='Email' />
                        <p className='emailError'></p>
                    </div>
                    {/* Champ Email */}
                    <div className="ageField">
                        <input onChange={handleInput} value={patients.age} type="Number" className="input" name='age' id='age' placeholder='Age' />
                        <p className='ageError'></p>
                    </div>

                    {/* Champ Sexe */}
                    <div className="Sexe">
                        <select onChange={handleInput} value={patients.sexe} name="sexe" className='input' id="sexe">
                            <option value="" selected disabled hidden >Sexe</option>
                            <option value="homme">Homme</option>
                            <option value="femme">Femme</option>
                        </select>
                        <p className='sexeError'></p>
                    </div>

                    {/* Champ DateConsultation */}
                    <div className="prenomField">
                        <input onChange={handleInput} type="date" value={patients.dateConsultation} className="input" name='dateConsultation' id='dateConsultation' placeholder='Date de consultation' />
                        <p className='dateConsultationError'></p>
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