import { Link } from "react-router-dom";

export default function Accueil() {
    return (
        <div className="page bg-primary full flex-full">
            <img src="/logopharma.jpg" style={{width: "200px", borderRadius: "10px"}} alt="" />
            <div className="flex-col gap-lg">
                <h1 className="text-white text-center">Bienvenue sur votre application de gestion des patient</h1>
                <div className="flex justify-center">
                    <div className="flex gap">
                        <Link className="box1" to={"/patients/liste"}>Patients</Link>
                        <Link className="text-white box2" to={"/medecins/liste"}>Médecins</Link>
                        <Link className="text-white box3" to={"/rendezvous/liste"}>Rendez-vous</Link>
                    </div>
                </div>
            </div>

            <marquee behavior="" direction="">Gestion efficace de vos patients: infoline: 622 40 26 38 / email: fkipertino@gmail.com / adresse: Matoto/Conakry/Guinée</marquee>
        </div>
    )
}