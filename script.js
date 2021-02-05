/*
// Show New Quote (local data)
function newQuote() {
  // Pick a random quote from apiQuotes array
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
  console.log(quote)
}
*/

const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


let apiQuotes = []; 

// Show Loading 
function showLoadingSpinner() {
  loader.hidden = false 
  quoteContainer.hidden = true
}

// Hide Loading 
function removeLoadingSpinner() {
  loader.hidden = true 
  quoteContainer.hidden = false 
}

// Show New Quote (fetch from api)
function newQuote() {
  showLoadingSpinner()
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
  // Check if Author field is blank and replace it with 'Unkown'
  if (!quote.author) {
    author.textContent = "Unknown"
  } else {
    author.textContent = quote.author
  }

  // Check Quote Length to Determine Font-Sizing
  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }

  // Set Quote, Hide Loader 
  quoteText.textContent = quote.text
  removeLoadingSpinner()  
}

// Get Quote From API 
async function getQuotes() {
  showLoadingSpinner() 
  const apiUrl = "https://type.fit/api/quotes"
  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    newQuote()
  } catch (error) {
    // catch error here 
    console.log('whoops, no quote', error)
  }
}

// Tweet Quote 
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank')
}

// Event Listeners 
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)


// On Load 
getQuotes() // fetch from external api
// newQuote() // local quotes 
