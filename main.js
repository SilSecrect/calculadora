class Calculadora {
    constructor(tela) {
        this.tela = tela;
        this.limpar();
    }

    limpar() {
        this.num1 = "";
        this.num2 = "";
        this.operador = "";
        this.tela.value = "0";
    }

    adicionarNumero(numero) {
        if (this.operador === "") {
            this.num1 += numero;
            this.tela.value = this.num1;
        } else {
            this.num2 += numero;
            this.tela.value = this.num2;
        }
    }

    escolherOperacao(operador) {
        if (this.num1 === "") return; // Impede iniciar com operador
        if (this.num2 !== "") this.calcular(); // Se já há um segundo número, resolve antes

        if(operador != '='){
            this.operador = operador;
            this.tela.value = this.num1;
        } // Limpa para digitar o próximo número
    }

    calcular() {
        if (this.num1 === "" || this.num2 === "") return;

        let resultado;
        const n1 = parseFloat(this.num1);
        const n2 = parseFloat(this.num2);

        switch (this.operador) {
            case "+":
                resultado = n1 + n2;
                break;
            case "-":
                resultado = n1 - n2;
                break;
            case "*":
                resultado = n1 * n2;
                break;
            case "/":
                resultado = n2 === 0 ? "Erro" : n1 / n2;
                break;
            case "%":
                resultado = (n1 * n2) / 100;// Calcula o resto da divisão
            break;
            default:
                return;
        }

        this.tela.value = resultado;
        this.num1 = resultado.toString();
        this.num2 = "";
        this.operador = "";
      
    }

    apagarUltimo() {
        if (this.operador === "") {
            this.num1 = this.num1.slice(0, -1);
            this.tela.value = this.num1 || "0";
        } else {
            this.num2 = this.num2.slice(0, -1);
            this.tela.value = this.num2 || "0";
        }
    }
}

// Espera o DOM carregar
document.addEventListener("DOMContentLoaded", () => {
    const tela = document.getElementById("telaOK");
    const calculadora = new Calculadora(tela);

    // Captura botões de números
    document.querySelectorAll(".numbers button").forEach((button) => {
        button.addEventListener("click", () => {
            calculadora.adicionarNumero(button.textContent);
        });
    });

    // Captura botões de operações
    document.querySelectorAll(".operation button").forEach((button) => {
        button.addEventListener("click", () => {
            calculadora.escolherOperacao(button.textContent);
        });
    });

    // Botão de igual
    document.getElementById("igual").addEventListener("click", () => {
        calculadora.calcular();
    });

    // Botão de limpar
    document.getElementById("clear").addEventListener("click", () => {
        calculadora.limpar();
    });

    // Botão de apagar último dígito
    document.getElementById("backspace").addEventListener("click", () => {
        calculadora.apagarUltimo();
    });
});
