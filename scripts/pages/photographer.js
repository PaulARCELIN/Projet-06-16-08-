const ITEM_TO_JSON = {
    "Titre": "title",
    "Date": "date",
    "Popularité": "likes"
}

const DEFAULT_ORDER = "Popularité";

let actualListOrder = DEFAULT_ORDER;
var totalLikes = 0;

//Mettre le code JavaScript lié à la page photographer.html
const getPhotographerData = function(id) {
    // Penser à remplacer par les données récupérées dans le json
    return fetch("./data/photographers.json")
        .then (response => response.json())
        .then(({ photographers, media}) => ({
            photographer: photographers.find(el => el.id === id),
            media: media.filter(({ photographerId}) => photographerId === id)
        }))
        .catch(function() {
        console.log('Polo ya une erreur')    
    });
     
}
 
// Fonction pour afficher le header photographe 
function displayHeader(photographe) {
    const photographersSection = document.getElementById("photo-header");
    const photographerModel = photographerFactory(photographe);
    const userHeaderDOM = photographerModel.getUserHeaderDOM();
    photographersSection.appendChild(userHeaderDOM);
};

// Fonction pour afficher la gallerie
function displayMediaList(mediaList, orderKey=DEFAULT_ORDER) {
    const mediaListContainer = document.getElementById( 'gallery' );
    mediaListContainer.innerHTML = "";
    
    const likesContent = document.createElement('p');
    likesContent.setAttribute('id', 'likesContent');

    actualListOrder = orderKey;

    // fonction qui tri la liste, en comparant deux elements de la liste 
    mediaList.sort((a, b) => {
        // par default on tri par ordre croissant
        // la direction permet de changer lo'ordre de tri au besoin (notament pour popularite)
        let direction = 1;
        
        // On recupere les valeurs dans les objets a et b correspondant a l'ordre de tri
        // On fait correspondre l'ordre de tri et les keys du contenu des objets media du fichier json 
        // Via le tableau d'association ITEM_TO_JSON
        let valueA = a[ITEM_TO_JSON[orderKey]];
        let valueB = b[ITEM_TO_JSON[orderKey]];

        // Si trie par popularite : ordre decroissant 
        if (orderKey === "Popularité")
            direction = -1;
        
        // Resultat de la comparaison de a et b
        // Le resultat de la comparaison peut etre inverse via direction  
        if (valueA > valueB)
            return 1 * direction;
        if (valueB > valueA)
            return -1 * direction;
        
        // Renvoi si la comparaison des valeurs de a et b sont egales
        return 0;
    });

    // Affichage de la liste média seulement si le média est une photo (TODO gérer les vidéos)
    mediaList.forEach(media => {
        const mediaModel = mediaFactory(media);
        mediaListContainer.appendChild(mediaModel.getUserMediaDOM(media));
    });
};


// Fonction pour afficher l'option de tri 
function displayControls(media, photographer) {
    
    const controlsContainer = document.getElementById('controls');
    controlsContainer.innerHTML = "";

    const controlLabel = document.createElement('p');
    controlLabel.classList.add('control-label');
    controlLabel.textContent =" Trier par";
    controlsContainer.appendChild(controlLabel);
    
    // On regroupe les fonctions à rappeler au moment du click sur un élément du menu 
    function callBackFunction(item) {
        totalLikes = 0
        displayMediaList(media, item)
        displayCarrousel(media)
        displayTotalLikes(media, photographer)
    }

    // On récupère le menu avec les paramètres spécifiés
    const orderControl = createMenu(
        //Les différentes options du menu
        ["Popularité", "Date", "Titre"],
        //La fonction callBack
        (item) => callBackFunction(item),
        //L'ordre par défaut
        DEFAULT_ORDER
    );
    controlsContainer.appendChild(orderControl);
}; 

// Fonction pour afficher et gérer le nombre total de likes 
function displayTotalLikes(media, photographer) {
    
    const totalLikesContainer = document.getElementById('totalLikesContainer');
    totalLikesContainer.innerHTML = "";
    const likesContent = document.createElement('p');
    totalLikes = 0
    likesContent.innerHTML = "";
    
    
    //On définit le nombre de click total en aprcourant le tableau des medias
    media.forEach(elem => {
        totalLikes = elem.likes + totalLikes
    });
    // On affiche le total de likes
    likesContent.textContent = totalLikes+"  ♥";

    // On récupére les blocs pour les liker les photos
    const clicLikes = document.querySelectorAll('.photo-likes')
    
    // On écoute le click pour augmenter le nombre total de likes
    // Utilisation de addEventListener car la fonction onclick() déjà utlisée sur ces éléments
    clicLikes.forEach(function totalLikesIncrease(elem) {
        elem.addEventListener('click', function test(){
            //totalLikes++
            likesContent.textContent = totalLikes+"  ♥";
            elem.removeEventListener('click', test);
        });
    });
    
    totalLikesContainer.appendChild(likesContent);
    
    const priceContent = document.createElement('p');
    priceContent.textContent = photographer.price+"€/jour";
    totalLikesContainer.appendChild(priceContent);
};

// Fonction pour afficher le carrousel
function displayCarrousel (mediaList) {
    // On récupère la bloc dans le DOM et on lui attribue un classe
    const carrousel = document.getElementById('carrousel')
    carrousel.classList.add('carrousel')
   
    // On récupère tous les médias affichés
    const picture = document.querySelectorAll('.photo')
    // On attribue sur chaque média le onclick pour créer le carrousel
    picture.forEach(elem => {
        elem.onclick = function openLightbox() {
            // on crée le caroussel avec pour paramètres : 
            // 1) le média cliqué, 2) la liste des médias(sous forme de div), 3) la mediaLiast (sous forme d'objet)
            const carrouselContainer = createCarrousel(elem, picture, mediaList)
            carrousel.innerHTML = "";
            carrousel.style.display = "block";
            carrousel.appendChild(carrouselContainer)
            carrousel.style.transition = "all ease-in-out 2s 1s";
        };
    });
}   


// Fonction pour récupérer l'ID dans l'URL 
function getUrlParam(paramKey) {
    const url = new URL(location.href);
    if(url.search.includes(paramKey)) {
        return url.searchParams.get(paramKey);
    }
    else {
        return undefined
    };
};


async function init() {
    if (getUrlParam("id")) {
        const actualId = parseInt(getUrlParam("id"));  
        // Récupère les datas des photographes
        const { photographer, media } = await getPhotographerData(actualId);
        // Affiche le header après avoir check l'id
        displayHeader(photographer);

        displayControls(media, photographer);

        displayMediaList(media);

        displayTotalLikes(media, photographer);

        displayCarrousel(media);
        
    }
    else {
        window.location.href='http:index.html';
    } 
};

init();
