import { useEffect, useState } from "react"
import { deleteRendezvous, getRendezvouss } from "../../services/rendezvousService";
import '../../styles/ListePatient.css'
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import '../../styles/all.min.css';

export default function ListeRendezvous() {
    const navigate = useNavigate();
    const [recherche, setRecherche] = useState('');
    const [filtre, setFiltre] = useState([]);

    const [rendezvous, setRendezvous] = useState([]);
    useEffect(() => {
        getRendezvouss()
            .then(data => { 
                if(data.code !== 200) return navigate('/admin/login');
                setRendezvous(data.rendezvous); setFiltre(data.rendezvous);
            })
            .catch(alert);
    }, []);

    const resultatFiltre = filtre.filter(p => {
        return `${p.patient.prenom.toLowerCase().trim() + " " + p.patient.nom.toLowerCase().trim()}`.includes(recherche.toLowerCase());
    });

    const [notification, setNotification] = useState('');

    const handleDelete = (id) => {
        if(window.confirm('Etes-vous sûr de vouloir supprimer ?')) {
            deleteRendezvous(id);
            setRendezvous(rendezvous.filter(p => p._id !== id));
            setFiltre(rendezvous.filter(p => p._id !== id));
            setNotification("rendezvous supprimer avec success");
            setTimeout(() => { setNotification('') }, 3000);
        };
    }

    const handleUpdate = (id) => {
        navigate(`/rendezvous/${id}`);
    }

    return (
        <div>
            <Navbar />

            <div className="page bg-primary bg-light full pt-5 flex-col gap">
                <Link className="navlink-cta w-fit" to="/rendezvous/ajouter">Ajouter un rendez-vous</Link>
                <div>
                    {/* Formulaire de recherche */}
                    <form className="flex gap">
                        <input onChange={(e) => setRecherche(e.target.value)} type="text" className="input" placeholder="Rechercher un médecin" />
                    </form>

                    {
                        // Ne pas afficher le resultat de la recherche si le champ de saisie est vide
                        recherche.trim().length !== 0 && <p className="text-white mt-3 fwb">Resultat: {resultatFiltre.length}</p>
                    }
                </div>
                <h1 className="text-white">Liste des rendez-vous</h1>
                <table className="w-full bg-light" style={{ overflow: "scroll" }}>
                    <thead className="thead">
                        <tr>
                            <th>N°</th>
                            <th>Date</th>
                            <th>Patient</th>
                            <th>Médecin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="tr">
                        {
                            rendezvous.length === 0 && <tr style={{ height: "100px" }}><td colSpan={7} className="text-center">Aucun rendezvous enregistré</td></tr>
                        }

                        {
                            resultatFiltre.map(r => (
                                <tr key={r._id}>
                                    <td className="text-center">{r.no}</td>
                                    <td className="text-center">{r.date}</td>
                                    <td>{r.patient.prenom + " " + r.patient.nom}</td>
                                    <td className="text-center">{r.medecin.prenom + " " + r.medecin.nom + " (" + r.medecin.service + ")"}</td>
                                    <td className="flex justify-center gap p-5">
                                        <button onClick={() => handleUpdate(r._id)} className="btn-primary2" ><i className="fas fa-edit fa-lg"></i></button>
                                        <button onClick={() => handleDelete(r._id)} className="btn-danger"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {
                    notification && <div className="succes-message" style={{ backgroundColor: "crimson" }}>{notification}</div>
                }
            </div>
        </div>
    );
}