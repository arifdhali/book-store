"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAvatarImage = void 0;
const canvas_1 = require("canvas");
const randomcolor = require("randomcolor");
const generateNameSequence = (name, firstLetterPos, secondLetterPos) => {
    let selectedLetters = [];
    // MORE EFFICIENT WAY
    if (firstLetterPos <= name.length || firstLetterPos > 0 && secondLetterPos <= name.length || secondLetterPos > 0) {
        let firstChar = name.charAt(firstLetterPos - 1).toUpperCase();
        let secondChar = name.charAt(secondLetterPos - 1).toUpperCase();
        selectedLetters.push(firstChar, secondChar);
    }
    return selectedLetters;
};
const generateColor = (name) => {
    let randomcolorPlate = randomcolor({ seed: name });
    return randomcolorPlate.toString();
};
const generateAvatarImage = ({ name = 'test', size = 100, positions = [1, 2] }) => {
    let generatedName = generateNameSequence(name, positions[0], positions[1]).join("");
    let generatedColor = generateColor(name);
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    let canvas = (0, canvas_1.createCanvas)(size * dpr, size * dpr);
    let ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.fillStyle = generatedColor;
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#ffffff";
    ctx.font = `${size / 2}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(generatedName, size / 2, size / 2);
    return canvas.toDataURL();
};
exports.generateAvatarImage = generateAvatarImage;
