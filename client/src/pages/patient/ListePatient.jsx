import { useEffect, useState } from "react"
import { deletePatient, getPatients } from "../../services/patientService";
import '../../styles/ListePatient.css'
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import '../../styles/all.min.css';

export default function ListePatient() {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [recherche, setRecherche] = useState('');
    const [filtre, setFiltre] = useState([]);

    useEffect(() => {
        getPatients()
            .then(data => { 
                if(data.code !== 200) return navigate('/admin/login');
                setPatients(data.patients); setFiltre(data.patients);
            })
            .catch(console.error);
    }, []);

    const resultatFiltre = filtre.filter(p => {
        return `${p.prenom.toLowerCase().trim() + " " + p.nom.toLowerCase().trim()}`.includes(recherche.toLowerCase());
    });


    const [notification, setNotification] = useState('');

    const handleDelete = (no) => {
        if(window.confirm('Etes-vous sûr de vouloir supprimer ?')) {
            deletePatient(no);
            setPatients(patients.filter(p => p._id !== no));
            setFiltre(patients.filter(p => p._id !== no));
            setNotification("Patient supprimer avec success");
            setTimeout(() => { setNotification('') }, 3000);
        }
    }

    const handleUpdate = (id) => {
        navigate(`/patient/${id}`)
    }

    return (
        <div>
            <Navbar />

            <div className="page bg-primary bg-light full pt-5 flex-col gap">
                <Link className="navlink-cta w-fit" to="/patients/ajouter">Ajouter un patient</Link>
                <div>
                    <form action="" className="flex gap">
                        <input onChange={(e) => setRecherche(e.target.value)} type="text" className="input" placeholder="Rechercher un patient" />
                    </form>
                    {
                        recherche.length !== 0 && <p className="text-white mt-3 fwb">Resultat: {resultatFiltre.length}</p>
                    }
                </div>
                <h1 className="text-white">Liste des patients</h1>
                <table className="w-full bg-light" style={{ overflow: "scroll" }}>
                    <thead className="thead">
                        <tr>
                            <th>N°</th>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Sexe</th>
                            <th>Date de consultation</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="tr">
                        {
                            patients.length === 0 && <tr style={{ height: "100px" }}><td colSpan={7} className="text-center">Aucun patient enregistré</td></tr>
                        }
                        {
                            resultatFiltre.length === 0 && <tr style={{ height: "100px" }}><td colSpan={7} className="text-center">Aucun patient correspondant</td></tr>
                        }

                        {resultatFiltre.map(p => (
                            <tr key={p._id}>
                                <td className="text-center">{p.no}</td>
                                <td><Link className="tdn" to={"/details/" + p._id}>{p.nom}</Link></td>
                                <td>{p.prenom}</td>
                                <td className="text-center">{p.email}</td>
                                <td className="text-center">{p.age}</td>
                                <td className="text-center">{p.sexe}</td>
                                <td className="text-center">{p.dateConsultation}</td>
                                <td className="flex justify-center gap p-5">
                                    <button onClick={() => handleUpdate(p._id)} className="btn-primary2" ><i className="fas fa-edit fa-lg"></i></button>
                                    <button onClick={() => handleDelete(p._id)} className="btn-danger"><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {
                    notification && <div className="succes-message" style={{ backgroundColor: "crimson" }}>{notification}</div>
                }
            </div>
        </div>
    );
}