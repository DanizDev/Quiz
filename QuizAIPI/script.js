const questoes = [
        {
            questao: "Qual parte do processador é responsável por realizar cálculos e processar instruções. E ter como partes principais a ULA, e a UC além de possuir registradores? ",
            respostas: [
                { id: 1, text: "CPU", correct:true},
                { id: 2, text: "ULA", correct:false},
                { id: 3, text: "UC", correct:false},
                { id: 4, text: "Registradores", correct:false}
            ]
        },
        {
            questao: "Qual o componente localizado dentro da CPU responsável por executar operações de cálculos matemáticos e lógicos? ",
            respostas: [
                    { id: 1, text: "Memória", correct:false},
                    { id: 2, text: "ULA", correct:true},
                    { id: 3, text: "UC", correct:false},
                    { id: 4, text: "Barramentos", correct:false}
                ]
        },
        {
            questao: "Qual componente do processador é responsável por armazenar temporariamente dados e instruções durante a execução das operações? ",
            respostas: [
                    { id: 1, text: "Memória ROM", correct:false},
                    { id: 2, text: "Cache", correct:false},
                    { id: 3, text: "Registradores", correct:true},
                    { id: 4, text: "Processador", correct:false}
                ]
        },
        {
            questao: "Quais são os principais tipos de memória utilizados em computadores e dispositivos eletrônicos?",
            respostas: [
                    { id: 1, text: "Memória de Disco", correct:false},
                    { id: 2, text: "Memória REM", correct:false},
                    { id: 3, text: "Memória Cache", correct:false},
                    { id: 4, text: "RAM, ROM, EPROM, Flash e memória de massa", correct:true}
                ]
        },
        {
            questao: " Qual tecnologia permite a transferência direta de dados entre dispositivos e a memória sem a intervenção constante do processador?  ",
            respostas: [
                    { id: 1, text: "Memória RAM", correct:false},
                    { id: 2, text: "DMA", correct:true},
                    { id: 3, text: "IR", correct:false},
                    { id: 4, text: "Barramento de Endereço", correct:false}
                ]
        },
        {
            questao: "Qual sinal seleciona um chip em um circuito?",
            respostas: [
                    { id: 1, text: "CS(Chip Select)", correct:true},
                    { id: 2, text: "Dispositivo de Entrada", correct:false},
                    { id: 3, text: "Wifi", correct:false},
                    { id: 4, text: "Dispositivo de Saída", correct:false}
                ]
        },
        {
            questao: "Quais barramentos são usados para endereços e transferência de dados?",
            respostas: [
                    { id: 1, text: "HDMI, USB", correct:false},
                    { id: 2, text: "Bluetooth", correct:false},
                    { id: 3, text: "Adress bus, Data bus", correct:true},
                    { id: 4, text: "Barramentos", correct:false}
                ]
        },
        {
            questao: "Quais são as linhas de processadores da Intel mais conhecidas para computadores de médio e alto desempenho?",
            respostas: [
                    { id: 1, text: "I5, I7", correct:true},
                    { id: 2, text: "I9, I3", correct:false},
                    { id: 3, text: "Ryzen 5, Ryzen 2", correct:false},
                    { id: 4, text: "I2, I10", correct:false}
                ]
        },
        {
            questao: "Quais são os tipos de processadores com dois e quatro núcleos físicos? ",
            respostas: [
                    { id: 1, text: "AMD Ryzen e Intel Xeon.", correct:false},
                    { id: 2, text: "Octa Core e Deca Core.", correct:false},
                    { id: 3, text: "Dual core, Quad Core.", correct:true},
                    { id: 4, text: "Single Core e Hexa Core.", correct:false}
                ]
        },
    ];

    const questaoElement = document.getElementById("questao");
    const respostaElement = document.getElementById("respostas-botoes");
    const proximoElement = document.getElementById("proximo-btn");

    let questaoAtualIndex = 0;
    let pontuacao = 0;

    function comecarQuiz(){
        questaoAtualIndex = 0;
        pontuacao = 0;
        proximoElement.innerHTML = "Próxima";
        mostrarQuestao();
    }

    function resetarStatus(){
        proximoElement.style.display = "none";
        while (respostaElement.firstChild){
            respostaElement.removeChild(respostaElement.firstChild);
        }

    }

     function mostrarQuestao(){
        let questaoAtual = questoes[questaoAtualIndex];
        let questaoNum = questaoAtualIndex + 1;
        questaoElement.innerHTML = questaoNum + ". " + questaoAtual.questao;
        resetarStatus();

        questaoAtual.respostas.forEach((resposta) =>{
            const botao = document.createElement("button");
            botao.innerHTML = resposta.text;
            botao.dataset.id = resposta.id;
            botao.classList.add("btn");
            botao.addEventListener("click", selectResposta);
            respostaElement.appendChild(botao)
        });
     }

     function selectResposta(e){
        const respostas = questoes[questaoAtualIndex].respostas;
        const respostaCorreta = respostas.filter((resposta) => resposta.correct == true)[0];

        const botaoSelecionado = e.target;
        const isCorrect = botaoSelecionado.dataset.id == respostaCorreta.id;
        if(isCorrect){
            botaoSelecionado.classList.add("correta");
            pontuacao++;
        }else{
            botaoSelecionado.classList.add("errada");
        }
        Array.from(respostaElement.children).forEach((botao) => {
            if (botao.dataset.id == respostaCorreta.id) {
                botao.classList.add("correta");
            }
            botao.disabled = true;
        }); 
         proximoElement.style.display = "block";
     }

     function mostrarPontuacao(){
        resetarStatus();
        questaoElement.innerHTML = `Você acertou ${pontuacao} de ${questoes.length}!`;
        proximoElement.innerHTML = "Jogar De Novo!!";
        proximoElement.style.display = "block";
     }

     function handleProximoBotao(){
        questaoAtualIndex++; 
        if(questaoAtualIndex < questoes.length){
            mostrarQuestao();
        }else{
            mostrarPontuacao(); 
        }
     }


     proximoElement.addEventListener("click", () => {
        if(questaoAtualIndex < questoes.length){
            handleProximoBotao();
        }else{
            comecarQuiz();
        }
     });


     comecarQuiz();