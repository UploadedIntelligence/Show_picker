export type ILoggedUser =
    | {
        username: string;
        email: string;
        id: number;
    }
    | null;

export type Show = {
    id: number;
    name: string;
    url: string;
}

export type WatchList = {
    id: number;
    name: string;
    shows?: Array<Show>;
}

