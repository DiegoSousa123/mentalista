/*
código feito por um iniciante,
releve os erros bobos que podem haver.
E sim, está uma bagunça!
*/

var randNum
var res;
var iValue;
var nTentativa = 0;
var root = document.documentElement;

var padraoEffect = getComputedStyle(root).getPropertyValue("--cor_padrao");
var errouEffect = getComputedStyle(root).getPropertyValue("--cor_errou");
var acertouEffect = getComputedStyle(root).getPropertyValue("--cor_acertou");
var acertouDePrima = getComputedStyle(root).getPropertyValue("--cor_lendario");

document.getElementById("tentativa").textContent = "Tentativas: " + nTentativa;
document.getElementById("back_effect").style.animation = "effect 1.5s linear infinite";
document.getElementById("resultado").style.opacity = "0";

var audioElement = document.createElement("audio");
audioElement.setAttribute("preload", "auto");
audioElement.setAttribute("controls", "none");
audioElement.setAttribute("hidden", "true");
document.body.appendChild(audioElement);

rand();

function chute() {
	iValue = parseInt(document.getElementById("input_n").value);
	var result = document.getElementById("resultado");
	var tentativa = document.getElementById("tentativa");
	var maiorMenor = document.getElementById("menmai");

	if (iValue > 0) {//verifica se o valor é maior que 0
		if (iValue > 1000) {//verifica se o valor é maior que 1000
			result.textContent = "1 a 1000";
			document.getElementById("resultado").style.opacity = "1";
			document.getElementById("resultado").style.color = "#f9f9f9";
			document.getElementById("input_n").value = "";
			setTimeout(function () {
				result.textContent = "";
			}, 1500);
		} else if (iValue == randNum) { //verifica se o valor é igual ao numero aleatorio
			if (nTentativa == 0) {
				//acertou na primeira tentativa
				result.textContent = "LENDÁRIO!";
				document.getElementById("back_effect").style.background = acertouDePrima;
				document.getElementById("resultado").style.color = acertouDePrima;
				maiorMenor.textContent = "acertou de primeira!";
			} else {
				//acertou
				document.getElementById("back_effect").style.background = acertouEffect;
				document.getElementById("resultado").style.color = acertouEffect;
				result.textContent = "ACERTOU";
			}
			toque("acertou"); //realiza o toque de acerto
			document.getElementById("resultado").style.opacity = "1";
			blockInputs(true); //bloqueia os botões e input
		} else if (iValue != randNum) { //verifica se o valor é diferente (errou)
			++nTentativa; //incrementa o contador de tentativas
			// saveChute(iValue); //salvar e exibir chute
			document.getElementById("tentativa").textContent =
				"Tentativas: " + nTentativa;
			document.getElementById("resultado").style.opacity = "1";
			result.textContent = "ERROU";
			document.getElementById("input_n").disabled = true;
			document.getElementById("resultado").style.color = errouEffect;
			toque("errou");//realiza o toque de errou
			document.getElementById("chute_btn").disabled = true;
			document.getElementById("back_effect").style.background = errouEffect;

			setTimeout(function () {
				if (nTentativa == 10) {//verifica se as tentativas atingiram o limite
					result.textContent= "tentativas esgotadas!";
					document.getElementById("input_n").value = "";
					document.getElementById("resultado").style.opacity = "1";
					blockInputs(true);
					maiorMenor.textContent = "o número era: " + randNum;
				} else {
					result.textContent = "";
					document.getElementById("input_n").value = "";
					document.getElementById("input_n").disabled = false;
					maiorMenor.textContent = "";
					document.getElementById("resultado").style.opacity = "0";
					document.getElementById("chute_btn").disabled = false;
					document.getElementById("back_effect").style.background = padraoEffect;
				}
			}, 2000);

			if (iValue > randNum) {
				maiorMenor.textContent = "é menor...";
			}
			if (iValue < randNum) {
				maiorMenor.textContent = "é maior...";
			}
		}
	} else {//valor menor ou igual a zero 
		var inputBox = document.getElementById("input_n");
		inputBox.classList.toggle("emptyUserInput");
		setTimeout(function () {
			inputBox.classList.toggle("emptyUserInput");
		}, 700);
	}
}

function blockInputs(state) {//função para bloquear os elementos
	if (state == true) {
		document.getElementById("input_n").disabled = true;
		document.getElementById("chute_btn").disabled = true;
		document.getElementById("restart").disabled = false;
	} else {
	}
}
function rand() {//função para gerar o numero aleatorio
	randNum = parseInt(Math.random() * 1001 + 1);
	if (randNum === 1001) {
		randNum = parseInt(Math.random() * 1001 + 1);
	}
	console.log(randNum);
}
function restart() {//função para reiniciar
	nTentativa = 0;
	document.getElementById("input_n").value = "";
	document.getElementById("resultado").textContent = "";
	document.getElementById("resultado").style.opacity = "0";
	document.getElementById("tentativa").textContent =
		"Tentativas: " + nTentativa;
	document.getElementById("menmai").textContent = "";
	document.getElementById("input_n").disabled = false;
	document.getElementById("chute_btn").disabled = false;
	document.getElementById("restart").disabled = true;
	document.getElementById("back_effect").style.background = padraoEffect;
	// saveChute("clear");
	rand();
}

function toque(condicao) {//função para tocar o audio
	audioElement.volume = 1;
	if (condicao === "acertou") {
		audioElement.src = "win.mp3";
	} else {
		audioElement.volume = 0.1;
		audioElement.src = "fail.wav";
	}
	audioElement.load();
	audioElement.play();
}

// function saveChute(input) {
// 	var chuteObj = document.querySelector(".section__chutes__chutes");
// 	if (input === "clear") {
// 		chuteObj.innerHTML = "";
// 	} else {
// 		chuteObj.innerHTML += input + " ";
// 	}
// }
