import {startPomodoro} from "./pomodoro";
import {toggleView} from "./main";

export function start() {
    ['focus', 'short-break', 'long-break', 'long-break-interval'].forEach(option => localStorage.setItem(option, getOption(option)))

    startPomodoro()
    toggleView()
}

export async function enableNotifications() {
    if (Notification.permission !== 'granted') {
        await Notification.requestPermission()
        updateNotificationButton()
    }
}

export function updateNotificationButton() {
    const button = document.getElementById('notify-button')

    if (Notification.permission === 'granted') {
        button.classList.add('hidden')
    } else {
        button.classList.remove('hidden')
    }
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
