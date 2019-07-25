const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 1

class Juego {
    constructor() {
        //this.inicializar()
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 100)
    }

    inicializar() {
        // Indica que this.elegirColor siempre va a estar atado a la clase juego, no va a cambiar el contexto
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.toggleBtnempezar()
        this.nivel = 1
        this.colores = {
            celeste, violeta, naranja, verde
        }
    }

    toggleBtnempezar() {
        if (btnEmpezar.classList.contains('hide'))
            btnEmpezar.classList.remove('hide')
        else
            btnEmpezar.classList.add('hide')
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
        console.log(this.secuencia);
    }
    siguienteNivel() {
        this.subnivel = 0
        this.ilumnarSecuencia()
        this.agregarEventoClick()
    }
    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }
    transformarColorANumero(color) {
        switch (color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }
    ilumnarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(() => this.ilumnarColor(color), 1000 * i)

        }
    }
    ilumnarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }
    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }
    agregarEventoClick() {
        //this.colores.celeste.addEventListener('click',this.elegirColor.bind(this))
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }
    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }
    ganoElJuego() {
        swal('Juego', 'Ganaste el juego', 'success')
            .then(() => {
                this.inicializar()
            })
    }
    perdioElJuego() {
        swal('Juego', 'Perdiste el juego', 'error')
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()
            })
    }
    elegirColor(evt) {
        console.log(this)
        console.log(evt)
        const nombreColor = evt.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.ilumnarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    //Gano
                    this.ganoElJuego()
                } else {

                    //setTimeout(this.siguienteNivel.bind(this), 2000);
                    setTimeout(this.siguienteNivel, 2000);
                }
            }
        } else {
            //Perdio
            this.perdioElJuego()
        }
    }

}

function empezarJuego() {
    var juego = new Juego()
}


let nombre = 'Pepe'

const persona = {
    nombre: 'Sacha',
    apellido: 'Lifszyc',
    edad: 28,
    saludar: function () {
        console.log(`Hola, me llamo ${this.nombre}`)
    },
    decirAdios: function () {
        console.log('Chau, me voy!')
    }
}

const otraPersona = {
    ...persona,
    nombre: 'Eric',
    edad: 24
}

nombre = 'Lucas'
otraPersona.saludar()

setTimeout(() => console.log(1), 1000)
setTimeout(() => console.log(2), 300)
setTimeout(() => console.log(3), 0)
console.log(4)