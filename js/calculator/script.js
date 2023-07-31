const buttonsList = document.querySelectorAll("button");
let calculatorPannel = document.querySelector(".calculator div");
let result;
let previousOperator;

const addNumbersToPannel = (number) => {
	if (previousOperator === "=") {
		result = 0;
		calculatorPannel.innerHTML = number;
		previousOperator = null;
		return;
	}
	calculatorPannel.innerHTML === "0"
		? (calculatorPannel.innerHTML = number)
		: (calculatorPannel.innerHTML = calculatorPannel.innerHTML + number);
};

const specialCharacters = (character) => {
	switch (character) {
		case "C":
			result = 0;
			previousOperator = "C";
			break;
		case "←":
			if (calculatorPannel.innerHTML.length >= 2) {
				calculatorPannel.innerHTML = calculatorPannel.innerHTML.slice(0, -1);
				previousOperator = "←";
				break;
			}
			break;
		case "+":
			if (result) {
				result += parseInt(calculatorPannel.innerHTML);
			} else {
				result = parseInt(calculatorPannel.innerHTML);
			}
			previousOperator = "+";
			break;
		case "-":
			if (result) {
				result -= parseInt(calculatorPannel.innerHTML);
			} else {
				result = parseInt(calculatorPannel.innerHTML);
			}
			previousOperator = "-";
			break;
		case "×":
			result
				? (result *= parseInt(calculatorPannel.innerHTML))
				: (result = parseInt(calculatorPannel.innerHTML));
			previousOperator = "*";
			break;
		case "÷":
			result
				? (result /= parseInt(calculatorPannel.innerHTML))
				: (result = parseInt(calculatorPannel.innerHTML));
			previousOperator = "/";
			break;
		case "=":
			switch (previousOperator) {
				case "+":
					calculatorPannel.innerHTML = result += parseInt(
						calculatorPannel.innerHTML
					);
					break;
				case "-":
					calculatorPannel.innerHTML = result -= parseInt(
						calculatorPannel.innerHTML
					);
					break;
				case "*":
					calculatorPannel.innerHTML = result *= parseInt(
						calculatorPannel.innerHTML
					);
					break;
				case "/":
					calculatorPannel.innerHTML = result /= parseInt(
						calculatorPannel.innerHTML
					);
					break;
			}
			result = 0;
			previousOperator = "=";
			break;
	}
	if (previousOperator !== "=" && previousOperator !== "←") {
		calculatorPannel.innerHTML = 0;
	}
};

buttonsList.forEach((button) => {
	button.addEventListener("click", () => {
		if (parseInt(button.innerHTML) || button.innerHTML === "0") {
			addNumbersToPannel(button.innerHTML);
			return;
		}
		specialCharacters(button.innerHTML);
	});
});
