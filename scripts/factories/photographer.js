function photographerFactory(data) {
    const { name, portrait, tagline, country, city, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    // Création de la card pour la page index
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        // On précise l'adresse du lien 
        link.setAttribute("href", "photographer.html?id="+id)
        link.setAttribute("aria-label", "Link to" + name + " photographer page");
        link.setAttribute("class", "link");
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture,);
        img.setAttribute("alt", name);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const tag = document.createElement( 'p' );
        tag.textContent = tagline;
        const location = document.createElement( 'h3' );
        location.textContent = city + ", " + country;
        const amount = document.createElement( 'p' );
        amount.textContent = price+"€/jour";
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(location);
        article.appendChild(tag);
        article.appendChild(amount);
        return (article);
    }

    // Création du header pour la page photographer
    function getUserHeaderDOM() {
        
        const headerContainer = document.createElement( 'div' );
        headerContainer.classList.add("header-container");

        const description = document.createElement( 'section' );

        const nameTitle = document.createElement( 'h2' );
        nameTitle.textContent = name;
        description.appendChild(nameTitle);

        const location = document.createElement( 'h3' );
        location.textContent = city + ", " + country;
        description.appendChild(location);

        const tag = document.createElement( 'p' );
        tag.textContent = tagline;
        description.appendChild(tag);

        headerContainer.appendChild(description);
        
        const contactButton = document.createElement( 'button' );
        contactButton.classList.add( 'contact-button' );
        contactButton.setAttribute('aria-label', 'Contact Me')
        contactButton.textContent = "Contactez-moi";
        contactButton.onclick = displayModal;
        headerContainer.appendChild(contactButton);

        const img = document.createElement( 'img' );
        img.classList.add('photo-header');
        img.setAttribute("src", picture,);
        img.setAttribute("alt", name);
        headerContainer.appendChild(img);
    
        const titleModal = document.getElementById('modal-user-name');
        titleModal.textContent = name; 

        return (headerContainer);
    }
    
    return { name, picture, getUserCardDOM, getUserHeaderDOM }
}




const button = document.getElementById( 'photo-button' );