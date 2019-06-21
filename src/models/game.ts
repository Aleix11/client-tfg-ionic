export class Game {
    _id: string;
    gameId: string;
    gameStartTime: number = 0;
    gameMode: string;
    region: string;
    participants: [{
        encryptedSummonerId: string;
        summonerName: string;
        team: number; //100-blue 200-red
        championId: number
    }]
}