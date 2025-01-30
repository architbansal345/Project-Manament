export const ConvertDateFromISO = (date:string) => {
    const dateobject  = new Date(date);
    const dateString = dateobject.toISOString().split('T')[0];
    return dateString
}

export const DateToDays = (date:string) => {
    const dateObject = new Date(date);
    const dateTime =  dateObject.getTime();
    const dateDays = dateTime/(1000*3600*24);
    return dateDays
}

export const CapitalizeFirstLetter = (str:string):string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}