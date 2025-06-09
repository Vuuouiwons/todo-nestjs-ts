import { Todolist } from "../entities/todolist.entity"

export const todolistMap = (todolist: Todolist) => {
    return {
        id: todolist.id,
        title: todolist.title,
        status: todolist.status
    }
}