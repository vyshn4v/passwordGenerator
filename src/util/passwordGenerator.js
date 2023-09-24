const CAPITAL_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SMALL_LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*_-+="
export const generatePassword = (length = 6, hasNumbers = true, hasSymbols = true, hasSmallLetters = true, hasCapitalLetters = true) => {
    let char = '';
    hasCapitalLetters ? (char += CAPITAL_LETTERS) : ''
    hasNumbers ? (char += NUMBERS) : ''
    hasSmallLetters ? (char += SMALL_LETTERS) : ''
    hasSymbols ? (char += SYMBOLS) : ''
    return generateRandomPassword(length, char)
}

const generateRandomPassword = (length, char) => {
    let password = '';
    for (let i = 0; i <  length; i++) {
        password += char.charAt(Math.floor(Math.random() * char.length))
    }
    return password
}