export type User = {
    id: number;
    uid: string;
    name: string;
    mobile: string;
    balance:number;
    is_guest:boolean;
    verify_at: string | null;
    created_at: string;
    updated_at: string;
    // [key: string]: unknown; // This allows for additional properties...
};

export type Auth = {
    user: User;
};

export type BankAccountType = {
    id : number ;
    user_id : number;
    name : string;
    bank_account_no :string;
    ifsc : string;
    status : boolean;
    created_at: string;
    updated_at: string;
}
