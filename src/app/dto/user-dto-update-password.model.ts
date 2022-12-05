export class UserDTOUpdatePassword{

    id: number;
    username: string;
    password: string;
    repeatedPassword: string;

    constructor(id: number, username: string, password: string, repeatedPassword: string){
        
        this.id = id;
        this.username = username;
        this.password = password;
        this.repeatedPassword = repeatedPassword;
    }
}