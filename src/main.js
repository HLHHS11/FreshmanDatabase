import {Init} from "./init.js";
import {View} from "./view.js";


const PROFILE_MAP = {
    nickname:0,
    name:1,
    department:3,
    experience:4,
    years:5,
    contact:6,
    comment:7,
    status:8
}



const viewTop = document.getElementById("view-top");
new Init(new View(viewTop)).init();

for (let i=0; i<2; i++) {
    const template = document.getElementById("view-template");
    const clone = template.content.cloneNode(true);
    const outerElem = document.createElement("div");
    const containerElem = document.getElementsByClassName("container-fluid")[0];
    outerElem.id = `view${String(i)}`;
    outerElem.appendChild(clone);
    containerElem.appendChild(outerElem);
}



