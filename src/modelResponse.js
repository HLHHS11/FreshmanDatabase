import {Info} from "./typedef.js"

/**
 * @typedef {Object} ModelRequest
 * @property {String} request
 * @property {string} status
 * @property {Info[]} infoArr
 * @property {Object} option
 */
export class ModelResponse {

    constructor (request, status, infoArr=[], option={}) {
        this.request = request;
        this.status = status;
        this.infoArr = infoArr;
        this.option = option;
    }

}