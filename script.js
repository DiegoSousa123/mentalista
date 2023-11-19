/*
código feito por um iniciante,
releve os erros bobos que podem haver.
E sim, está uma bagunça!
*/

var randNum = parseInt(Math.random() * 1001 + 1);
var res
var iValue
var nTentativa = 0
var state = false
var padraoEffect = "rgb(0,255,255)"
var errouEffect = "rgb(255,10,10)"
var acertouEffect = "rgb(15,225,96)"

document.getElementById("n_tentativa").innerHTML = '<small>Tentativas: ' + nTentativa + '</small>'
document.getElementById("back_effect").style.animation = "effect 1.5s linear infinite"
document.getElementById("resultado").style.opacity = "0"

console.log(randNum);

function chute() {
	iValue = document.getElementById("input_n").value;
	var result = document.getElementById("resultado");
	var tentativa = document.getElementById("n_tentativa")
	var maiorMenor = document.getElementById("maior_menor");

	if (iValue > 0) {
		if (iValue == randNum) {
			document.getElementById("resultado").style.color = "rgb(15,225,96)"
			document.getElementById("resultado").style.opacity = "1"
			result.innerHTML = 'ACERTOU'
			state = true
			blockInputs();
			maiorMenor.innerHTML = ""
			document.getElementById("back_effect").style.background = acertouEffect

		} else if (iValue != randNum) {
			++nTentativa
			document.getElementById("n_tentativa").innerHTML = '<small>Tentativas: ' + nTentativa + '</small>'
			document.getElementById("resultado").style.opacity = "1"
			result.innerHTML = 'ERROU';
			document.getElementById("resultado").style.color = "red"
			document.getElementById("chute_btn").disabled = true
			document.getElementById("back_effect").style.background = errouEffect

			setTimeout(function() {

				if (nTentativa == 10) {
					result.innerHTML = '<b>Tentativas esgotadas!</b>'
					document.getElementById("resultado").style.opacity = "1"
					state = true
					blockInputs()
					maiorMenor.innerHTML = "<small>O número era: " + randNum + "</small>"
				} else {
					result.innerHTML = '';
					document.getElementById("input_n").value = ""
					maiorMenor.innerHTML = ''
					document.getElementById("resultado").style.opacity = "0"
					document.getElementById("chute_btn").disabled = false
					document.getElementById("back_effect").style.background = padraoEffect

				}
			},
				4000)

			if (iValue > randNum) {
				maiorMenor.innerHTML = '<small>É menor...</small>'
			}
			if (iValue < randNum) {
				maiorMenor.innerHTML = '<small>É maior...</small>'
			}
		}
	}
}

function blockInputs() {
	if (state == true) {
		document.getElementById("input_n").disabled = true
		document.getElementById("chute_btn").disabled = true
		document.getElementById("restart").disabled = false
	} else {}

}
function rand() {
	randNum = parseInt(Math.random() * 1001 + 1);
	console.log(randNum)
}
function restart() {
	nTentativa = 0
	document.getElementById("input_n").value = ""
	document.getElementById("resultado").innerHTML = ""
	document.getElementById("resultado").style.opacity = "0"
	document.getElementById("n_tentativa").innerHTML = '<small>Tentativas: ' + nTentativa + '</small>'
	document.getElementById("maior_menor").innerHTML = ""
	document.getElementById("input_n").disabled = false
	document.getElementById("chute_btn").disabled = false
	document.getElementById("restart").disabled = true
	document.getElementById("back_effect").style.background = padraoEffect

	rand()
}