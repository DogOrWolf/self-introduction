// utils/encrypt.ts
import CryptoJS from 'crypto-js';

// 密钥和偏移量（前后端约定，建议从环境变量读取，不要硬编码）
const SECRET_KEY = import.meta.env.VITE_ENCRYPT_KEY || '1234567890123456'; // 16位（AES-128）/24位/32位
const IV = import.meta.env.VITE_ENCRYPT_IV || '1234567890123456'; // 固定16位

/**
 * AES-CBC 加密函数
 * @param data 要加密的参数（对象/字符串）
 * @returns 加密后的Base64字符串
 */
export const aesEncrypt = (data: object | string) => {
    try {
        // 统一转为JSON字符串
        const dataStr = typeof data === 'object' ? JSON.stringify(data) : data;
        // 转换密钥和偏移量为CryptoJS格式
        const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
        const iv = CryptoJS.enc.Utf8.parse(IV);
        // 加密（CBC模式，PKCS7填充）
        const encrypted = CryptoJS.AES.encrypt(dataStr, key, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        // 返回Base64编码的加密结果
        return encrypted.toString();
    } catch (error) {
        console.error('参数加密失败:', error);
        return '';
    }
};

/**
 * AES-CBC 解密函数（前端调试/服务端对接用）
 * @param encryptedStr 加密后的字符串
 * @returns 解密后的原始数据
 */
export const aesDecrypt = (encryptedStr: string) => {
    try {
        const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
        const iv = CryptoJS.enc.Utf8.parse(IV);
        const decrypted = CryptoJS.AES.decrypt(encryptedStr, key, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        // 转为UTF8字符串并尝试解析JSON
        const result = decrypted.toString(CryptoJS.enc.Utf8);
        return result ? JSON.parse(result) : '';
    } catch (error) {
        console.error('参数解密失败:', error);
        return '';
    }
};
