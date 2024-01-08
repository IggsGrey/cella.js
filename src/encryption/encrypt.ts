import CryptoJS from 'crypto-js';


// Encrypt
export const applyEncrypt = (text: string, secret: string): string => {
	return CryptoJS.AES.encrypt(text, secret).toString();
};

// Decrypt
export const applyDecrypt = (cipherText: string, secret: string): string => {
	const bytes = CryptoJS.AES.decrypt(cipherText, secret);
	return bytes.toString(CryptoJS.enc.Utf8);
};


