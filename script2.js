// Récupère les paramètres de l'URL (ex : ?id=film_1&type=film)
function getUrlParams() {
  let params = new URLSearchParams(window.location.search);
  return {
    id: params.get("id"), // récupère l'ID du film/serie/etc
    type: params.get("type"), // récupère le type (film, serie, documentaire...)
  };
}

// Cherche dans le JSON l'élément correspondant à l'ID et au type
function chercherItemParType(data, itemId, itemType) {
  // On mappe le type exact de l'URL à la clé JSON correspondante
  const categoryMap = {
    film: data.netflop.films.film,
    serie: data.netflop.series.serie,
    documentaire: data.netflop.documentaires.documentaire,
    manga: data.netflop.mangas.manga,
    anime: data.netflop.animes.anime,
    show: data.netflop.shows.show,
    concert: data.netflop.concerts.concert,
  };

  // Récupère le tableau correspondant au type
  const tableau = categoryMap[itemType];
  if (!tableau) {
    console.error("Type non reconnu :", itemType);
    return null;
  }

  // Cherche l'élément avec l'id correspondant
  return tableau.find((element) => element.id === itemId) || null;
}

// Charge le JSON et affiche le détail
function chargerItemDetail() {
  let params = getUrlParams(); // récupère id et type dans l'URL
  let itemId = params.id;
  let itemType = params.type;

  console.log("ID :", itemId, "Type :", itemType); // Affiche les paramètres

  // Création d'une requête HTTP pour charger le JSON
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "netflop.json", true); // true = asynchrone

  xhr.onload = function () {
    if (xhr.status === 200) {
      // JSON reçu avec succès
      let data = JSON.parse(xhr.responseText); // transforme le JSON en objet JS
      let item = chercherItemParType(data, itemId, itemType); // cherche l'élément
      console.log("Élément trouvé :", item);
      afficherDetail(item); // affiche le détail sur la page
    } else {
      console.error("Erreur lors du chargement du fichier JSON");
    }
  };

  xhr.onerror = function () {
    console.error("Erreur réseau lors du chargement du fichier JSON");
    alert("Impossible de charger les données. Vérifiez votre connexion !");
  };

  xhr.send(); // envoie la requête
}

// Affiche le détail de l'élément dans le DOM
function afficherDetail(item) {
  if (!item) {
    // Si aucun élément trouvé
    console.error("Aucun élément à afficher");
    return;
  }

  // Création de la carte
  let card = document.createElement("div");
  card.className = "card";

  // Image
  let img = document.createElement("img");
  img.src = item.url;
  img.alt = item.nom;
  img.className = "card-image";

  // Conteneur pour les infos texte
  let infoDiv = document.createElement("div");
  infoDiv.className = "card-info";

  // Titre
  let titreElement = document.createElement("h3");
  titreElement.textContent = item.nom;

  // Genre
  let genreElement = document.createElement("p");
  genreElement.innerHTML = "<strong>Genre: </strong>" + item.genre;

  // Réalisateur
  let realisateurElement = document.createElement("p");
  realisateurElement.innerHTML =
    "<strong>Réalisateur: </strong>" + item.realisateur;

  // Date de sortie
  let dateElement = document.createElement("p");
  dateElement.innerHTML = "<strong>Date de sortie: </strong>" + item.dateSortie;

  // Résumé
  let resumeContainer = document.createElement("div");
  resumeContainer.className = "resume-container";

  let resumerElement = document.createElement("p");
  resumerElement.className = "resume";
  resumerElement.innerHTML = "<strong>Résumé: </strong>" + item.resumer;

  resumeContainer.appendChild(resumerElement);

  // Assemble tout dans infoDiv
  infoDiv.appendChild(titreElement);
  infoDiv.appendChild(genreElement);
  infoDiv.appendChild(realisateurElement);
  infoDiv.appendChild(dateElement);
  infoDiv.appendChild(resumeContainer);

  // Assemble la carte
  card.appendChild(img);
  card.appendChild(infoDiv);

  // Ajoute la carte dans le DOM
  let maDiv = document.getElementById("detail"); // Récupère le conteneur
  maDiv.innerHTML = ""; // vide le contenu précédent
  maDiv.appendChild(card); // Ajoute la carte
}

// Appel principal pour charger et afficher l'élément
chargerItemDetail();

/*
Changement	Pourquoi / effet

Suppression de getElementsByTagName	On accède directement aux propriétés JSON
 (item.nom, item.genre, etc.)
Correction de categoryMap	Les clés doivent correspondre exactement à ton JSON 
(serie, manga, anime, show, concert)
Ajout de vérification if (!item)	Pour éviter les erreurs si l’ID ou le type est introuvable
Nettoyage du conteneur #detail avant ajout	maDiv.innerHTML = "";
pour éviter d’empiler 
plusieurs cartes
Consolidation des appels	chargerItemDetail() est appelé une seule fois à la fin
Petits console.log pour debug	Affiche ID, type et l’élément trouvé, pour faciliter le suivi */
