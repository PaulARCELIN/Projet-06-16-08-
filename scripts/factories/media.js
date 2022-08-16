function mediaFactory(mediaData) {
    const { photographerId, title, image, video } = mediaData;
    
    const picture = `assets/images/${photographerId}/${image}`;
    const film = `assets/images/${photographerId}/${video}`;

    function getUserMediaDOM() {
        const mediaContainer = document.createElement('article');
        mediaContainer.classList.add('media-container');
        
        

        if(image) {
            const photo = document.createElement('img');
            photo.classList.add('photo');
            photo.setAttribute("src", picture);
            photo.setAttribute("alt", title);
            photo.setAttribute("tabindex", 2);
            mediaContainer.appendChild(photo);
           
        }
        else if(video) {
            const video = document.createElement('video');
            video.classList.add('photo');
            video.setAttribute("src", film);
            video.setAttribute("alt", title);
            video.setAttribute("type", "video/mp4");
            video.setAttribute("tabindex", 2)
            mediaContainer.appendChild(video);
        }
            

        const photoDescription = document.createElement('div');
        photoDescription.classList.add('photo-description');
        mediaContainer.appendChild(photoDescription);

        const photoTitle = document.createElement('p');
        photoTitle.classList.add('photo-title');
        photoTitle.textContent = title;
        photoDescription.appendChild(photoTitle);

        const photoLikes = document.createElement('p');
        photoLikes.classList.add('photo-likes');
        photoLikes.setAttribute('aria-label', 'likes');
        photoLikes.textContent = `${mediaData.likes} ♥`;
        photoLikes.onclick = () => {
            mediaData.likes++;
            photoLikes.textContent = `${mediaData.likes} ♥`;
            photoLikes.onclick=null;
            totalLikes++;
        };
        

        photoDescription.appendChild(photoLikes);

        return (mediaContainer);
    }

    return { getUserMediaDOM }
}