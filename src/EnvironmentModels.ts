import { User } from "./User";

export type Environment = {
    tenants: [{ key: string, Tenant: Tenant }];
};

export type Tenant = {
    Users?: User[];
};
