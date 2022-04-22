const LANG = "en-US"

let colors = ["red", "blue", "green", "white", "black", "purple", "pink", "yellow", "orange", "brown"]

let SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
let SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList

let recognition = new SpeechRecognition()
let speechRecognitionList = new SpeechGrammarList()

let grammar = "#JSGF V1.0; grammar colors; public <color> = " + colors.join(" | ") + " ;"

speechRecognitionList.addFromString(grammar, 1)

recognition.grammars = speechRecognitionList
recognition.continuous = false
recognition.lang = LANG
recognition.interimResults = false
recognition.maxAlternatives = 1

let button = document.querySelector("button")
let span = document.querySelector("span")

const say = () => {
    recognition.start()

    button.disabled = true
}

recognition.onresult = event => {
    let result = event.results[0][0]

    let color = result.transcript.toLowerCase()

    if (!colors.includes(color)){
        span.textContent = "Detected word: " + color
        return
    }

    span.textContent = "Detected color: " + color

    document.body.style.backgroundColor = color
}

recognition.onspeechend = () => {
    button.disabled = false

    recognition.stop()
}

recognition.onnomatch = () => {
    button.disabled = false

    span.textContent = "Color couldn't matched"
}

recognition.onerror = () => {
    button.disabled = false

    span.textContent = "An error occurred"
}
