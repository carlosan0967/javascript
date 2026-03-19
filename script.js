const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const edad = document.getElementById("edad");
const ciudad = document.getElementById("ciudad");
const resultado = document.getElementById("resultado");
const btnHistorial = document.getElementById("btnHistorial");
const historialPanel = document.getElementById("historialPanel");

formulario.addEventListener("submit", function (e) {
  e.preventDefault(); // Evita recargar página

  const usuario = {
    nombre: nombre.value,
    edad: edad.value,
    ciudad: ciudad.value,
    fechaRegistro: new Date().toLocaleDateString(),
    saludar: function () {
      return `Hola, soy ${this.nombre} de ${this.ciudad}`;
    },
  };

  // Guardar MÚLTIPLES usuarios: leer array existente o crear uno nuevo
  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuariosGuardados.push({
    nombre: usuario.nombre,
    edad: usuario.edad,
    ciudad: usuario.ciudad,
    fechaRegistro: usuario.fechaRegistro,
  });
  localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

  // Leer el usuario recién guardado para mostrar en pantalla
  const datosGuardados = usuariosGuardados[usuariosGuardados.length - 1];
  const { nombre: nom, ciudad: ciu, edad: ed } = datosGuardados;

  const usuarioActualizado = {
    ...datosGuardados,
    edad: Number(ed) + 1,
    actualizado: true,
  };

  resultado.innerHTML = `
    <h2>INFORMACIÓN DE USUARIO</h2>
    <p><strong>Nombre: </strong> ${nom}</p>
    <p><strong>Edad: </strong> ${ed}</p>
    <p><strong>Ciudad: </strong> ${ciu}</p>
    <p><strong>JSON: </strong> ${JSON.stringify(datosGuardados)}</p>
    <p><strong>Usuario Spread: </strong> ${JSON.stringify(usuarioActualizado)}</p>
    <p class="total-guardados">✅ Total usuarios guardados: ${usuariosGuardados.length}</p>
  `;

  formulario.reset();
});

// Botón VER LOCAL STORAGE — muestra historial de todos los usuarios
btnHistorial.addEventListener("click", function () {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuarios.length === 0) {
    historialPanel.innerHTML = `<p class="sin-datos">No hay usuarios guardados aún.</p>`;
  } else {
    let tabla = `
      <h2>HISTORIAL DE LOCAL STORAGE</h2>
      <p class="total-guardados">Total registros: ${usuarios.length}</p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Ciudad</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
    `;

    usuarios.forEach((u, index) => {
      tabla += `
        <tr>
          <td>${index + 1}</td>
          <td>${u.nombre}</td>
          <td>${u.edad}</td>
          <td>${u.ciudad}</td>
          <td>${u.fechaRegistro}</td>
        </tr>
      `;
    });

    tabla += `</tbody></table>`;

    // Botón limpiar historial
    tabla += `<button id="btnLimpiar" class="btn-limpiar">🗑️ Limpiar historial</button>`;
    historialPanel.innerHTML = tabla;

    // Evento para limpiar localStorage
    document.getElementById("btnLimpiar").addEventListener("click", function () {
      localStorage.removeItem("usuarios");
      historialPanel.innerHTML = `<p class="sin-datos">Historial limpiado correctamente.</p>`;
      resultado.innerHTML = "";
    });
  }

  // Toggle: si ya estaba visible, ocultarlo
  historialPanel.style.display =
    historialPanel.style.display === "none" ? "block" : "block";
  historialPanel.scrollIntoView({ behavior: "smooth" });
});
