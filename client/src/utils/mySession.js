/*
 * @Author: Bang
 * @Date: 2020-01-08 18:55:47
 * @LastEditTime : 2020-01-08 18:57:03
 * @LastEditors  : Bang
 * @E-mail: 794531775@qq.com
 * @Company: none
 */
export function setSession(key, value) {
    window.sessionStorage.setItem(key, value);
}
export function getSession(key, value) {
    return window.sessionStorage.getItem(key);
}