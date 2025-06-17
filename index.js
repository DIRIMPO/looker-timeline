looker.plugins.visualizations.add({
  create: function (element) {
    element.innerHTML = `<div id="timeline-container" style="display:flex; gap:10px; font-family:sans-serif; overflow-x:auto; padding:10px;"></div>`;
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    const container = element.querySelector("#timeline-container");
    container.innerHTML = "";

    const pasos = [
      "Asignación TRASNPORTE INTERNACIONAL ✅",
      "Mercancía Entregada a Transporte 🫱🏻🫲🏻",
      "Salida de Origen Confirmada",
      "Salida Confirmada de Puerto de Consolidación ➡",
      "Llegada a Colombia 🇨🇴",
      "Cierre Tránsito Internacional 🚦",
      "Inicio Transito Interno (Puerto a Bogotá) 🚚",
      "Llegada a Deposito en BOGOTÁ 🏙",
      "Inicio Gestión Aduanera - Nacionalización 🏳",
      "Llegada Lugor 🏁",
      "Ingreso de Mercancia - Finalizado 🏁"
    ];

    const row = data[0];
    const completados = row.map(cell => cell.value === "true" || cell.value === true);
    const indexActual = completados.lastIndexOf(true);

    pasos.forEach((paso, i) => {
      let estado = "⬜";
      if (i < indexActual) estado = "✅";
      else if (i === indexActual) estado = "⏳";

      const pasoEl = document.createElement("div");
      pasoEl.style.minWidth = "150px";
      pasoEl.style.padding = "8px";
      pasoEl.style.borderRadius = "8px";
      pasoEl.style.background = i === indexActual ? "#d9edf7" : (i < indexActual ? "#dff0d8" : "#f5f5f5");
      pasoEl.style.border = "1px solid #ccc";
      pasoEl.style.textAlign = "center";
      pasoEl.style.fontSize = "13px";
      pasoEl.innerHTML = `<div style="font-size:18px;">${estado}</div><div>${paso}</div>`;
      container.appendChild(pasoEl);

      if (i < pasos.length - 1) {
        const flecha = document.createElement("div");
        flecha.style.alignSelf = "center";
        flecha.innerHTML = "➜";
        container.appendChild(flecha);
      }
    });

    done();
  }
});
