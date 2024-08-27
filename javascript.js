// Uso de selectores para acceder a elementos del DOM
const inputTexto = document.querySelector('#inputTexto');
const resultadoTexto = document.querySelector('#resultadoTexto');

// Declaración de variables
let textoOriginal = "";
let textoProcesado = "";

// Claves para encriptar y desencriptar
const claveEncriptado = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
};

const claveDesencriptado = {
    "ai": "a",
    "enter": "e",
    "imes": "i",
    "ober": "o",
    "ufat": "u"
};

// Función de validación para evitar mayúsculas y caracteres especiales
function validarTexto(texto) {
    const regex = /^[a-z\s]*$/; // Solo permite letras minúsculas y espacios
    return regex.test(texto);
}

// Función para cifrar el texto
function cifrarTexto() {
    let texto = inputTexto.value; // Captura el valor original sin cambios
    
    // Validación antes de cualquier conversión
    if (!validarTexto(texto)) {
        alert("El texto contiene mayúsculas o caracteres especiales. Por favor, ingrese solo letras minúsculas y sin caracteres especiales.");
        return;
    }

    texto = texto.toLowerCase(); // Convierte el texto a minúsculas después de validarlo
    textoProcesado = texto.replace(/[aeiou]/g, function(match) {
        return claveEncriptado[match];
    });
    resultadoTexto.innerText = textoProcesado; // Muestra el resultado en el área de texto
}

// Función para descifrar el texto
function descifrarTexto() {
    let texto = inputTexto.value; // Captura el valor original sin cambios
    
    // Validación antes de cualquier conversión
    if (!validarTexto(texto)) {
        alert("El texto contiene mayúsculas o caracteres especiales. Por favor, ingrese solo letras minúsculas y sin caracteres especiales.");
        return;
    }

    texto = texto.toLowerCase(); // Convierte el texto a minúsculas después de validarlo
    textoProcesado = texto.replace(/ai|enter|imes|ober|ufat/g, function(match) {
        return claveDesencriptado[match];
    });
    resultadoTexto.innerText = textoProcesado; // Muestra el resultado en el área de texto
}

// Función para copiar el texto al portapapeles
function copiarTexto() {
    let texto = resultadoTexto.innerText;
    
    // Usar la API del portapapeles
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(texto).then(() => {
            alert('Texto copiado al portapapeles');
        }).catch((err) => {
            console.error('Error al copiar el texto: ', err);
        });
    } else {
        // Fallback para navegadores antiguos
        let textArea = document.createElement("textarea");
        textArea.value = texto;
        textArea.style.position = "fixed";  // Evitar que el textarea sea visible
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            alert('Texto copiado al portapapeles');
        } catch (err) {
            console.error('Error al copiar el texto: ', err);
        }
        document.body.removeChild(textArea);
    }
}

