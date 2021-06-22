import {startPomodoro} from "./pomodoro";
import {toggleView} from "./main";

export function start() {
    ['focus', 'short-break', 'long-break', 'long-break-interval'].forEach(option => localStorage.setItem(option, getOption(option)))

    startPomodoro()
    toggleView()
}

export function initOptions() {
    ['focus', 'short-break', 'long-break', 'long-break-interval'].forEach(option => {
        const value = localStorage.getItem(option)

        if (!value) {
            return
        }

        setOption(option, value)
    })
}

/**
 * @param {string} option
 */
export function getOption(option) {
    return document.getElementById(`${option}-option`).value
}

function setOption(option, value) {
    document.getElementById(`${option}-option`).value = value
}
