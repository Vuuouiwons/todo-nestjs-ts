import { User } from "src/common/database/user.entity";

export interface TodolistI {
    title: string;
    status: boolean,
    user: User
}