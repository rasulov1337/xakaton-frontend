'use strict';

import APIService from './modules/ApiClient';
import Header from './components/Header/Header';
import './components/precompiled-templates';

const root = document.getElementById('root');
const pageContainer = document.createElement('div');

const headerCallbacks = {
    mainPage: renderMainPage,
    recomendPage: renderRecomendPage,
    bestPage: renderBestPage,
    favouritesPage: renderFavouritesPage,
    profilePage: renderProfilePage,
}

function renderMainPage(): void {
    console.log('me');  
}

function renderRecomendPage(): void {
    console.log('me');  
}

function renderBestPage(): void {
    console.log('me');  
}

function renderFavouritesPage(){
    console.log('me');  
}

function renderProfilePage() {}

const main = async () => {
    const header = new Header(headerCallbacks);
    if (root) header.render(root);

    pageContainer.classList.add('page-container');
    root?.appendChild(pageContainer);
};

main();