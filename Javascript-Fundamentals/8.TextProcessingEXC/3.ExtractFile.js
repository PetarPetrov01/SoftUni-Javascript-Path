function extractFile(input) {
    let dashIndex = input.lastIndexOf(`\\`)

    let file = input.slice(dashIndex + 1)
    let dotIndex = file.lastIndexOf('.')
    let extension = file.substring(dotIndex + 1)

    file = file.substring(0, dotIndex)

    console.log(`File name: ${file}`)
    console.log(`File extension: ${extension}`)
}
extractFile('C:\\Internal\\training-internal\\Template.pptx')