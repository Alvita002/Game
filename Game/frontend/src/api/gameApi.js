import axios from "axios";

const baseUrl = 'http://localhost:8081';

export function postGameStep(gameData) {
    axios
        .post(baseUrl + '/game-data', { gameData })
        .catch((error) => {
            console.log(error);
        });
}

export function getGameData() {
    return axios
        .get(baseUrl + '/game-data')
        .then(response => response.data)
        .catch((error) => {
            console.log(error);
        });
}

export function postMessageToLog(message) {
    return axios
        .post(baseUrl + '/add-to-log', { message })
        .then(response => response.data)
        .catch((error) => {
            console.log(error);
        });
}

export function resetGame() {
    return axios
        .put(baseUrl + '/reset')
        .then(response => response.data)
        .catch((error) => {
            console.log(error);
        });
}