export const zeroPad = (number: number) => (number < 10 ? '0' + number : number.toString())
export const frendlyDate = (date: string) => {
    if (date) {
        return `${date.split('T')[0].split('-').reverse().join('/')} às ${date.split('T')[1].split('.')[0].slice(0, 5)}`
    }
    return
}

export const frendlyPhone = (phone: string) => {
    if (phone) {
        return `${phone.slice(0, 2)} ${phone.slice(2, 7)}-${phone.slice(7, 11)}`
    }
    return
}

export const toDateString = (date: Date) => `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`