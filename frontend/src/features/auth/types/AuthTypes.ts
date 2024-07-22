export type LoginInputs = {
    email: string;
    password: string;
}

export type RegisterInputs = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
}

export type User = {
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
}
