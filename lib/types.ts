export interface Member {
    id: string;
    name: string;
    profession: string;
    permanentAddress: string;
    currentAddress: string;
    skills: string[];
    phone: string;
    email: string | null;            // changed from "?" to "| null"
    facebookProfile: string | null;  // changed from "?" to "| null"
    createdAt: Date;
}

export interface MemberFormData {
    name: string
    profession: string
    permanentAddress: string
    currentAddress: string
    skills: string[]
    phone: string
    email?: string
    facebookProfile?: string
    secretCode: string
    password: string
}

