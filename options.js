import {startPomodoro} from "./pomodoro";
import {toggleView} from "./main";

export function start() {
    startPomodoro()
    toggleView()
}

/**
 * @param {string} option
 */
export function getOption(option) {
    return document.getElementById(`${option}-option`).value
}
