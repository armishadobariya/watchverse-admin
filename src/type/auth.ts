export interface LoginPayload {
    email: string;
    password: string;
}
export interface RegisterPayload extends LoginPayload {
    username: string;
}

export interface ForgotPasswordPayload {
    email: string;
}