export interface User {
    Id: number,
    Email: string,
    FullName: string,
    AvatarUrl: string,
    BirthDate: string,
    Phone: string,
    IsOwner: boolean
}



export interface Board {
    Id: number,
    Name: string,
    BackgroundImage: string,
}

export interface Background {
    url: string
}
export interface List {
    Id: number,
    Title: string,
    Sort: number,
    Cards: Cards[],
    IsOpen: boolean,
    ShowInput: boolean,
}
export interface Cards {
    Id: number,
    Title: string,
    Sort: number,
    Description: string,
    CardStatus: CardStatus,
    ListId: number,
    CreatedBy: CreatedBy
}
export interface CardStatus {
    Name: string,
    Color: string,
}
export interface CreatedBy {
    FullName: string,
    AvatarUrl: string,
    Creatdate: string
}