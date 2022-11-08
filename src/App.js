import "./App.css"
import { useCallback, useEffect, useState } from "react"
import words from "./wordList.json"
import { HangmanDrawing } from "./components/HangmanDrawing"
import { HangmanWord } from "./components/HangmanWord"
import { Keyboard } from "./components/Keyboard"

const App = () => {
	// Get random word from the list
	const [wordToGuess, setWordToGuess] = useState(() => {
		return words[Math.floor(Math.random() * words.length)]
	})

	const [guessedLetters, setGuessedLetters] = useState([])

	const incorrectLetters = guessedLetters.filter(
		(letter) => !wordToGuess.includes(letter)
	)

	const addGuessedLetter = useCallback(
		(letter) => {
			if (guessedLetters.includes(letter)) return

			setGuessedLetters((currentLetters) => [...currentLetters, letter])
		},
		[guessedLetters]
	)

	// Read letters from PC keyboard
	useEffect(() => {
		const handler = (e) => {
			const key = e.key
			if (!key.match(/^[a-z]$/)) return

			e.preventDefault()
			addGuessedLetter(key)
		}

		document.addEventListener("keypress", handler)

		return () => {
			document.removeEventListener("keypress", handler)
		}
	}, [guessedLetters])

	return (
		<div
			style={{
				maxWidth: "800px",
				display: "flex",
				flexDirection: "column",
				gap: "2rem",
				margin: "0 auto",
				alignItems: "center",
			}}
		>
			<div
				style={{
					fontSize: "2rem",
					textAlign: "center",
				}}
			>
				Lose Win
			</div>
			<HangmanDrawing numberOfGuesses={incorrectLetters.length} />
			<HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
			<div style={{ alignSelf: "stretch" }}>
				<Keyboard />
			</div>
		</div>
	)
}

export default App
