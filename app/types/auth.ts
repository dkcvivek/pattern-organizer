export type User = {
    id: number;
    name: string;
    designation: string;
}

export type AuthResponse ={
    acess: string;
    refresh: string;
    user: User;
}