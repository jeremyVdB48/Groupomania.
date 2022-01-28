import Connexion from "./components/Connexion"
import Inscription from "./components/Inscription"
import Profil from "./components/Profil"

export default [
    {path: "/connexion", component: Connexion},
    {path: "/inscription", component: Inscription},
    {path: "/modifMembre/:id", component: Profil},

]