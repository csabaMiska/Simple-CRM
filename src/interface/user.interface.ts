export interface User {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: number | null;
    address: string;
    zipCode: number | null;
    city: string;
    id?: string;
}