  const fs = require("fs");
  const fetch = require("node-fetch");

  const dados = JSON.parse(fs.readFileSync("dados_tratados.json", "utf-8"));

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function pegarBairro(lat, lon) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "projeto-salto-ia (gabriel@email.com)"
      }
    });

    const text = await res.text();

    // tenta converter pra JSON
    const data = JSON.parse(text);

    return (
      data.address?.suburb ||
      data.address?.neighbourhood ||
      data.address?.city_district ||
      "Desconhecido"
    );

  } catch (erro) {
    console.log("❌ Erro ao pegar bairro:", lat, lon);
    return "Erro";
  }
}

  async function processar() {
    for (let i = 0; i < dados.length; i++) {
      const item = dados[i];

      const bairro = await pegarBairro(item.latitude, item.longitude);
      item.bairro = bairro;

      console.log(`✔️ ${i + 1}/${dados.length} → ${bairro}`);

      await sleep(800); // MUITO IMPORTANTE
    }

    fs.writeFileSync("dados_com_bairro.json", JSON.stringify(dados, null, 2));
    console.log("✅ Finalizado!");
  }

  processar();