const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable button
const toggleButton = () => (button.disabled = !button.disabled);

// Passing joke to VoiceRSS Api
const tellMe = (joke) => {
	VoiceRSS.speech({
		key: "5231557b1c46459bb34b85c682f891b9",
		src: joke,
		hl: "en-us",
		r: 0,
		c: "mp3",
		f: "44khz_16bit_stereo",
		ssml: false,
	});
};

// Get jokes from api
async function getJokes() {
	let joke = "";
	const apiUrl = "https://v2.jokeapi.dev/joke/Any?type=single";
	try {
		const resp = await fetch(apiUrl);
		const data = await resp.json();

		if (data.setup) {
			joke = `${data.setup} ... ${data.delivery}`;
		} else {
			joke = data.joke;
		}

    //Text-to-Speech
		tellMe(joke);

    // Disable Button
    toggleButton();
	} catch (err) {
		console.error("Error while getting jokes", err);
	}
}

// Event listeners
button.addEventListener("click", getJokes);
audio.addEventListener("ended", toggleButton);
