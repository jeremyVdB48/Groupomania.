`PROJET 7 OPENCLASSROOMS  CREER UN RESAUX SOCIAL JE SUIS PARTI SUR LE PARTAGE ET L'ECRITURE DE MESSAGE J'AI TRAVAILLER AUSSI UN PEU SUR LES COMMENTAIRES `

# Pour ce projet j'ai travaillé avec une base de données SQL pour le backend et avec le framework VUE.js pour le frontend.


# Groupomania.

Pour lancer le backend => nodemon serveur;

Pour lancer le frontend => npm run serve;

///////////////////////////////////////////////

 # MOT DE PASSE CACHE PAR DOTENV (les codes ci-dessous seront changés par d'autres code bien plus compliqués a la fin du projet) =>

SQL_USER= "root"
SQL_PASSWORD=""
SECRET_TOKEN= "superMotDePasseDeLaFolie"

/////////////////////////////////////////////

# Administrateur code => 

Pseudo = Admin
Email = admin@gmail.com
Mot de passe = administrateur1

///////////////////////////////////////////

# APERCU DES TABLES : pour le resaux social GROUPOMANIA.

Table utilisateurs =>

CREATE TABLE `utilisateurs` (
	`id_utilisateur` INT(10) NOT NULL AUTO_INCREMENT,
	`pseudo_utilisateur` VARCHAR(25) NOT NULL ,
	`email_utilisateur` VARCHAR(80) NOT NULL ,
	`password_utilisateur` VARCHAR(255) NOT NULL,
	`administrateur` TINYINT(4) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id_utilisateur`) 
)

Table posts =>

CREATE TABLE `posts` (
	`id_post` INT(10) NOT NULL AUTO_INCREMENT,
	`texte_post` TEXT NOT NULL ,
	`date_post` DATETIME NULL DEFAULT NULL,
	`id_utilisateur_post` INT(10) NOT NULL,
	PRIMARY KEY (`id_post`) 
)

Table commentaire_post =>

CREATE TABLE `commentaire_post` (
	`id_commentaire` INT(11) NOT NULL AUTO_INCREMENT,
	`id_utilisateur` INT(11) NOT NULL,
	`id_post` INT(11) NOT NULL,
	`date_commentaire_post` DATETIME NOT NULL,
	`commentaire` TEXT NOT NULL ,
	PRIMARY KEY (`id_commentaire`) 
)

Table partage_post =>

CREATE TABLE `partage_post` (
	`id_partage` INT(11) NOT NULL AUTO_INCREMENT,
	`id_utilisateur_partage` INT(11) NOT NULL,
	`id_post_partage` INT(11) NOT NULL,
	`date_partage_post` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id_partage`) 
)