export function addQuery(ctx, next) {
    if (ctx.querystring != '') {
        ctx.search = ctx.querystring.split('=')[1]
    } else {
        ctx.search = ''
    }

    next()
}