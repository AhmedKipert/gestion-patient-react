
export default function PatientCard(patient) {
  return (
    <div>
        <h2>{patient.prenom}</h2>
        <h2>{patient.nom}</h2>
        <h2>{patient.age}</h2>
    </div>
  )
}