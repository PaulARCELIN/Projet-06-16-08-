function createMenu(itemList, itemSelectedCallback = undefined, defaultItem = undefined) {
    
    const menuContainer = document.createElement('div');
    menuContainer.classList.add('menu-container');

    if(defaultItem === undefined) {
        defaultItem = itemList[0];
    }

    const menuButton = document.createElement('button');
    menuButton.classList.add('menu-button');
    menuButton.setAttribute("role", "button");
    menuButton.setAttribute("aria-haspopup", "listbox");
    menuButton.setAttribute("aria-expanded", "");
    menuButton.onclick = () => {
        if(buttonIcon.classList.contains('fa-chevron-down')) {
            buttonIcon.classList.remove('fa-chevron-down');
            buttonIcon.classList.add('fa-chevron-up');
            menuList.style.display = "block";
        }
        else {
            buttonIcon.classList.add('fa-chevron-down');
            buttonIcon.classList.remove('fa-chevron-up');
            menuList.style.display = "none";
        }
    };

    const buttonValue = document.createElement('p');
    buttonValue.textContent = defaultItem;
    menuButton.appendChild(buttonValue);

    const buttonIcon = document.createElement('i');
    buttonIcon.classList.add('fa-solid', 'fa-chevron-down');
    menuButton.appendChild(buttonIcon);

    

    const menuList = document.createElement('ul');
    menuList.classList.add('menu-list');
    menuList.setAttribute('role', 'listbox');
    menuList.setAttribute('aria-activedescendant', '');
    menuList.setAttribute('aria-selected', '');
    menuList.style.display = "none";

    menuContainer.appendChild(menuButton);
    menuContainer.appendChild(menuList);

    itemList.forEach(item => {
        const option = document.createElement('li');
        option.textContent = item;
        option.setAttribute("tabindex", 1)
        option.onclick = function test() {
            menuList.style.display = "none";
            buttonValue.textContent = item;
            buttonIcon.classList.add('fa-chevron-down');
            buttonIcon.classList.remove('fa-chevron-up');
            if(itemSelectedCallback)
                itemSelectedCallback(item);
        }; 
        menuList.appendChild(option);
    });

    return menuContainer;
} 