export default interface User {

    id: number;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    phone?: string | null;
    created?: string;
}
