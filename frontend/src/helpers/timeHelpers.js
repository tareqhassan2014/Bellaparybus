import {getTime, format} from 'date-fns'

export const getTimeStamp = (date) => {
    return getTime(date);
}

export const formatDateString = (date, formatString = 'dd/MM/yyyy') => {
    return format(date, formatString)
}
