import { Link } from "react-router-dom";
import '../styles/global.css'

export default function Navbar() {
  return (
    <div className="navbar1">
        <nav className="">
            <ul className="style-none">
                <li>
                    <Link className="navlink" to="/">Accueil</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}