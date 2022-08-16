// fonction pour afficher la modale
function displayModal() {
    // On retire le tabindex sur les éléments du body
    const img = document.querySelectorAll('.photo')
    console.log(img)
    img.forEach(elem => {
      elem.setAttribute('tabindex', -1);
    });
    const btn = document.querySelectorAll('button')
    btn.forEach(elem => {
      elem.setAttribute('tabindex', '-1');
      console.log(elem)
    });
    const submitBtn = document.getElementById('submit-button');
    submitBtn.setAttribute('tabindex', 0);

    // On récupère et affiche la modale
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    // On récupère affiche le background
    const bg = document.querySelector(".bg-image");
    bg.style.display = "block";
    // On reset le formulaire à l'ouverture de la modale
    document.getElementById("form").reset();
}

// fonction pour fermer la modale
function closeModal() {
    // On remet le tabindex sur les éléments du body
    const img = document.querySelectorAll('.photo')
    console.log(img)
    img.forEach(elem => {
      elem.setAttribute('tabindex', 2);
    });
    const btn = document.querySelectorAll('button')
    btn.forEach(elem => {
      elem.setAttribute('tabindex', 2);
    });
    const submitBtn = document.getElementById('submit-button');
    submitBtn.setAttribute('tabindex', -1);
  
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    const bg = document.querySelector(".bg-image");
    bg.style.display = "none";
}

// On applique cette fonction au bouton Esc
document.addEventListener('keydown', (event) => {
  // On récupère la touche appuyée par l'utilisateur 
  let keyName = event.key
  const modal = document.getElementById("contact_modal");
  if(keyName === "Escape" && modal.style.display === "block") {
    closeModal()
  }
});

// fonction qui vérifie nom et prénom et renvoi true/false
function verifName (value) {
    const regex = /^[a-zA-Z_.+-]*(?:[a-zA-Z][a-zA-Z_.+-]*){2,}$/g;
    if (regex.test(value)) {
      return true;
    }
    else {
      return false;
    }
};

// fonction qui vérifie le mail et renvoi true/false
function verifEmail(value) {
  const EMAIL_REGEX = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "i");
  if (EMAIL_REGEX.test(value)) {
    return true;
  }
  else {
    return false;
  }
}

// On récupère toutes les infos rentrées par l'utilisateur et groupées dans un tableau
let emailValue = document.getElementById("email").value;
let firstNameValue = document.getElementById("firstName").value;
let lastNameValue = document.getElementById("lastName").value;
let allValues = [firstNameValue, lastNameValue, emailValue];

function allVerifs(allVerifs) {
  // On met à jour les infos utilisateur
  emailValue = document.getElementById("email").value;
  firstNameValue = document.getElementById("firstName").value;
  lastNameValue = document.getElementById("lastName").value;
  allValues = [firstNameValue, lastNameValue, emailValue];

  // On effectue toutes les vérifications et renvoi true/false
  allVerifs = [verifEmail(emailValue), verifName(firstNameValue), verifName(lastNameValue)]
  if (allVerifs.includes(false)) {
    return false;
  }
  else {
    return true;
  }
};

// fonction pour envoyer le formulaire
function submitForm (event) {
  const messValue = document.getElementById("message-input").value;
  event.preventDefault();
  // Si toutes les vérifs sont bonnes on envoi le consol.log
  if (allVerifs(allValues)) {
    closeModal();
    console.log(allValues);
    console.log(messValue);
  }
  // Sinon message d'alerte 
  else {
    window.alert("Veuillez indiquer votre nom, votre prénom et une adresse mail valide")
  }
};