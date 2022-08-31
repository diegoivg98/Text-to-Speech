// Init Speech Synth
const message = new SpeechSynthesisUtterance()
let voices = [];

// Get available voices
speechSynthesis.addEventListener("voiceschanged", () => {
  voices = speechSynthesis.getVoices()
  loadVoices(voices);
})

// DOM elements
const quotesElement = document.querySelector(".phrases");
const selectElement = document.querySelector(".select");
const form = document.querySelector(".form")
const textareaElement = document.querySelector(".textarea");

//Load select with voices
function loadVoices(voices){
  voices.forEach(voice => {
    const { name, lang } = voice
    const optionElement = document.createElement("option");
    optionElement.innerText = `${ name } - ${ lang }`
    optionElement.value = name
    selectElement.appendChild(optionElement)
  })
}

//Listen for change events on select
selectElement.addEventListener("change", (event) =>{
  const name = event.target.value;
  const voice = voices.find(voice => voice.name === name)
  message.voice = voice;
})

// Listen for form submission
form.addEventListener("submit", (event) => {
  event.preventDefault()
  const customText = textareaElement.value
  message.text = customText;
  speechSynthesis.speak(message)
})

// App data
const phrases = [
    {
      text: "Te conviertes en lo que le das a tu atención»",
      author: "Epictecto",
    },
    {
      text: "El único modo de hacer un gran trabajo es amar lo que haces ",
      author: "Steve Jobs",
    },
    {
      text: "«Es esencial que recuerdes que la atención que le des a cualquier acción debe ser proporcional a su valor.»",
      author: "Marco Aurelio",
    },
    {
      text: "El dinero no es la clave del éxito; la libertad para poder crear lo es ",
      author: "Nelson Mandela",
    },
    {
      text: "Cuanto más duramente trabajo, más suerte tengo",
      author: "Gary Player",
    },
    {
      text: "El trabajo duro hace que desaparezcan las arrugas de la mente y el espíritu",
      author: "Helena Rubinstein ",
    },
  ];

// Load quotes in the DOM
phrases.forEach(phrase => {
    const { text, author } = phrase
    const quoteTemplate = `
    <section class="phrase">
          <h2 class="phrase-text">${ text }</h2>
          <h5 class="phrase-author">${ author }</h5>
    </section> `
    quotesElement.innerHTML += quoteTemplate
})

//Listen for clicks on quotes
const quotesCollection = document.querySelectorAll(".phrase");
quotesCollection.forEach(quoteElement => {
    quoteElement.addEventListener("click", (event) => {
        message.text = event.target.innerText
        speechSynthesis.speak(message)
    });
});