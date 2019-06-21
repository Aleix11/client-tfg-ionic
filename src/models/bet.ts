export class Bet {
    _id: string;
    gameId: string;
    team: string;
    tokens: number;
    duration: number;
    summoner: string = '';
    game: string;
    state: string;
    id: number;
    bettor1: string;
    bettor2: string;
    teamBettor1: string;
    teamBettor2: string;
    timestampBettor1: string;
    timestampBettor2: string;
    addressBettor1: string;
    addressBettor2: string;
}