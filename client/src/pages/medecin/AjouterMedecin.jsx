import React, { useState } from 'react'
import '../../styles/AjouterPatient.css'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom';
import { postMedecin } from '../../services/medecinService';

export default function AjouterMedecin() {
    const [medecins, setmedecins] = useState({
        nom: '',
        prenom: '',  
        matricule: '',
        service: '',
    });

    const [notification, setNotification] = useState('');

    const isDisabled = medecins.nom.trim().length === 0 ||
        medecins.prenom.trim().length === 0 ||
        medecins.nom.trim().length === 0 ||
        medecins.matricule.trim().length === 0 ||
        medecins.service.trim().length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        postMedecin(medecins);
        setNotification(`Medecin ${medecins.prenom + " " + medecins.nom} ajouté comme prévu`);
        // supprimer la notification d'ajout après 3 secondes
        setTimeout(() => { setNotification('') }, 3000);
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setmedecins({ ...medecins, [name]: value });
    }

    return (
        <div>
            <Navbar />
            <div className='main page pt-5'>
                <Link className="navlink-cta w-fit" to="/medecins/liste">Liste Médecin</Link>
                <div id='main' className=' full flex-full gap position-relative'>

                    <h2 className='text-white'>Ajouter un Médecin</h2>
                    <form onSubmit={handleSubmit} className='br5 flex-col gap'>
                        {/* Champ Nom */}
                        <div className="nomField">
                            <input onChange={handleInput} value={medecins.nom} className='input' type="text" name='nom' id='nom' placeholder='Nom' />
                            <p className='nomError'></p>
                        </div>

                        {/* Champ Prénom */}
                        <div className="prenomField">
                            <input onChange={handleInput} value={medecins.prenom} type="text" className="input" name='prenom' id='prenom' placeholder='Prénom' />
                            <p className='prenomError'></p>
                        </div>

                        {/* Champ Matricule */}
                        <div className="matriculeField">
                            <input onChange={handleInput} value={medecins.matricule} type="text" className="input" name='matricule' id='matricule' placeholder='Matricule' />
                            <p className='matriculeError'></p>
                        </div>
                        {/* Champ Service */}
                        <div className="serviceField">
                            <input onChange={handleInput} value={medecins.service} type="text" className="input" name='service' id='service' placeholder='Service' />
                            <p className='serviceError'></p>
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