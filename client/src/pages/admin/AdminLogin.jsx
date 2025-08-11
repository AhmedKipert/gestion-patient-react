import React, { useState } from 'react'
import '../../styles/AjouterPatient.css'
import { adminLogin } from '../../services/adminService';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [admin, setAdmin] = useState({
        matricule: '',
        motdepasse: ''
    });

    const [notification, setNotification] = useState('');

    const isDisabled = admin.matricule.trim().length === 0 ||
        admin.motdepasse.trim().length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        adminLogin(admin)
        .then(msg => msg.code === 200 ? navigate('/accueil') : setMessage(msg.message))
        .catch(console.log);
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setAdmin({ ...admin, [name]: value });
    }

    return (
        <div>
        <Navbar/>
            <div className='main page pt-5'>
                {/* <Link className="navlink-cta w-fit" to="/admin/liste">Liste des admin</Link> */}
                <div id='main' className=' full flex-full gap position-relative'>

                    <h2 className='text-white'>Connexion</h2>
                    <form onSubmit={handleSubmit} className='br5 flex-col gap'>
                        {/* Champ matricule */}
                        <div className="matriculeField">
                            <input onChange={handleInput} value={admin.matricule} className='input' type="text" name='matricule' id='matricule' placeholder='Matricule' />
                            <p className='matriculeError'></p>
                        </div>

                        {/* Champ Mot de passe */}
                        <div className="motdepasseField">
                            <input onChange={handleInput} value={admin.motdepasse} type="text" className="input" name='motdepasse' id='motdepasse' placeholder='Mot de passe' />
                            <p className='motdepasseError mt-3' style={{color: 'crimson'}}>{message.toLowerCase()}</p>
                        </div>

                        <input className='btn-primary btn-center' type="submit" value="se connecter" disabled={isDisabled} />
                    </form>
                    {
                        notification && <div className='succes-message'>{notification}</div>
                    }
                </div>
            </div>
        </div>
    )
}