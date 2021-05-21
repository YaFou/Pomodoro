import {getOption} from "./options";
import sound from './timer.wav'
import {switchBackground, toggleView, toggleVisibility} from "./main";

export const STATE_POMODORO = 0
export const STATE_SHORT_BREAK = 1
export const STATE_LONG_BREAK = 2

const continueButton = document.getElementById('continue-button')
const pauseButton = document.getElementById('pause-button')
const resumeButton = document.getElementById('resume-button')
const audio = new Audio(sound)
const timerCircle = document.getElementById('timer-circle')
const timerText = document.getElementById('timer-text')

let time = null
let state = null
let interval = null
let longBreakInterval = null
let shortBreakCount = 0
let startTime = null

function advance() {
    if (time === 0) {
        audio.play()
        setNewSequence()
        toggleVisibility(continueButton)
        toggleVisibility(pauseButton)
        clearInterval(interval)

        return
    }

    timerCircle.style.transition = 'stroke-dashoffset 1s linear'
    time--
    updateTimer()
}

function setNewSequence() {
    timerCircle.style.transition = 'stroke-dashoffset 1s'

    if (state !== STATE_POMODORO) {
        setState(STATE_POMODORO)
        setTime(getOption('pomodoro'))
        switchBackground('pomodoro')
        setTimerText('focus')

        return
    }

    shortBreakCount++

    if (shortBreakCount === longBreakInterval) {
        setState(STATE_LONG_BREAK)
        shortBreakCount = 0
        setTime(getOption('long-break'))
        switchBackground('long-break')
        setTimerText('long break')

        return
    }

    setState(STATE_SHORT_BREAK)
    setTime(getOption('short-break'))
    switchBackground('short-break')
    setTimerText('short break')
}

export function startPomodoro() {
    setState(null)
    setNewSequence()
    startNewTimer()
    shortBreakCount = 0
    longBreakInterval = parseInt(getOption('long-break-interval'))
    pauseButton.classList.remove('hidden')
    continueButton.classList.add('hidden')
}

function updateTimer() {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor(time % 3600 / 60)
    const seconds = time % 3600 % 60
    const minutesText = minutes < 10 ? `0${minutes}` : minutes
    const secondsText = seconds < 10 ? `0${seconds}` : seconds
    setTimerText(hours === 0 ? `${minutesText}:${secondsText}` : `${hours}:${minutesText}:${secondsText}`, true)

    const progress = time / startTime
    timerCircle.style.strokeDashoffset = (1414 - 1414 * progress).toString()
}

/**
 * @param {number} newTime
 */
function setTime(newTime) {
    startTime = time = newTime * 60
}

/**
 * @param {number|null} newState
 */
function setState(newState) {
    state = newState
}

function startNewTimer() {
    updateTimer()
    interval = setInterval(advance, 1000)
}

export function continueTimer() {
    startNewTimer()
    toggleVisibility(continueButton)
    toggleVisibility(pauseButton)
}

export function stop() {
    toggleView()
    clearInterval(interval)
    switchBackground('options')
}

export function pause() {
    clearInterval(interval)
    toggleVisibility(pauseButton)
    toggleVisibility(resumeButton)
}

export function resume() {
    startNewTimer()
    toggleVisibility(pauseButton)
    toggleVisibility(resumeButton)
}

function setTimerText(text, bigSize = false) {
    timerText.style.fontSize = bigSize ? '125px' : '75px';
    timerText.innerText = text
}
