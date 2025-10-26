/**
 * Fonction principale pour charger le fichier XML de Netflop
 */
function chargerNetflopXml() {
  // Créer un nouvel objet XMLHttpRequest
  let xhr = new XMLHttpRequest();

  // Configurer la requête
  // "GET" : méthode HTTP pour récupérer des données
  // "netflop.xml" : fichier XML à charger
  // true : requête asynchrone (ne bloque pas le navigateur)
  xhr.open("GET", "netflop.xml", true);

  // Définir le gestionnaire pour l'événement "load" (fin du chargement)
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Vérifier que la requête a réussi
      // Parser le texte XML avec DOMParser
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");

      // Afficher chaque catégorie
      afficherFilmsXML(xmlDoc);
      afficherSeriesXML(xmlDoc);
      afficherDocumentairesXML(xmlDoc);
      afficherMangaXML(xmlDoc);
      afficherAnimeXML(xmlDoc);
      afficherShowXML(xmlDoc);
      afficherConcertXML(xmlDoc);

      console.log("XML chargé avec succès :", xmlDoc);
    } else {
      console.error(
        "Erreur lors du chargement du fichier XML :",
        xhr.status,
        xhr.statusText
      );
    }
  };

  // Gestion des erreurs réseau
  xhr.onerror = function () {
    console.error("Erreur réseau lors du chargement du fichier XML");
    alert("Impossible de charger les données. Vérifiez votre connexion !");
  };

  // Envoyer la requête
  xhr.send();
}

/**
 * Fonction générique pour afficher une section
 * @param {Document} xmlDoc - Document XML parsé
 * @param {string} sectionId - ID de la section HTML (ex: "films")
 * @param {string} tagName - Nom de la balise XML (ex: "film")
 */
function afficherSectionXML(xmlDoc, sectionId, tagName) {
  // Récupérer le conteneur des cartes dans la section
  let container = document.getElementById(sectionId + "-container");

  // Récupérer tous les éléments XML correspondant à la catégorie
  let elements = xmlDoc.getElementsByTagName(tagName);

  // Parcourir chaque élément et créer sa carte
  for (let i = 0; i < elements.length; i++) {
    container.appendChild(creerCarteXML(elements[i]));
  }
}

/**
 * Fonctions spécifiques pour chaque catégorie
 * Elles utilisent la fonction générique afficherSectionXML
 */
function afficherFilmsXML(xmlDoc) {
  afficherSectionXML(xmlDoc, "films", "film");
}

function afficherSeriesXML(xmlDoc) {
  afficherSectionXML(xmlDoc, "series", "serie");
}

function afficherDocumentairesXML(xmlDoc) {
  afficherSectionXML(xmlDoc, "documentaires", "documentaire");
}

function afficherMangaXML(xmlDoc) {
  afficherSectionXML(xmlDoc, "mangas", "manga");
}

function afficherAnimeXML(xmlDoc) {
  afficherSectionXML(xmlDoc, "animes", "anime");
}

function afficherShowXML(xmlDoc) {
  afficherSectionXML(xmlDoc, "show", "show");
}

function afficherConcertXML(xmlDoc) {
  afficherSectionXML(xmlDoc, "concert", "concert");
}

/**
 * Fonction pour créer une carte à partir d'un élément XML
 * @param {Element} item - Élément XML (film, série, etc.)
 * @returns {HTMLElement} - Élément div représentant la carte
 */
function creerCarteXML(item) {
  // Créer le conteneur de la carte
  let card = document.createElement("div");
  card.className = "card";

  // Récupérer les informations depuis le XML
  let url = item.getElementsByTagName("url")[0].textContent; // URL de l'image
  let nom = item.getElementsByTagName("nom")[0].textContent; // Nom du film/série/etc.

  // Créer l'image de la carte
  let img = document.createElement("img");
  img.src = url;
  img.alt = nom;
  img.className = "card-image";

  // Ajouter l'image à la carte
  card.appendChild(img);

  // Ajouter un clic sur la carte pour rediriger vers la page de détails
  let itemId = item.getAttribute("id");
  let itemType = item.tagName.toLowerCase();
  if (itemId && itemType) {
    card.onclick = function () {
      // Redirection vers details.html avec ID et type dans l'URL
      window.location.href = `./details.html?id=${itemId}&type=${itemType}`;
    };
  }

  return card;
}

/**
 * Attacher l'événement DOMContentLoaded
 * Cette fonction s'exécute lorsque le DOM est entièrement chargé
 */
document.addEventListener("DOMContentLoaded", function () {
  console.log("Le DOM est chargé, lancement de Netflop...");
  chargerNetflopXml();
});
