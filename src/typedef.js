export * from "./typedef.js";

/**
 * 230309 _idプロパティを追加
 * @typedef {Object} Info
 * @property {string} name
 * @property {string} nickname
 * @property {string} department
 * @property {string} experience
 * @property {string} years
 * @property {string} hometown
 * @property {string} contact
 * @property {string} status
 * @property {string} schedule
 * @property {string} comment
 * @property {string} id
 */

/** @type {Info} */
export const Info = {};




/**
 * @typedef {Object} ModelResponse
 * @property {String} request
 * @property {String} status
 * @property {Info[]} infoArr
 * @property {Object} option
 */
export const ModelResponse = {};
