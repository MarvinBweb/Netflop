function chargerNetflopXml() {
  // creer un nouvele objet XMLHttpRequest
  let xhr = new XMLHttpRequest();

  // configurer une requete
  // utiliser la methode 'GET' = pour récuper des données
  // le nom du fichiers a charger
  // - true = requete asynchrone (ne bloque pas le navigateur et l'execution du code)
  xhr.open("GET", "netflop.xml", true);

  // définir le gestionnaire d'evenement pour le chargement
  xhr.onload = function () {
    // vérification si la requete réussi
    // status 200 = OK (succès)

    if (xhr.status === 200) {
      // parse le XML avec DOMParser
      // on crée une instance de DOMParser
      let parser = new DOMParser();
      // Parse le texte XML reçu et convertir en document XML
      let xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");

      // Afficher les différentes catégories
      afficherFilmsXML(xmlDoc);
      afficherSeriesXML(xmlDoc);
      afficherDocumentairesXML(xmlDoc);
      afficherMangaXML(xmlDoc);
      afficherAnimeXML(xmlDoc);
      afficherShowXML(xmlDoc);
      afficherConcertXML(xmlDoc);

      console.log(xmlDoc);
    } else {
      console.error("erreur lors du chargement du fichier XML");
      console.error("status :", xhr.status);
      console.error("message :", xhr.statusText);
    }
  };

  // gérer les erreurs réseau
  xhr.onerror = function () {
    console.error("erreur réseau lors du chargement du fichier xml");
    alert("Impossible de charger les données. Vérifier votre connexion !");
  };
  // envoyer la requete
  xhr.send();
}

// chargerNetflopXml();

/**
 *  Fonction pour afficher les films depuis le document XML
 * @param {Document} xmlDoc Document XML parsé par DOMParser
 */

function afficherFilmsXML(xmlDoc) {
  // Récuperer le conteneur HTML ou afficher les films
  let container = document.getElementById("films-container");

  // creer un titre pour la section
  let titre = document.createElement("h2");
  titre.textContent = "Films Populaires";
  container.appendChild(titre);

  // Récuperer TOUS les Elements <film> du XML
  // getElementsByTagName() retourne une collection de tous les élements avec ce nomde balise
  let films = xmlDoc.getElementsByTagName("film");
  console.log(films);

  // parcourir tous les films ( attention films est un HTMLCollection, ducoup pas un vrai tableau !)
  for (let i = 0; i < films.length; i++) {
    let filmCard = creerCarteXML(films[i]);
    container.appendChild(filmCard);
  }
}

function afficherSeriesXML(xmlDoc) {
  // Récuperer le conteneur HTML ou afficher les films
  let container = document.getElementById("series-container");

  // creer un titre pour la section
  let titre = document.createElement("h2");
  titre.textContent = "Séries Populaires";
  container.appendChild(titre);

  // Récuperer TOUS les Elements <film> du XML
  // getElementsByTagName() retourne une collection de tous les élements avec ce nomde balise
  let Series = xmlDoc.getElementsByTagName("serie");
  console.log(Series);

  // parcourir tous les films ( attention films est un HTMLCollection, ducoup pas un vrai tableau !)
  for (let i = 0; i < Series.length; i++) {
    let SeriesCard = creerCarteXML(Series[i]);
    container.appendChild(SeriesCard);
  }
}

function afficherDocumentairesXML(xmlDoc) {
  // Récuperer le conteneur HTML ou afficher les films
  let container = document.getElementById("documentaires-container");

  // creer un titre pour la section
  let titre = document.createElement("h2");
  titre.textContent = "Documentaires Populaires";
  container.appendChild(titre);

  // Récuperer TOUS les Elements <film> du XML
  // getElementsByTagName() retourne une collection de tous les élements avec ce nomde balise
  let Documentaires = xmlDoc.getElementsByTagName("documentaire");
  console.log(Documentaires);

  // parcourir tous les films ( attention films est un HTMLCollection, ducoup pas un vrai tableau !)
  for (let i = 0; i < Documentaires.length; i++) {
    let DocumentairesCard = creerCarteXML(Documentaires[i]);
    container.appendChild(DocumentairesCard);
  }
}

function afficherMangaXML(xmlDoc) {
  let container = document.getElementById("mangas-container"); // pluriel
  let titre = document.createElement("h2");
  titre.textContent = "Mangas Populaires";
  container.appendChild(titre);

  let Mangas = xmlDoc.getElementsByTagName("manga");
  for (let i = 0; i < Mangas.length; i++) {
    container.appendChild(creerCarteXML(Mangas[i]));
  }
}

function afficherAnimeXML(xmlDoc) {
  let container = document.getElementById("animes-container"); // pluriel
  let titre = document.createElement("h2");
  titre.textContent = "Animes Populaires";
  container.appendChild(titre);

  let Animes = xmlDoc.getElementsByTagName("anime");
  for (let i = 0; i < Animes.length; i++) {
    container.appendChild(creerCarteXML(Animes[i]));
  }
}

function afficherShowXML(xmlDoc) {
  let container = document.getElementById("show-container");
  let titre = document.createElement("h2");
  titre.textContent = "Shows Populaires";
  container.appendChild(titre);

  let Shows = xmlDoc.getElementsByTagName("show");
  for (let i = 0; i < Shows.length; i++) {
    container.appendChild(creerCarteXML(Shows[i]));
  }
}

function afficherConcertXML(xmlDoc) {
  let container = document.getElementById("concert-container");
  let titre = document.createElement("h2");
  titre.textContent = "Concerts Populaires";
  container.appendChild(titre);

  let Concerts = xmlDoc.getElementsByTagName("concert");
  for (let i = 0; i < Concerts.length; i++) {
    container.appendChild(creerCarteXML(Concerts[i]));
  }
}

/**
 *  Fonction générique pour creer une carte d'affichage à partir d'un élément XML
 *@param {element} item - element XML (film, série, etc)
 @returns {HTMLElement} - element div representant la carte
 */
function creerCarteXML(item) {
  // Créer la carte
  let card = document.createElement("div");
  card.className = "card";

  // Récupérer l'URL de l'image depuis le XML
  let url = item.getElementsByTagName("url")[0].textContent;
  let nom = item.getElementsByTagName("nom")[0].textContent;

  // Créer l'image
  let img = document.createElement("img");
  img.src = url;
  img.alt = nom;
  img.className = "card-image"; // tu peux styliser avec ton CSS

  // Ajouter l'image à la carte
  card.appendChild(img);

  // Ajouter un clic sur la carte si besoin
  let itemId = item.getAttribute("id");
  let itemType = item.tagName.toLowerCase();
  if (itemId && itemType) {
    card.onclick = function () {
      window.location.href = `./details.html?id=${itemId}&type=${itemType}`;
    };
  }

  return card;
}

/**
 * Charger les données lorsque le dom est completement charger
 * DOMContentLoaded = evenement déclenché lorsque le DOM est charger
 */
document.addEventListener("DOMContentLoaded", function () {
  console.log("Le DOM est chargé, lancement de netflop avec DOMParser...");
  // executer la function chargerNetflopXml
  chargerNetflopXml();
});
