import {Info} from "./typedef.js"

/**
 * ここに記載のプロパティ以外にも、requestに応じて新たなプロパティを追加する可能性がある
 * @typedef {Object} ModelRequest
 * @property {String} request
 * @property {Info} info
 * @property {Number} timestamp
 * @property {Object} option
 */
export class ModelRequest {

    /**
     * Infoオブジェクト以外は、各関数内でやってもいいのでは
     * @param {String} request - "create", "read", "update", "delete"
     * @param {Info} info 
     * @param {Object} option - and/or検索などのオプションが必要なときに使用
     */
    constructor (request, info, option={}) {
        this.request = request;
        this.info = info;
        this.timestamp = Date.now();
        this.option = option;
    }

}