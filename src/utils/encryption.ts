import CryptoJS from 'crypto-js';
const encryptData  = (data:any , secretKey:string) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data),secretKey).toString();
}

const decryptData = (cipherText:any , secretKey:string) => {
    const bytes = CryptoJS.AES.decrypt(cipherText , secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export {
    encryptData,
    decryptData
}