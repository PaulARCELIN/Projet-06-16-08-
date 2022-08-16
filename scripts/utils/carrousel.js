function createCarrousel(media, photoList, mediaList) {

   
    // On récupère la liste des médias sous forme d'array
    const list = Array.from(photoList)
    // On récupère l'index du média séléctionné dans la liste médias 
    let index = list.indexOf(media)
    
    // On récupère les différentes infos nécessaires du média séléctionné
    let actualMedia = list[index] 
    let source = actualMedia.getAttribute('src')
    let mediaType = source.split(".").pop()
    let title = mediaList[index].title


    // On crée le contenant
    const container = document.createElement('div');
    container.classList.add('carrousel-container');
    container.setAttribute('aria-label', "image closeup view");
    
    
    
    // Fonction pour determiné le type de média et crée son bloc. 
    function createPicture() {
        // Bloc pour "jpg"
        if (mediaType == "jpg") {
            const picture = document.createElement('img');
            picture.classList.add('carrousel-picture');
            picture.setAttribute('src', list[index].getAttribute('src'))
            picture.setAttribute('alt', title)
            return picture
        }
        // Bloc pour "mp4"
        else if (mediaType == "mp4") {
            const picture = document.createElement('video');
            picture.classList.add('carrousel-picture');
            picture.setAttribute("controls", true);
            picture.setAttribute('src', list[index].getAttribute('src'))
            picture.setAttribute('alt', title)
            return picture
        }
    }

    // On assigne l'image au contenant avec la source récupérée et le mediatype
    let picture = createPicture();
    container.appendChild(picture);
    
    // On crée le titre de la photo
    const photoTitle = document.createElement('p')
    photoTitle.classList.add('carrousel-photo-title')
    photoTitle.innerHTML = title
    container.appendChild(photoTitle);
    
    // On crée le bouton "close" et sa fonction 
    const closeButton = document.createElement('i');
    closeButton.classList.add('carrousel-close-button');
    closeButton.classList.add('fa-solid', 'fa-xmark');
    closeButton.setAttribute('role', 'button');
    closeButton.setAttribute('aria-label', 'Close dialog');
    // Fonction pour quitter le carrousel
    closeButton.onclick = () =>  {
        const carrousel = document.getElementById('carrousel');
        carrousel.style.display = "none";
        document.removeEventListener('keydown', callBack)
    }
    container.appendChild(closeButton);


    // On crée l'icone "next" 
    const nextButton = document.createElement('i');
    nextButton.classList.add('carrousel-next-button');
    nextButton.classList.add('fa-solid', 'fa-chevron-right');
    nextButton.setAttribute('role', 'link');
    nextButton.setAttribute('aria-label', 'Next image');
    // On attribue la fonction sur le onclick
    nextButton.onclick = nextPhoto;
    function nextPhoto() {
        container.style.opacity = "0";
        setTimeout(function () {
            if (index >= list.length - 1) {
                index = 0
            }
            else {
                index = index + 1
            }
            actualMedia = list[index]
            source = actualMedia.getAttribute('src')
            mediaType = source.split(".").pop()
            title = mediaList[index].title
            photoTitle.innerHTML = title
            picture = createPicture()
            container.innerHTML = "";
            container.appendChild(photoTitle)
            container.appendChild(picture);
            container.appendChild(closeButton);
            container.appendChild(nextButton);
            container.appendChild(previousButton); 
            container.style.opacity = "1";
        }
        , 300)}
    container.appendChild(nextButton);
    
    // On crée l'icone "previous" 
    const previousButton = document.createElement('i');
    previousButton.classList.add('carrousel-previous-button');
    previousButton.classList.add('fa-solid', 'fa-chevron-left');
    previousButton.setAttribute('role', 'link');
    previousButton.setAttribute('aria-label', 'Previous image');
    // On attribue la fonction sur le onclick
    previousButton.onclick = previousPhoto;
    function previousPhoto() {
        container.style.opacity = "0";
        setTimeout(function () {
            if (index <= 0) {
                index = list.length - 1
            }
            else {
                index = index - 1
            }
            actualMedia = list[index]
            source = actualMedia.getAttribute('src')
            mediaType = source.split(".").pop()
            title = mediaList[index].title
            photoTitle.innerHTML = title
            picture = createPicture()
            container.innerHTML = "";
            container.appendChild(photoTitle)
            container.appendChild(picture);
            container.appendChild(closeButton);
            container.appendChild(nextButton);
            container.appendChild(previousButton);
            container.style.opacity = "1";
    }
    , 300)}
    container.appendChild(previousButton);
    
    // On ajoute un addEventListener afin de diriger le carrousel par les touches du clavier
    document.addEventListener('keydown', function callBack(event) {
        // On récupère la touche appuyée par l'utilisateur 
        let keyName = event.key
        console.log(keyName)
        // On attribue les fonctions correspondantes 
        if(keyName === "ArrowLeft") {
            previousPhoto()
        }
        else if(keyName === "ArrowRight") {
            nextPhoto()
        }
        else if(keyName === "Escape") {
            const carrousel = document.getElementById('carrousel');
            carrousel.style.display = "none";
            document.removeEventListener('keydown', callBack)
        };
    });
    
    
    return container
}; 

