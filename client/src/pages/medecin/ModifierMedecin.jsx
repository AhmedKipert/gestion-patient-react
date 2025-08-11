import React, { useEffect, useState } from 'react'
import '../../styles/AjouterPatient.css'
import Navbar from '../../components/Navbar'
import { getMedecin, updateMedecin } from '../../services/medecinService';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function ModifierMedecin() {
    const navigate = useNavigate();
    const [medecins, setMedecins] = useState({
        prenom: '',
        nom: '',
        matricule: '',
        service: ''
    });

    const { id } = useParams();
    // REMPLISSAGE DU FORMULAIRE
    useEffect(() => {
        getMedecin(id)
            .then(data => setMedecins(data.medecin))
            .catch(error => alert(error));
    }, []);

    // MESSAGE DE NOTIFICATION DE MODIFICATION
    const [notification, setNotification] = useState('');
    // const isDisabled = false;
    const isDisabled = medecins.nom.trim().length === 0 ||
        medecins.prenom.trim().length === 0 ||
        medecins.matricule.trim().length === 0 ||
        medecins.service.trim().length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        updateMedecin(id, medecins);
        setNotification(`Medecin ${medecins.prenom + " " + medecins.nom} modifié comme prévu`);
        navigate('/medecins/liste');

        // supprimer la notification d'ajout après 3 secondes
        setTimeout(() => { setNotification('') }, 2);
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setMedecins({ ...medecins, [name]: value });
    }

    return (
        <div>
            <Navbar />
            
            <div id='main' className='main page w-full h-full flex-full gap position-relative'>
                <Link className="navlink-cta w-fit" to="/medecins/liste">Liste des medecins</Link>
                <h2 className='text-white'>Modifier un Medecin</h2>
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

                    <input className='btn-primary btn-center' type="submit" value="Modifier" disabled={isDisabled} />
                </form>
                {
                    notification && <div className='succes-message'>{notification}</div>
                }
            </div>
        </div>
    )
}