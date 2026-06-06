async function cargarSalones() {

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

}