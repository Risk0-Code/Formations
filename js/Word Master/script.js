const WORD_URL = "https://words.dev-apis.com/word-of-the-day";

async function init() {
	const rows = document.querySelectorAll(".row");

	let letterIndex = 0;
	let lastModified;
	let rowIndex = 0;
	const guessedLetter = [];
	let guessedWord;

	const res = await fetch(WORD_URL);
	const { word: wordRes } = await res.json();

	const checkAnswer = (correctWord, guessedWord) => {
		const correctWordArray = correctWord.split("");
		const correctWordArrayFind = correctWord.split("");
		if (correctWord === guessedWord) {
			alert("You won! The word will not change after the reload");
			location.reload();
		}
		if (rowIndex === 5 && correctWord !== guessedWord) {
			alert("You lose! The word was " + correctWord);
			location.reload();
		}
		guessedWord.split("").forEach((letter, index) => {
			console.log(correctWordArrayFind[index]);
			if (letter === correctWordArray[index]) {
				console.log(`${letter} is becoming green ${index}`);
				correctWordArrayFind.splice(correctWordArray[index], 1);
				rows[rowIndex].children[index].style.background = "lightgreen";
			}
		});
		console.log("Check");
		guessedWord.split("").forEach((letter, index) => {
			if (correctWordArrayFind.includes(letter)) {
				rows[rowIndex].children[index].style.background = "yellow";
				const letterToRemove = correctWordArrayFind.indexOf(letter);
				correctWordArrayFind.splice(letterToRemove, 1);
			}
		});
	};

	document.addEventListener("keydown", (event) => {
		const squareLetter = rows[rowIndex].children[letterIndex];
		// Check if the key presed is a letter
		if (event.key.match(/^[A-Za-z]{1}$/)) {
			// then change the square for a letter
			squareLetter.innerText = event.key;
			lastModified = letterIndex;
			if (letterIndex <= 3) letterIndex++;
			// Store guessed letters in an array, but first check if there are 5 letters.
			if (guessedLetter.length === 5) guessedLetter.pop();
			guessedLetter.push(event.key);
		}
		// Check if the key pressed is "Backspace"
		if (event.key === "Backspace") {
			// then remove the last modified letter
			rows[rowIndex].children[lastModified].innerText = "";
			guessedLetter.pop();
			// remove 1 to keep the variables above 0 and prevent errors
			if (letterIndex) letterIndex--;
			if (lastModified) lastModified--;
		}
		// When pressed 'Enter' go next line if all letters has been put on
		if (event.key === "Enter" && lastModified === 4) {
			// Reset all variable to get to the next line
			console.log(rowIndex);
			guessedWord = guessedLetter.join("");
			guessedLetter.length = 0;
			checkAnswer(wordRes, guessedWord);
			if (rowIndex < 5) rowIndex++;
			lastModified = 0;
			letterIndex = 0;
		}
		console.log(guessedLetter, guessedWord, wordRes, letterIndex, lastModified);
	});
}

init();
