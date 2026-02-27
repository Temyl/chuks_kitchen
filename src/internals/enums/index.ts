export enum AppEnv {
    PRODUCTION = 'production',
    STAGING = 'staging',
    DEVELOPMENT = 'development',
    TEST = 'test',
}

export enum DURATION {
  SECONDS = 1_000,
  MINUTES = 60 * SECONDS,
  HOURS = 60 * MINUTES,
  DAYS = 24 * HOURS,
}

export enum ID_TYPE {
  EMAIL = 'email',
  REG_NUMBER = 'reg_number',
}

export enum Role {
  CUSTOMER = 'customer',
  ADMIN = 'admin'
}

export enum OrderStatus {
  PENDING = "Pending",
  PREPARING = "Preparing",
  CONFIRMED = "Confirmed",
  OUT_OF_DELIVERY = "Out_of_Delivery",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled"
}
  
