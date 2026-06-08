async function cargarSalones() {

    try {

        const respuesta = await fetch("../datos/salones.xml");

        const texto = await respuesta.text();

        const parser = new DOMParser();

        const xml = parser.parseFromString(
            texto,
            "text/xml"
        );

        const salones =
            xml.getElementsByTagName("salon");

        mostrarSalones(salones);

    } catch (error) {

        console.error(
            "Error al cargar XML:",
            error
        );

    }

}

function mostrarSalones(salones) {

    const tabla =
        document.getElementById("tablaSalones");

    tabla.innerHTML = "";

    for (let salon of salones) {

        const numero =
            salon.getElementsByTagName("numero")[0]
                .textContent;

        const capacidad =
            salon.getElementsByTagName("capacidad")[0]
                .textContent;

        const edificio =
            salon.getElementsByTagName("edificio")[0]
                .textContent;

        const estado =
            salon.getElementsByTagName("estado")[0]
                .textContent;

        let claseEstado = "";

        if (estado === "Disponible") {
            claseEstado = "disponible";
        } else {
            claseEstado = "ocupado";
        }

        tabla.innerHTML += `
            <tr>
                <td>${numero}</td>
                <td>${capacidad}</td>
                <td>${edificio}</td>
                <td class="${claseEstado}">
                    ${estado}
                </td>
            </tr>
        `;
    }

}

async function filtrarSalones() {

    const estadoSeleccionado =
        document.getElementById(
            "filtroEstado"
        ).value;

    const respuesta =
        await fetch("../datos/salones.xml");

    const texto =
        await respuesta.text();

    const parser =
        new DOMParser();

    const xml =
        parser.parseFromString(
            texto,
            "text/xml"
        );

    const salones =
        xml.getElementsByTagName("salon");

    const filtrados = [];

    for (let salon of salones) {

        const estado =
            salon.getElementsByTagName("estado")[0]
                .textContent;

        if (
            estadoSeleccionado === "" ||
            estado === estadoSeleccionado
        ) {
            filtrados.push(salon);
        }

    }

    mostrarSalones(filtrados);

}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const tabla =
            document.getElementById(
                "tablaSalones"
            );

        if (tabla) {

            cargarSalones();

            document
                .getElementById(
                    "filtroEstado"
                )
                .addEventListener(
                    "change",
                    filtrarSalones
                );

        }

        const loginForm =
            document.getElementById(
                "loginForm"
            );

        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                validarLogin
            );

        }

    }
);

async function validarLogin(event) {

    event.preventDefault();

    const usuarioIngresado =
        document.getElementById("usuario").value;

    const passwordIngresado =
        document.getElementById("password").value;

    const mensaje =
        document.getElementById("mensajeLogin");

    try {

        const respuesta =
            await fetch("../datos/usuarios.xml");

        const texto =
            await respuesta.text();

        const parser =
            new DOMParser();

        const xml =
            parser.parseFromString(
                texto,
                "text/xml"
            );

        const usuarios =
            xml.getElementsByTagName("usuario");

        let accesoPermitido = false;

        for (let usuario of usuarios) {

            const nombre =
                usuario.getElementsByTagName("nombre")[0]
                    .textContent;

            const password =
                usuario.getElementsByTagName("password")[0]
                    .textContent;

            if (
                nombre === usuarioIngresado &&
                password === passwordIngresado
            ) {

                accesoPermitido = true;
                break;

            }

        }

        if (accesoPermitido) {

            mensaje.textContent =
                "Inicio de sesión correcto";

            mensaje.className =
                "exito";

        } else {

            mensaje.textContent =
                "Usuario o contraseña incorrectos";

            mensaje.className =
                "error";

        }

    } catch (error) {

        mensaje.textContent =
            "Error al validar usuario";

        mensaje.className =
            "error";

    }

}