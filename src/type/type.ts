export interface ApiResponse<T> {
  statusCode: number
  success: boolean
  data: T
}

export interface EditProfilePayload {
  email: string
  username: string
  phone_number?: string | undefined
}

export interface ChangePasswordPayload {
  password: string
  newPassword: string
}
