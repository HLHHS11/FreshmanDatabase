import {Info} from "./typedef.js"

/**
 * ここに記載のプロパティ以外にも、requestに応じて新たなプロパティを追加する可能性がある
 * @typedef {Object} ModelRequest
 * @property {Info} info
 * @property {String} request
 * @property {Number} timestamp
 * @property {Object} option
 */
export class ModelRequest {

    /**
     * Infoオブジェクト以外は、各関数内でやってもいいのでは
     * @param {Info} info 
     * @param {String} request - "create", "read", "update", "delete"
     * @param {Object} option - and/or検索などのオプションが必要なときに使用
     */
    constructor (info, request, option={}) {
        this.info = info;
        this.request = request;
        this.timestamp = Date.now();
        this.option = option;
    }

}