export default class User {

    private _id: string;
    private _userName: string;
    private _token: string;
    private _contacts: any[];
    private _conversations: any[];

    constructor(id: string, userName: string, email: string, token: string, contacts: any, conversations: any) {
        this._id = id;
        this._userName = userName;
        this._token = token;
        this._contacts = contacts;
        this._conversations = conversations;
    }


    getId(): string {
        return this._id;
    }

    setId(value: string) {
        this._id = value;
    }

    getUserName(): string {
        return this._userName;
    }

    setUserName(value: string) {
        this._userName = value;
    }


    getToken(): string {
        return this._token;
    }

    setToken(value: string) {
        this._token = value;
    }

    getContacts(): any[] {
        return this._contacts;
    }

    setContacts(value: any[]) {
        this._contacts = value;
    }

    getConversations(): any[] {
        return this._conversations;
    }

    setConversations(value: any[]) {
        this._conversations = value;
    }
}