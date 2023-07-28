import { getUser } from "../utils.js";

export async function updateSession(ctx, next) {
    const user = await getUser()

    ctx.user = user
    next()
}