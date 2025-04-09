
export interface EditProfilePayload {
    email: string;
    username: string;
    phone_number?: string | undefined;
}

export interface ChangePasswordPayload {
    password: string;
    newPassword: string;
}