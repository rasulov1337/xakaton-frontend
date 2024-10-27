"use strict";

import { BookCardData } from "../modules/Types";

interface RegisterParams {
    username: string;
    password: string;
}

interface LoginParams {
    username: string;
    password: string;
}

interface GetBooksQueryParameter {
    startId: number;
    bookName?: string;
    best?: boolean;
}

import Ajax from "./Ajax.ts";

const APIClient = {
    BASE_URL: `http://${window.location.hostname}:8000`,

    async getBooks(params: GetBooksQueryParameter): Promise<BookCardData[]> {
        let url = this.BASE_URL + `/books?start_id=${params.startId}`;
        if (params.bookName) {
            url += `&book_name=${params.bookName}`;
        }

        if (params.best) {
            url += "&best=true";
        }

        const response = await Ajax.get(url);
        const data = await response.json();
        const res = [] as BookCardData[];
        for (const bookData of data) {
            res.push({
                id: bookData.id,
                authorName: bookData.author,
                bookTitle: bookData.name,
            });
        }
        return res;
    },

    async getBook(id: number) {
        const url = this.BASE_URL + "/books/" + id;
        return Ajax.get(url);
    },

    async getRecommendations() {
        const url = this.BASE_URL + "/books/recommendations/";
        const response = await Ajax.get(url);
        const data = await response.json();
        const res = [];
        for (const bookData of data) {
            res.push({
                id: bookData.id,
                authorName: bookData.author,
                bookTitle: bookData.name,
            });
        }
        return res;
    },

    async getText(id: number) {
        const url = `https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`;
        return Ajax.get(url);
    },

    async login({ username, password }: LoginParams) {
        const url = this.BASE_URL + "/users/authentication/";
        const body = {
            username: username,
            password: password,
        };
        return Ajax.post({ url, body });
    },

    async logout() {
        const url = this.BASE_URL + "/users/deauthorization/";
        const body = {};
        return Ajax.post({ url, body });
    },

    async register({ username, password }: RegisterParams) {
        const url = this.BASE_URL + "/users/registration/";
        const body = {
            username: username,
            password: password,
        };

        return Ajax.post({ url, body });
    },
};

export default APIClient;
