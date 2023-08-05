export async function onApply(ctx) {
    const offerId = ctx.params.id

    try {
        const applied = await offerService.apply({ offerId })
        console.log(applied)
        ctx.page.redirect(`/details/${offerId}`)
    } catch (error) {
        alert(error.message)
    }
}

