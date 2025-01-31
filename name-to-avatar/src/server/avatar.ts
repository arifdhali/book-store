import { createCanvas } from "canvas";
const randomcolor = require("randomcolor");

const generateNameSequence = (name: string, firstLetterPos: number, secondLetterPos: number): string[] => {
    let selectedLetters: string[] = [];

    // MORE EFFICIENT WAY
    if (firstLetterPos <= name.length || firstLetterPos > 0 && secondLetterPos <= name.length || secondLetterPos > 0) {
        let firstChar = name.charAt(firstLetterPos - 1).toUpperCase();
        let secondChar = name.charAt(secondLetterPos - 1).toUpperCase();
        selectedLetters.push(firstChar, secondChar)
    }
    return selectedLetters;
}

const generateColor = (name: string): string => {
    let randomcolorPlate = randomcolor({ seed: name });
    return randomcolorPlate.toString();
}
type AvatarOptions = {
    name?: string,
    size?: number,
    positions?: number[]
}
export const generateAvatarImage = ({ name = 'test', size = 100, positions = [1, 2] }: AvatarOptions) => {
    let generatedName = generateNameSequence(name, positions[0], positions[1]).join("");
    let generatedColor = generateColor(name);

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    let canvas = createCanvas(size * dpr, size * dpr);
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
}

