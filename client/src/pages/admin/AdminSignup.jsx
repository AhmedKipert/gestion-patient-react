import React, { useState } from 'react'
import '../../styles/AjouterPatient.css'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom';
import { adminSignup } from '../../services/adminService';

export default function AdminSignup() {
    const [admin, setAdmin] = useState({
        nom: '',
        prenom: '', 
        email: '',
        matricule: '',
        motdepasse: '',
        confirmermotdepasse: ''
    });

    const [notification, setNotification] = useState('');

    const isDisabled = false;//admin.nom.trim().length !== 0;
        // admin.prenom.trim().length === 0 ||
        // admin.email.trim().length === 0 ||
        // admin.motdepasse.trim().length === 0 ||
        // admin.confirmermotdepasse.trim().length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        adminSignup(admin);
        setNotification(`Admin ${admin.prenom + " " + admin.nom} ajouté comme prévu`);
        
        // supprimer la notification d'ajout après 3 secondes
        setTimeout(() => { setNotification('') }, 3000);
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setAdmin({ ...admin, [name]: value });
    }

    return (
        <div>
            {/* <Navbar /> */}
            <div className='main page pt-5'>
                {/* <Link className="navlink-cta w-fit" to="/admin/liste">Liste Médecin</Link> */}
                <div id='main' className=' full flex-full gap position-relative'>

                    <h2 className='text-white'>Ajouter un Admin</h2>
                    <form onSubmit={handleSubmit} className='br5 flex-col gap'>
                        {/* Champ Nom */}
                        <div className="nomField">
                            <input onChange={handleInput} value={admin.nom} className='input' type="text" name='nom' id='nom' placeholder='Nom' />
                            <p className='nomError'></p>
                        </div>

                        {/* Champ Prénom */}
                        <div className="prenomField">
                            <input onChange={handleInput} value={admin.prenom} type="text" className="input" name='prenom' id='prenom' placeholder='Prénom' />
                            <p className='prenomError'></p>
                        </div>

                        {/* Champ Email */}
                        <div className="emailField">
                            <input onChange={handleInput} value={admin.email} type="text" className="input" name='email' id='email' placeholder='Email' />
                            <p className='emailError'></p>
                        </div>
                        {/* Champ Matricule */}
                        <div className="matriculeField">
                            <input onChange={handleInput} value={admin.matricule} type="text" className="input" name='matricule' id='matricule' placeholder='Matricule' />
                            <p className='matriculeError'></p>
                        </div>
                        {/* Champ motdepasse */}
                        <div className="motdepasseField">
                            <input onChange={handleInput} value={admin.motdepasse} type="text" className="input" name='motdepasse' id='motdepasse' placeholder='Mot de passe' />
                            <p className='motdepasseError'></p>
                        </div>
                        {/* Champ confirmation mot de passe */}
                        <div className="confirmermotdepasseField">
                            <input onChange={handleInput} value={admin.confirmermotdepasse} type="text" className="input" name='confirmermotdepasse' id='confirmermotdepasse' placeholder='Confirmer votre mot de passe' />
                            <p className='confirmermotdepasseError'></p>
                        </div>

                        <input className='btn-primary btn-center' type="submit" value="s'inscrire" disabled={isDisabled} />
                    </form>
                    {
                        notification && <div className='succes-message'>{notification}</div>
                    }
                </div>
            </div>
        </div>
    )
}