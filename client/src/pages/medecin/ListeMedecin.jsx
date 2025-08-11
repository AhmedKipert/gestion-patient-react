import { useEffect, useState } from "react"
import { deleteMedecin, deletemedecin, getMedecins, getmedecins } from "../../services/medecinService";
import '../../styles/ListePatient.css'
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import '../../styles/all.min.css'

export default function ListeMedecin() {
    const navigate = useNavigate();
    const [medecins, setMedecins] = useState([]);
    const [recherche, setRecherche] = useState('');
    const [filtre, setFiltre] = useState([]);

    useEffect(() => {
        getMedecins()
            .then(data => {
                if(data.status === 400) {
                    return navigate('/admin/login');
                } 
                
                console.log(data.message, 'Payload:', data.payload)
                setMedecins(data); setFiltre(data);
            })
            .catch(console.error);
    }, []);

    const resultatFiltre = filtre.filter(p => {
        return `${p.prenom.toLowerCase().trim() + " " + p.nom.toLowerCase().trim()}`.includes(recherche.toLowerCase());
    });

    const [notification, setNotification] = useState('');

    // suppression d'un médecin
    const handleDelete = (no) => {
        if(window.confirm('Etes-vous sûr de vouloir supprimer ?')) {
            deleteMedecin(no);
            setMedecins(medecins.filter(p => p._id !== no));
            setFiltre(medecins.filter(p => p._id !== no));
            setNotification("Médecin supprimer avec success");
            setTimeout(() => { setNotification('') }, 3000);
        };
    };

    const handleUpdate = (id) => {
        navigate(`/medecin/${id}`)
    };

    return (
        <div>
            <Navbar />

            <div className="page bg-primary bg-light full pt-5 flex-col gap">
                <Link className="navlink-cta w-fit" to="/medecin/ajouter">Ajouter un Médecin</Link>
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
                <h1 className="text-white">Liste des médecins</h1>
                <table className="w-full bg-light" style={{ overflow: "scroll" }}>
                    <thead className="thead">
                        <tr>
                            <th>N°</th>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Matricule</th>
                            <th>Service</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="tr">
                        {/* Si la collections est vide */}
                        {
                            medecins.length === 0 && <tr style={{ height: "100px" }}><td colSpan={7} className="text-center">Aucun médecin enregistré</td></tr>
                        }

                        {
                            resultatFiltre.map(m => (
                                <tr key={m._id}>
                                    <td className="text-center">{m.no}</td>
                                    <td>{m.nom}</td>
                                    <td>{m.prenom}</td>
                                    <td className="text-center">{m.matricule}</td>
                                    <td className="text-center">{m.service}</td>
                                    <td className="flex justify-center gap p-5">
                                        <button onClick={() => handleUpdate(m._id)} className="btn-primary2" ><i className="fas fa-edit fa-lg"></i></button>
                                        <button onClick={() => handleDelete(m._id)} className="btn-danger"><i className="fas fa-trash fa-lg"></i></button>
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