import logo from './logo.svg';
import './App.css';
import ListePatient from './pages/patient/ListePatient';
import './styles/global.css'
import { Route, Routes } from 'react-router-dom';
import ModifierPatient from './pages/patient/ModifierPatient';
import ListeMedecin from './pages/medecin/ListeMedecin';
import AjouterMedecin from './pages/medecin/AjouterMedecin';
import ModifierMedecin from './pages/medecin/ModifierMedecin';
import AjouterPatient from './pages/patient/AjouterPatient';
import ListeRendezvous from './pages/rendezvous/ListeRendezvous';
import ModifierRendezvous from './pages/rendezvous/ModifierRendezvous';
import AjouterRendezvous from './pages/rendezvous/AjouterRendezvous';
import Accueil from './pages/Accueil';
import Details from './pages/Details';
import AdminLogin from './pages/admin/AdminLogin';
import AdminSignup from './pages/admin/AdminSignup';

function App() {
  return (
    <Routes>

      {/* Patient */}
      <Route path='/' element={<Accueil/>} />
      <Route path='/accueil' element={<Accueil/>} />
      <Route path='/patients/liste' element={<ListePatient/>} />
      <Route path='/patients/ajouter' element={<AjouterPatient/>} />
      <Route path='/patient/:id' element={<ModifierPatient/>} />
      
      {/* Médecin */}
      <Route path='/medecin/ajouter' element={<AjouterMedecin/>} />
      <Route path='/medecins/liste' element={<ListeMedecin/>} />
      <Route path='/medecin/:id' element={<ModifierMedecin/>} />
      
      {/* Rendezvous */}
      <Route path='/rendezvous/ajouter' element={<AjouterRendezvous/>} />
      <Route path='/rendezvous/liste' element={<ListeRendezvous/>} />
      <Route path='/rendezvous/:id' element={<ModifierRendezvous/>} />

      {/* Details */}
      <Route path='/details/:id' element={<Details/>} />
     
      {/* Admin */}
      <Route path='/admin/login' element={<AdminLogin/>} />
      <Route path='/admin/signup' element={<AdminSignup/>} />

    </Routes>
  );
}

export default App;
