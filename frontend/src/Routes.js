import Vue from 'vue'
import VueRouter from "vue-router"

Vue.use(VueRouter)

import Connexion from "./components/PageWeb/Connexion"
import Inscription from "./components/PageWeb/Inscription"
import Profil from "./components/PageWeb/Profil"
import Tchat from "./components/PageWeb/Tchat"

export default [
    {path: "/connexion", component: Connexion},
    {path: "/inscription", component: Inscription},
    {path: "/modifMembre/:id", component: Profil},
    {path : "/", component: Tchat}

]