export type ProfileOptionsInput = {
    dob: string;
    location: string;
    discipline: string;
    hardestBoulder: number;
    hardestRoute: number;
    height:number;
    weight:number;
    maxHang: number;
    maxPull: number;
    experience:string;
    favLocation:string;
}

export type ProfileInformation = {
    user: {
        email: string;
        profileInformation: ProfileOptionsInput;
    }
}

export type ConnectedAccounts = {
    tensionBoard: string,
    grasshopperBoard: string,
    kilterBoard:  string
}