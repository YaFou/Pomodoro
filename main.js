import './app.css'
import {enableNotifications, initOptions, start, updateNotificationButton} from "./options";
import {continueTimer, pause, resume, stop} from "./pomodoro";

document.getElementById('start-button').addEventListener('click', start)
document.getElementById('continue-button').addEventListener('click', continueTimer)
document.getElementById('stop-button').addEventListener('click', stop)
document.getElementById('pause-button').addEventListener('click', pause)
document.getElementById('resume-button').addEventListener('click', resume)
document.getElementById('notify-button').addEventListener('click', enableNotifications)

initOptions()
updateNotificationButton()

/**
 * @param {HTMLElement} element
 */
export function toggleVisibility(element) {
    element.classList.toggle('hidden')
}

export function toggleView() {
    toggleVisibility(document.getElementById('options'))
    toggleVisibility(document.getElementById('timer'))
}

/**
 * @param {string} background
 */
export function switchBackground(background) {
    const body = document.getElementById('body')
    body.classList.remove('background-settings')
    body.classList.remove('background-focus')
    body.classList.remove('background-short-break')
    body.classList.remove('background-long-break')
    body.classList.add(`background-${background}`)
}
