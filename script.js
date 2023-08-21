document.addEventListener("DOMContentLoaded", function () {
    
    const estadoSelect = document.getElementById("estado-select");
    const listaCidades = document.getElementById("lista-cidades");
    const regiaoEstado = document.getElementById("regiao-estado");
    const letraSelect = document.getElementById("letra-select"); // Novo elemento

    const estados = [
        { sigla: "AC", nome: "Acre" },
        { sigla: "AL", nome: "Alagoas" },
        { sigla: "AP", nome: "Amapá" },
        { sigla: "AM", nome: "Amazonas" },
        { sigla: "BA", nome: "Bahia" },
        { sigla: "CE", nome: "Ceará" },
        { sigla: "DF", nome: "Distrito Federal" },
        { sigla: "ES", nome: "Espírito Santo" },
        { sigla: "GO", nome: "Goiás" },
        { sigla: "MA", nome: "Maranhão" },
        { sigla: "MT", nome: "Mato Grosso" },
        { sigla: "MS", nome: "Mato Grosso do Sul" },
        { sigla: "MG", nome: "Minas Gerais" },
        { sigla: "PA", nome: "Pará" },
        { sigla: "PB", nome: "Paraíba" },
        { sigla: "PR", nome: "Paraná" },
        { sigla: "PE", nome: "Pernambuco" },
        { sigla: "PI", nome: "Piauí" },
        { sigla: "RJ", nome: "Rio de Janeiro" },
        { sigla: "RN", nome: "Rio Grande do Norte" },
        { sigla: "RS", nome: "Rio Grande do Sul" },
        { sigla: "RO", nome: "Rondônia" },
        { sigla: "RR", nome: "Roraima" },
        { sigla: "SC", nome: "Santa Catarina" },
        { sigla: "SP", nome: "São Paulo" },
        { sigla: "SE", nome: "Sergipe" },
        { sigla: "TO", nome: "Tocantins" }
    ];

    estados.forEach((estado) => {
        const option = document.createElement("option");
        option.value = estado.sigla;
        option.textContent = estado.nome;
        estadoSelect.appendChild(option);
    });

    estadoSelect.addEventListener("change", () => {
        const estadoSelecionado = estadoSelect.value;
        buscarCidades(estadoSelecionado);
        buscarRegiao(estadoSelecionado);
    });

    letraSelect.addEventListener("change", () => {
        const letraSelecionada = letraSelect.value;
        filtrarCidadesPorLetra(letraSelecionada);
    });

    function buscarCidades(estado) {
        const apiUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                listaCidades.innerHTML = "";
                data.forEach((cidade) => {
                    const itemLista = document.createElement("li");
                    itemLista.textContent = cidade.nome;
                    listaCidades.appendChild(itemLista);
                });
            })
            .catch((error) => {
                console.error("Erro ao buscar cidades:", error);
            });
    }

    function buscarRegiao(estado) {
        const apiUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const regiao = data.regiao && data.regiao.nome ? data.regiao.nome : "Região desconhecida";
                regiaoEstado.textContent = `Região do Estado: ${regiao}`;
            })
            .catch((error) => {
                console.error("Erro ao buscar informações da região:", error);
            });
    }

    function filtrarCidadesPorLetra(letra) {
        const cidades = document.querySelectorAll("#lista-cidades li");
        listaCidades.innerHTML = "";

        cidades.forEach((cidade) => {
            const nomeCidade = cidade.textContent;
            if (nomeCidade.startsWith(letra)) {
                listaCidades.appendChild(cidade);
            }
        });
    }
});