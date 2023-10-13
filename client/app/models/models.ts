
export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UserCredentials {
    email: string;
    password: string;
}
export interface Speaker {
    id: string;
    name: string;

}

export interface Seminar {
    _id: string;
    id: number;
    title: string;
    description: string;
    startsAt: string;
    endsAt: string;
    speakers: Speaker[];
    room: string;
    day: string;
    format: string;
    track: string;
    level: string;
}