export class User {
    _id: string;
    username: string;
    password: string;
    email: string;
    address: string;
    privateKey: string;
    token: string;
    reset_password_token: string;
    reset_password_expires: Date;
    friends: string[];
    summoners: string[];
    profilePhoto: string;
    stats: {
        total: number;
        wins: number;
        losses: number;
        ratioWinLose: number;
        userMostBets: string;
        youAreNemesisOf: string;
        yourNemesisIs: string;
    }
}