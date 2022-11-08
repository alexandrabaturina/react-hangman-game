import "./App.css"
import { useState } from "react"
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
			<HangmanDrawing />
			<HangmanWord />
			<div style={{ alignSelf: "stretch" }}>
				<Keyboard />
			</div>
		</div>
	)
}

export default App
