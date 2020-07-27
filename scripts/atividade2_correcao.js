var SalvaLocalLoaded = true;
var GGBLoaded = false;
var HTMLLoaded = false;

var margemApplet = 0.1;

document.observe('dom:safeLoaded', function(ev) {
    HTMLLoaded = true;
    SalvaLocalLoaded = true;
    checkInits();
});

function ggbOnInit() {
    GGBLoaded = true;
    checkInits();
}

function checkInits() {
    if (PosicaoAtual.Parte == 4) {
        //Nao tem GeoGebra
        GGBLoaded = true;
    }

    GGBLoaded = true;
    // Checagem se tanto SalvaLocal e Geogebra foram carregados.
    if (SalvaLocalLoaded && GGBLoaded && HTMLLoaded) InitOnLoad();
}

function InitOnLoad() {
    setAtividade('atividade_2', 2, false); //Comecou a fazer a atividade_2

    // Carregar bloco de notas ---
    BlocoNotas = new Blocao();
    MeuBloco[0] = 'Tabela de dados';
    MeuBloco[1] = [
        [{ value: ' ', largura: 4 }, { value: 'Número do Calçado', largura: 4 }, { value: 'Altura', largura: 4 }], //header
        [{ value: 'Média', tipo: 'texto' }, { value: getResp('mediaCalcado'), tipo: 'texto' }, { value: getResp('mediaAltura'), tipo: 'texto' }],
        [{ value: 'Mediana', tipo: 'texto' }, { value: getResp('medianaCalcado'), tipo: 'texto' }, { value: getResp('medianaAltura'), tipo: 'texto' }],
        [{ value: 'Desvio Padrão', tipo: 'texto' }, { value: getResp('desvioPadraoCalcado'), tipo: 'texto' }, { value: getResp('desvioPadraoAltura'), tipo: 'texto' }]
    ];
    MeuBloco.push('Seu Calçado: ' + getResp('meuCalcado'));
    MeuBloco.push('Sua Altura: ' + getResp('minhaAltura'));
    MeuBloco.push('&nbsp');

    var i = 1;
    var tabela = eval(getRespSoft("tabela_principal", "estat-dados"));

    var num_pag = Math.ceil(tabela.length / 9);
    var total = tabela.length;

    var indice = 0;
    for (i = 0; i < num_pag; i++) {
        if (i > 0) MeuBloco.push('Tabela da Atividade 1 (continuação)');
        else MeuBloco.push('Tabela da Atividade 1');
        MeuBloco.push("Total de dados: " + total);
        var dados = new Array();

        // cabecalho
        dados.push([{ value: 'Gênero', largura: 3 }, { value: 'Calçado', largura: 4 }, { value: 'Altura (cm)', largura: 4 }]);

        var j = 0;
        for (j = 0;
            ((j < 9) && (j + i * 9 < total)); j++) {
            indice = 9 * i + j;
            dados.push([{ value: tabela[indice].sexo, tipo: 'texto' }, { value: tabela[indice].calcado, tipo: 'texto' }, { value: tabela[indice].altura, tipo: 'texto' }]);
        }

        MeuBloco.push(dados);
    }
    // -----

    switch (PosicaoAtual.Parte) {
        case 0: //Parte 1
            carregarDadosTabelaA3();
            initParte1();
            break;

        case 1: //Parte 2
            initParte2();
            /* Traz respostas do aluno */
            $('questao_2_a_1').value = valida(getResp('atividade1_questao_2_a_1'));
            Event.observe('questao_2_a_1', 'change', function(evento) {
                setResp('atividade1_questao_2_a_1', $('questao_2_a_1').value);
            });

            $('questao_2_a_2').value = valida(getResp('atividade1_questao_2_a_2'));
            Event.observe('questao_2_a_2', 'change', function(evento) {
                setResp('atividade1_questao_2_a_2', $('questao_2_a_2').value);
            });

            break;

        case 2: //Parte 3
            var applet = document.ggbApplet;

            //Deixa a questao 3 jah selecionada
            var posicao = { Parte: 2, Questao: 'parte3_q3', Item: 0 };
            PegaQuestao(posicao).seleciona();

            initParte3();
            registerListeners();
            registerListeners2();
            /* Traz respostas do aluno */
            $('parte3_q3_b').value = valida(getResp('atividade1_parte3_q3_b'));
            Event.observe('parte3_q3_b', 'change', function(evento) {
                setResp('atividade1_parte3_q3_b', $('parte3_q3_b').value);
            });

            $('parte3_q4_b').value = valida(getResp('atividade1_parte3_q4_b'));
            Event.observe('parte3_q4_b', 'change', function(evento) {
                setResp('atividade1_parte3_q4_b', $('parte3_q4_b').value);
            });

            break;

        case 3: //Parte 4
            var mediaCalcado = Number(getResp('mediaCalcado'));
            var mediaAltura = Number(getResp('mediaAltura'));
            var meuCalcado = Number(getResp('meuCalcado'));
            var minhaAltura = Number(getResp('minhaAltura'));
            var coord1 = arredonda(meuCalcado - mediaCalcado, 2);
            var coord2 = arredonda(minhaAltura - mediaAltura, 2);
            $('coordenadaPontoA2P4').update(coord1 + ' ; ' + coord2);
            initParte4();

            /* Traz respostas do aluno */
            $('questao_5_a_1').value = valida(getResp('atividade1_questao_5_a_1'));
            Event.observe('questao_5_a_1', 'change', function(evento) {
                setResp('atividade1_questao_5_a_1', $('questao_5_a_1').value);
            });

            $('questao_5_a_2').value = valida(getResp('atividade1_questao_5_a_2'));
            Event.observe('questao_5_a_2', 'change', function(evento) {
                setResp('atividade1_questao_5_a_2', $('questao_5_a_2').value);
            });


            break;

        case 4: //Parte 5
            initParte5();
            /* Traz respostas do aluno */
            $('parte5_q6_a').value = valida(getResp('atividade2_parte5_q6_a'));
            Event.observe('parte5_q6_a', 'change', function(evento) {
                setResp('atividade2_parte5_q6_a', $('parte5_q6_a').value);
            });

            $('parte5_q6_b_1').checked = (getResp('atividade2_parte5_q6_b') == '1');
            $('parte5_q6_b_2').checked = (getResp('atividade2_parte5_q6_b') == '2');
            $('parte5_q6_b_3').checked = (getResp('atividade2_parte5_q6_b') == '3');
            Event.observe('parte5_q6_b_1', 'change', function(evento) {
                setResp('atividade2_parte5_q6_b', $('parte5_q6_b_1').value);
            });
            Event.observe('parte5_q6_b_2', 'change', function(evento) {
                setResp('atividade2_parte5_q6_b', $('parte5_q6_b_2').value);
            });
            Event.observe('parte5_q6_b_3', 'change', function(evento) {
                setResp('atividade2_parte5_q6_b', $('parte5_q6_b_3').value);
            });

            $('parte5_q6_c_1').checked = (getResp('atividade2_parte5_q6_c') == '1');
            $('parte5_q6_c_2').checked = (getResp('atividade2_parte5_q6_c') == '2');
            $('parte5_q6_c_3').checked = (getResp('atividade2_parte5_q6_c') == '3');
            $('parte5_q6_c_4').checked = (getResp('atividade2_parte5_q6_c') == '4');
            Event.observe('parte5_q6_c_1', 'change', function(evento) {
                setResp('atividade2_parte5_q6_c', $('parte5_q6_c_1').value);
            });
            Event.observe('parte5_q6_c_2', 'change', function(evento) {
                setResp('atividade2_parte5_q6_c', $('parte5_q6_c_2').value);
            });
            Event.observe('parte5_q6_c_3', 'change', function(evento) {
                setResp('atividade2_parte5_q6_c', $('parte5_q6_c_3').value);
            });
            Event.observe('parte5_q6_c_4', 'change', function(evento) {
                setResp('atividade2_parte5_q6_c', $('parte5_q6_c_4').value);
            });

            $('parte5_q7_a_1').checked = (getResp('atividade2_parte5_q7_a') == '1');
            $('parte5_q7_a_2').checked = (getResp('atividade2_parte5_q7_a') == '2');
            $('parte5_q7_a_3').checked = (getResp('atividade2_parte5_q7_a') == '3');
            $('parte5_q7_a_4').checked = (getResp('atividade2_parte5_q7_a') == '4');
            Event.observe('parte5_q7_a_1', 'change', function(evento) {
                setResp('atividade2_parte5_q7_a', $('parte5_q7_a_1').value);
            });
            Event.observe('parte5_q7_a_2', 'change', function(evento) {
                setResp('atividade2_parte5_q7_a', $('parte5_q7_a_2').value);
            });
            Event.observe('parte5_q7_a_3', 'change', function(evento) {
                setResp('atividade2_parte5_q7_a', $('parte5_q7_a_3').value);
            });
            Event.observe('parte5_q7_a_4', 'change', function(evento) {
                setResp('atividade2_parte5_q7_a', $('parte5_q7_a_4').value);
            });

            break;

        case 5: //Conclusao
            initParte4();
            calculaCoeficienteCorrelacao();
            break;
    }

}

/* A2_P3 -> registra listener */
function registerListeners() {
    var applet = document.ggbApplet;
    applet.registerObjectUpdateListener('Dph1', 'updateListener');
}

function updateListener(objName) {
    var applet = document.ggbApplet;
    var xCoord = applet.getXcoord('Dph1') - Number(getResp('mediaCalcado'));
    xCoord = arredonda(xCoord, 2);
    $('dph1').update(xCoord);
}

function registerListeners2() {
    var applet = document.ggbApplet;
    applet.registerObjectUpdateListener('Dpv1', 'updateListener2');
}

function updateListener2(objName) {
    var applet = document.ggbApplet;
    var yCoord = applet.getYcoord('Dpv1') - Number(getResp('mediaAltura'));
    yCoord = arredonda(yCoord, 2);
    $('dpv1').update(yCoord);
}
/* Fim do register listener */


/**
 *	Compara dois valors e retorna o maior(ou menor) dentre eles
 *	valor1	um valor a ser comparado
 *	valor2	outro valor a ser comparado
 *	Boolean max		se for true, faz comparacao do maior. Se for false, faz a comparacao do menor
 */
function comparaValor(valor1, valor2, max) {
    if (max) {
        if (valor1 > valor2) {
            return valor1;
        }
        return valor2;
    } else {
        if (valor1 < valor2) {
            return valor1;
        }
        return valor2;
    }
}

/* Plota os pontos */
function plotarTodosPontos() {
    var applet = document.ggbApplet;
    var dados = getRespSoft("tabela_principal", "estat-dados");
    dados = eval(dados);

    for (var i = 0; i < dados.length; i++) {
        applet.setFixed('W_' + i, false);
        applet.evalCommand('W_' + i + '=(' + (Number(dados[i].calcado)) + ',' + (Number(dados[i].altura)) + ')');
        applet.setVisible('W_' + i, true);
        applet.setFixed('W_' + i, true);
        applet.setColor('W_' + i, 204, 204, 204);
        applet.setLayer('W_' + i, 1);
    }
}

function plotarMeuPonto() {
    //console.log("plotarMeuPonto COMEÇO")
    var applet = document.ggbApplet;
    var dados = getRespSoft("tabela_principal", "estat-dados");
    dados = eval(dados);

    var minhaLinha = getResp('minhaLinha')
    var calcado = Number(dados[minhaLinha].calcado);
    var altura = (Number(dados[minhaLinha].altura));


    applet.evalCommand('M1 = (' + calcado + ',' + altura + ')');
    applet.setFixed('M1', true);
    applet.setColor('M1', 255, 0, 0);
    applet.setLabelStyle('M1', 2);
    applet.setLabelVisible('M1', true);


    applet.evalCommand('meuNome = Text["' + getResp('meuNome') + '",M1+Desvio]'); //O desvio estah representado pelo ponto Desvio
    applet.setLayer('meuNome', 1);
    applet.setColor('meuNome', 255, 0, 0);
    applet.setLabelVisible('meuNome', true);



    //console.log("plotarMeuPonto FINAL");
}

function ajustaZoom() {
    var applet = document.ggbApplet;
    var minA = Number(getResp('minAltura'));
    var maxA = Number(getResp('maxAltura'));
    var medA = Number(getResp('mediaAltura'));
    var minC = Number(getResp('minCalcado'));
    var maxC = Number(getResp('maxCalcado'));
    var medC = Number(getResp('mediaCalcado'));

    var dpCalcado = Number(getResp('desvioPadraoCalcado'));
    var dpAltura = Number(getResp('desvioPadraoAltura'));

    minA = comparaValor(minA, medA - 3 * dpAltura, false);
    maxA = comparaValor(maxA, medA + 3 * dpAltura, true);
    minC = comparaValor(minC, medC - 3 * dpCalcado, false);
    maxC = comparaValor(maxC, medC + 3 * dpCalcado, true);

    applet.setValue('maxh', Math.floor(maxC));
    applet.setValue('minh', Math.floor(minC));
    applet.setValue('maxv', Math.floor(maxA));
    applet.setValue('minv', Math.floor(minA));

    minC = Math.floor(minC) - 1;
    minA = Math.floor(minA) - 0.1;

    var margemA = (maxA - minA) * margemApplet;
    var margemC = (maxC - minC) * margemApplet;

    minA -= margemA;
    maxA += margemA;
    minC -= margemC;
    maxC += margemC;

    mudarEscala(minC, maxC, minA, maxA);

    var margemErro = (maxA - minA) * 0.005;
    setResp('margemErro', margemErro);

    applet.evalCommand('desvioRotuloY = ' + margemA * 0.55);
    applet.evalCommand('desvioRotuloX = ' + String(-margemC * 0.15));

}

function initParte1() {
    plotarTodosPontos();
    ajustaZoom();
}

function initParte2() {
    var minA = Number(getResp('minAltura'));
    var maxA = Number(getResp('maxAltura'));
    var minC = Number(getResp('minCalcado'));
    var maxC = Number(getResp('maxCalcado'));

    ajustaZoom();
    plotarTodosPontos();
    plotarMeuPonto();

    //Plota o ponto movel
    var applet = document.ggbApplet;
    applet.evalCommand('M=(' + (minC + maxC) / 2 + ',' + (minA + maxA) / 2 + ')');
    applet.setLabelStyle('M', 1);
    applet.setLabelVisible('M', true);
}

function initParte3() {
    var mediaCalcado = Number(getResp('mediaCalcado'));
    var mediaAltura = Number(getResp('mediaAltura'));

    var applet = document.ggbApplet;
    applet.setCoords('Origem', mediaCalcado, mediaAltura);

    plotarTodosPontos();
    plotarMeuPonto();

    ajustaZoom();

    var xCoord = applet.getXcoord('Dph1') - Number(getResp('mediaCalcado'));
    xCoord = arredonda(xCoord, 2);
    $('dph1').update(xCoord);

    var yCoord = applet.getYcoord('Dpv1') - Number(getResp('mediaAltura'));
    yCoord = arredonda(yCoord, 2);
    $('dpv1').update(yCoord);

    //var margemErro = Number(getResp('margemErro'))+1.3;	//Seta a margem do rotulo do eixo x.
    //applet.setValue('desvioRotuloY',margemErro);
}

function initParte4() {
    var applet = document.ggbApplet;

    var minA = Number(getResp('minAltura'));
    var maxA = Number(getResp('maxAltura'));
    var minC = Number(getResp('minCalcado'));
    var maxC = Number(getResp('maxCalcado'));

    var mediaCalcado = Number(getResp('mediaCalcado'));
    var mediaAltura = Number(getResp('mediaAltura'));
    //console.log(mediaCalcado);
    //console.log(mediaAltura);
    applet.setCoords('Origem', mediaCalcado, mediaAltura);

    var dpCalcado = Number(getResp('desvioPadraoCalcado'));
    var dpAltura = Number(getResp('desvioPadraoAltura'));

    applet.setValue('Dph', dpCalcado);
    applet.setValue('Dpv', dpAltura);
    //console.log(dpCalcado);
    //console.log(dpAltura);

    plotarTodosPontos();
    plotarMeuPonto();

    ajustaZoom();

}

function initParte5() {
    $('coordenadasZ').update('(' + arredonda(Number(getResp('coordenadaZx')), 2) + ' , ' + arredonda(Number(getResp('coordenadaZy')), 2) + ')');
    var applet = document.ggbApplet;

    var minA = Number(getResp('minAltura'));
    var maxA = Number(getResp('maxAltura'));
    var minC = Number(getResp('minCalcado'));
    var maxC = Number(getResp('maxCalcado'));

    var mediaCalcado = Number(getResp('mediaCalcado'));
    var mediaAltura = Number(getResp('mediaAltura'));
    //console.log(mediaCalcado);
    //console.log(mediaAltura);
    applet.setCoords('Origem', mediaCalcado, mediaAltura);

    var dpCalcado = Number(getResp('desvioPadraoCalcado'));
    var dpAltura = Number(getResp('desvioPadraoAltura'));

    applet.setValue('Dph', dpCalcado);
    applet.setValue('Dpv', dpAltura);
    //console.log(dpCalcado);
    //console.log(dpAltura);

    var A = false;
    var B = false;
    var C = false;
    var D = false;

    var dados = getRespSoft("tabela_principal", "estat-dados");
    dados = eval(dados);
    for (i = 0; i < dados.length; i++) {
        if ((Number(getResp('minhaLinha')) != i)) {
            if (!A && Number(dados[i].calcado) > mediaCalcado && (Number(dados[i].altura)) > mediaAltura) {
                //1
                applet.evalCommand('A=(' + (Number(dados[i].calcado)) + ',' + (Number(dados[i].altura)) + ')');
                applet.setPointStyle('A', 2);
                applet.setVisible('A', true);
                applet.setFixed('A', true);
                applet.setColor('A', 0, 204, 0);
                applet.setLabelStyle('A', 0);
                applet.setLabelVisible('A', true);
                applet.setLayer('A', 2);
                A = true;
            } else if (!B && Number(dados[i].calcado) < mediaCalcado && (Number(dados[i].altura)) > mediaAltura) {
                //2
                applet.evalCommand('B=(' + (Number(dados[i].calcado)) + ',' + (Number(dados[i].altura)) + ')');
                applet.setPointStyle('B', 2);
                applet.setVisible('B', true);
                applet.setFixed('B', true);
                applet.setColor('B', 0, 204, 0);
                applet.setLabelStyle('B', 0);
                applet.setLabelVisible('B', true);
                applet.setLayer('B', 2);
                B = true;
            } else if (!C && Number(dados[i].calcado) < mediaCalcado && (Number(dados[i].altura)) < mediaAltura) {
                //3
                applet.evalCommand('C=(' + (Number(dados[i].calcado)) + ',' + (Number(dados[i].altura)) + ')');
                applet.setPointStyle('C', 2);
                applet.setVisible('C', true);
                applet.setFixed('C', true);
                applet.setColor('C', 0, 204, 0);
                applet.setLabelStyle('C', 0);
                applet.setLabelVisible('C', true);
                applet.setLayer('C', 2);
                C = true;
            } else if (!D && Number(dados[i].calcado) > mediaCalcado && (Number(dados[i].altura)) < mediaAltura) {
                //4
                applet.evalCommand('D=(' + (Number(dados[i].calcado)) + ',' + (Number(dados[i].altura)) + ')');
                applet.setPointStyle('D', 2);
                applet.setVisible('D', true);
                applet.setFixed('D', true);
                applet.setColor('D', 0, 204, 0);
                applet.setLabelStyle('D', 0);
                applet.setLabelVisible('D', true);
                applet.setLayer('D', 2);
                D = true;
            } else {
                applet.evalCommand('W_' + i + '=(' + (Number(dados[i].calcado)) + ',' + (Number(dados[i].altura)) + ')');
                applet.setVisible('W_' + i, true);
                applet.setFixed('W_' + i, true);
                applet.setColor('W_' + i, 102, 102, 102);
                applet.setLayer('W_' + i, 1);
            }
        } else {
            plotarMeuPonto();
        }
    }

    if (!A) {
        applet.evalCommand('A=(' + (mediaCalcado + dpCalcado) + ',' + (mediaAltura + dpAltura) + ')');
        applet.setPointStyle('A', 2);
        applet.setVisible('A', true);
        applet.setFixed('A', true);
        applet.setColor('A', 0, 204, 0);
        applet.setLabelStyle('A', 0);
        applet.setLabelVisible('A', true);
        applet.setLayer('A', 2);
    }
    if (!B) {
        applet.evalCommand('B=(' + (mediaCalcado - dpCalcado) + ',' + (mediaAltura + dpAltura) + ')');
        applet.setPointStyle('B', 2);
        applet.setVisible('B', true);
        applet.setFixed('B', true);
        applet.setColor('B', 0, 204, 0);
        applet.setLabelStyle('B', 0);
        applet.setLabelVisible('B', true);
        applet.setLayer('B', 2);
    }
    if (!C) {
        applet.evalCommand('C=(' + (mediaCalcado - dpCalcado) + ',' + (mediaAltura - dpAltura) + ')');
        applet.setPointStyle('C', 2);
        applet.setVisible('C', true);
        applet.setFixed('C', true);
        applet.setColor('C', 0, 204, 0);
        applet.setLabelStyle('C', 0);
        applet.setLabelVisible('C', true);
        applet.setLayer('C', 2);
    }
    if (!D) {
        applet.evalCommand('D=(' + (mediaCalcado + dpCalcado) + ',' + (mediaAltura - dpAltura) + ')');
        applet.setPointStyle('D', 2);
        applet.setVisible('D', true);
        applet.setFixed('D', true);
        applet.setColor('D', 0, 204, 0);
        applet.setLabelStyle('D', 0);
        applet.setLabelVisible('D', true);
        applet.setLayer('D', 2);
    }

    ajustaZoom();

}

function calculaCoeficienteCorrelacao() {
    var Zx = new Array;
    var Zy = new Array;
    var mediaCalcado = Number(getResp('mediaCalcado'));
    var mediaAltura = Number(getResp('mediaAltura'));
    var dpCalcado = Number(getResp('desvioPadraoCalcado'));
    var dpAltura = Number(getResp('desvioPadraoAltura'));
    var somatorio = 0;

    var dados = getRespSoft("tabela_principal", "estat-dados");
    dados = eval(dados);

    for (var i = 0; i < dados.length; i++) {
        Zx[i] = (Number(dados[i].calcado) - mediaCalcado) / dpCalcado;
        Zy[i] = (Number(dados[i].altura) - mediaAltura) / dpAltura;
        somatorio += Zx[i] * Zy[i];
    }

    var r = somatorio / dados.length;
    r = arredonda(r, 2);
    r = r + ''; //Transforma em String
    r = r.replace('.', ',')

    $('coeficienteCorrelacao').update(r);

}

//Atividade 2 Parte 1
function addRowA3(idTabela) {

    var tbody = document.getElementById("tabelaDados").getElementsByTagName("TBODY")[0];
    var row = document.createElement("TR");

    //Adiciona numero da linha
    td = document.createElement("TD");
    td.setAttribute("id", "linha_" + idTabela);
    row.appendChild(td);

    //Adiciona os campos de Genero
    td = document.createElement("TD");
    td.setAttribute("id", "sexo_" + idTabela);
    row.appendChild(td);

    //Adiciona os campos NUMERO CALCADO
    td = document.createElement("TD");
    td.setAttribute("id", "calcado_" + idTabela);
    row.appendChild(td);

    //Adiciona os campos de ALTURA
    td = document.createElement("TD");
    td.setAttribute("id", "altura_" + idTabela);
    td.setAttribute("style", "width:30px");
    row.appendChild(td);

    // Adiciona a row no tbody.
    tbody.appendChild(row);

}

//Atividade 3 Parte 1
function carregarDadosTabelaA3() {
    var dados = getRespSoft("tabela_principal", "estat-dados");
    var linha = 1;

    dados = eval(dados);

    for (i = 0; i < dados.length; i++, linha++) {
        addRowA3(i);
        $('linha_' + i).innerHTML = linha;
        $('sexo_' + i).innerHTML = dados[i].sexo;
        $('calcado_' + i).innerHTML = dados[i].calcado;
        $('altura_' + i).innerHTML = dados[i].altura;
    }
    idTabela = i;
}

// Seleciona a questao da A3 P3 Q4A
function selecionouA3_P3_Q4_A() {
    var applet = document.ggbApplet;
    applet.setVisible('Dph1', true);
    applet.setVisible('Dpv1', false);
    applet.setVisible('Dpv2', false);
    applet.setVisible('Dpv3', false);
    applet.setVisible('Dpvmenos1', false);
    applet.setVisible('Dpvmenos2', false);
    applet.setVisible('Dpvmenos3', false);
    applet.setVisible('listaRotuloV', false);
    applet.setVisible('listaRotuloH', true);
    applet.setVisible('Rx', false);
    applet.setVisible('Ry', false);
}

// Seleciona a questao da A3 P3 Q4B
function selecionouA3_P3_Q4_B() {
    var applet = document.ggbApplet;
    applet.setVisible('Dph1', true);
    applet.setVisible('Dpv1', false);
    applet.setVisible('Dpv2', false);
    applet.setVisible('Dpv3', false);
    applet.setVisible('Dpvmenos1', false);
    applet.setVisible('Dpvmenos2', false);
    applet.setVisible('Dpvmenos3', false);
    applet.setVisible('Rx', true);
    applet.setVisible('Ry', false);
}

// Seleciona a questao da A3 P3 Q5A
function selecionouA3_P3_Q5_A() {
    var applet = document.ggbApplet;
    applet.setVisible('Dpv1', true);
    applet.setVisible('listaRotuloH', false);
    applet.setVisible('listaRotuloV', true);
    applet.setVisible('Rx', false);
    applet.setVisible('Ry', false);
    applet.setVisible('Dph1', false);
    applet.setVisible('Dph2', false);
    applet.setVisible('Dph3', false);
    applet.setVisible('Dphmenos1', false);
    applet.setVisible('Dphmenos2', false);
    applet.setVisible('Dphmenos3', false);
}

// Seleciona a questao da A3 P3 Q5B
function selecionouA3_P3_Q5_B() {
    var applet = document.ggbApplet;
    applet.setVisible('Dpv1', true);
    applet.setVisible('Dph1', false);
    applet.setVisible('Dph2', false);
    applet.setVisible('Dph3', false);
    applet.setVisible('Dphmenos1', false);
    applet.setVisible('Dphmenos2', false);
    applet.setVisible('Dphmenos3', false);
    applet.setVisible('Ry', true);
    applet.setVisible('Rx', false);
}

/**************************************
		FUNCOES DE USO GERAL
**************************************/
function tudoCerto() {
    if (PosicaoAtual.Parte == 4) { //Ultima parte
        setAtividade('atividade_2', 3, true); //atividade_2 estah feita
    }
}

function set_inicial_p1() {
    //console.log("set inicial COMEÇO");
    var dados = getRespSoft("tabela_principal", "estat-dados");
    dados = eval(dados);
    var num_dados = dados.length;

    if (Number($('input_valor_inicial_minha_linha').value) > num_dados ||
        isNaN($('input_valor_inicial_minha_linha').value) ||
        Number($('input_valor_inicial_minha_linha').value) <= 0) {

        var Perg = {
            conteudo: 'Digite um número correspondente ao número da tabela.',
            layout: ['seta_baixo', 'direita'],
            largura: 10,
            callback: function() {},
            respostas: [{ sim: 'Ok' }]
        };

        var tmp = new PopupCallback($('link_valor_inicial'), Perg.conteudo, Perg.layout, Perg.largura, Perg.callback, Perg.respostas);
        tmp.abre();
        Event.stopObserving($('link_valor_inicial'), 'click');
        Event.observe($('link_valor_inicial'), 'click', set_inicial_p1);
    } else {
        var meuNome = $('input_valor_inicial_meu_nome').value;

        if (meuNome == '') {
            var Perg1 = {
                conteudo: 'Digite o seu nome',
                layout: ['seta_baixo', 'direita'],
                largura: 10,
                callback: function() {},
                respostas: [{ sim: 'Ok' }]
            };

            var tmp = new PopupCallback($('link_valor_inicial'), Perg1.conteudo, Perg1.layout, Perg1.largura, Perg1.callback, Perg1.respostas);
            tmp.abre();
            Event.stopObserving($('link_valor_inicial'), 'click');
            Event.observe($('link_valor_inicial'), 'click', set_inicial_p1);
            return false;
        }

        meuNome = meuNome.substring(0, 21); //Trunca o nome digitado

        setResp('minhaLinha', Number($('input_valor_inicial_minha_linha').value) - 1);
        setResp('meuNome', meuNome);

        var minhaLinha = $('input_valor_inicial_minha_linha').value - 1;
        var meuCalcado = Number($('calcado_' + minhaLinha).innerHTML);
        setResp('meuCalcado', meuCalcado);
        var minhaAltura = Number($('altura_' + minhaLinha).innerHTML);
        setResp('minhaAltura', minhaAltura);

        // Atualiza as medidas no bloco de notas
        MeuBloco[2] = 'Seu Calçado: ' + getResp('meuCalcado');
        MeuBloco[3] = 'Sua Altura: ' + getResp('minhaAltura');

        plotarMeuPonto();

        $('valor_inicial').addClassName('desabilitada');
        $('input_valor_inicial_minha_linha').trava();
        $('input_valor_inicial_meu_nome').trava();
        $('link_valor_inicial').hide();
        $('unset_inicial_p1').show();

        permiteContinuar(true);
    }

    //console.log("set inicial FINAL");
}

function unset_inicial_p1() {
    if (this.resultado == 'sim') {
        setResp('meuCalcado', '');
        setResp('minhaAltura', '');

        setResp('minhaLinha', '');
        setResp('meuNome', '');

        // Atualiza as medidas no bloco de notas
        MeuBloco[2] = 'Seu Calçado:';
        MeuBloco[3] = 'Sua Altura:';

        var applet = document.ggbApplet;
        applet.deleteObject('M1');
        applet.deleteObject('meuNome');

        $('valor_inicial').removeClassName('desabilitada');
        $('input_valor_inicial_minha_linha').destrava();
        $('input_valor_inicial_meu_nome').destrava();
        $('link_valor_inicial').show();
        $('unset_inicial_p1').hide();

        permiteContinuar(false);
        setResp('automacao_atividade_2_parte_1', 0);
        gerencia_partes();
    }
}

/**************************************
		FUNCOES DE CORRECAO
**************************************/

function corrige_q_1(valor) {
    var mediaCalcado = Number(getResp('mediaCalcado'));
    var mediaAltura = Number(getResp('mediaAltura'));
    //console.log(Number(getResp('mediaCalcado')));
    //console.log(Number(getResp('mediaAltura')));

    var applet = document.ggbApplet;
    if ((Math.abs(applet.getXcoord('M') - mediaCalcado) < 0.3) && (Math.abs(applet.getYcoord('M') - mediaAltura) < 0.5)) {
        applet.setValue('verEixo2', 1);
        applet.setCoords('M', mediaCalcado, mediaAltura);
        applet.setCoords('Origem2', mediaCalcado, mediaAltura);
        applet.setColor('eixoX1', 204, 204, 204);
        applet.setColor('eixoY1', 204, 204, 204);
        applet.setColor('listaSegmentosV', 204, 204, 204);
        applet.setColor('listaSegmentosH', 204, 204, 204);
        applet.setFixed('M', true);
        return [true];
    }
    return [false];
}

function corrige_q_2(valor) {
    var mediaCalcado = Number(getResp('mediaCalcado'));
    var mediaAltura = Number(getResp('mediaAltura'));
    //console.log(mediaCalcado);
    //console.log(mediaAltura);

    var meuCalcado = Number(getResp('meuCalcado'));
    var minhaAltura = Number(getResp('minhaAltura'));
    //console.log(meuCalcado);
    //console.log(minhaAltura);

    var resp1 = ($('questao_2_a_1').value).replace(',', '.');
    resp1 = Math.round(resp1);
    var resp2 = ($('questao_2_a_2').value).replace(',', '.');
    resp2 = Math.round(resp2);
    //console.log(resp1);
    //console.log(resp2);

    var respCorreta1 = meuCalcado - mediaCalcado;
    respCorreta1 = Math.round(respCorreta1);
    var respCorreta2 = minhaAltura - mediaAltura;
    respCorreta2 = Math.round(respCorreta2);
    //console.log(respCorreta1);
    //console.log(respCorreta2);

    var correto1 = false;
    var correto2 = false;

    if (resp1 == respCorreta1) {
        $('corretor_questao_2_a_1').removeClassName('incorreto');
        $('corretor_questao_2_a_1').addClassName('correto');
        correto1 = true;
        setResp('coordenada1', resp1);
    } else {
        $('corretor_questao_2_a_1').removeClassName('correto');
        $('corretor_questao_2_a_1').addClassName('incorreto');
        correto1 = false;
    }

    if (resp2 == respCorreta2) {
        $('corretor_questao_2_a_2').removeClassName('incorreto');
        $('corretor_questao_2_a_2').addClassName('correto');
        correto2 = true;
        setResp('coordenada2', resp2);
    } else {
        $('corretor_questao_2_a_2').removeClassName('correto');
        $('corretor_questao_2_a_2').addClassName('incorreto');
        correto2 = false;
    }

    return [(correto1 && correto2)];
}

function corrige_q_3_a(valor) {
    var applet = document.ggbApplet;
    var dpCalcado = Number(getResp('desvioPadraoCalcado'));
    var dph1Resposta = applet.getXcoord('Dph1') - Number(getResp('mediaCalcado'));
    var dpY = applet.getYcoord('Dph1');
    //alert(dph1Resposta);
    if (Math.abs(dph1Resposta - dpCalcado) < 0.1) {
        applet.setVisible('listaRotuloV', true);
        applet.setVisible('Dph2', true);
        applet.setVisible('Dph3', true);
        applet.setVisible('Dphmenos1', true);
        applet.setVisible('Dphmenos2', true);
        applet.setVisible('Dphmenos3', true);
        applet.setCoords('Dph1', dpCalcado + Number(getResp('mediaCalcado')), dpY);
        applet.setFixed('Dph1', true);
        return [true];
    }
    applet.setVisible('listaRotuloV', false);
    applet.setVisible('Dph2', false);
    applet.setVisible('Dph3', false);
    applet.setVisible('Dphmenos1', false);
    applet.setVisible('Dphmenos2', false);
    applet.setVisible('Dphmenos3', false);
    return [false];
}

function corrige_q_3_b(valor) {
    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaNumero(valor[0]);

    var applet = document.ggbApplet;

    var total = 0;
    var dados = getRespSoft("tabela_principal", "estat-dados");
    dados = eval(dados);
    var num_dados = dados.length;
    var dpCalcado = Number(getResp('desvioPadraoCalcado'));
    var mediaCalcado = Number(getResp('mediaCalcado'));

    for (var i = 0; i < dados.length; i++) {
        if ((Number(dados[i].calcado) >= dpCalcado * (-3) + mediaCalcado) && (Number(dados[i].calcado) <= dpCalcado * (3) + mediaCalcado)) {
            total++;
        }
    }

    return [Math.abs(valor[0] - (total / num_dados)) < 0.01];
}

function corrige_q_4_a(valor) {
    var applet = document.ggbApplet;
    var dpAltura = Number(getResp('desvioPadraoAltura'));
    var dpv1Resposta = applet.getYcoord('Dpv1') - Number(getResp('mediaAltura'));
    var dpX = applet.getXcoord('Dpv1');

    if (Math.abs(dpv1Resposta - dpAltura) < Number(getResp('margemErro'))) {
        applet.setVisible('listaRotuloH', true);
        applet.setVisible('Dpv2', true);
        applet.setVisible('Dpv3', true);
        applet.setVisible('Dpvmenos1', true);
        applet.setVisible('Dpvmenos2', true);
        applet.setVisible('Dpvmenos3', true);
        applet.setCoords('Dpv1', dpX, dpAltura + Number(getResp('mediaAltura')));
        applet.setFixed('Dpv1', true);
        return [true];
    }
    applet.setVisible('listaRotuloH', false);
    applet.setVisible('Dpv2', false);
    applet.setVisible('Dpv3', false);
    applet.setVisible('Dpvmenos1', false);
    applet.setVisible('Dpvmenos2', false);
    applet.setVisible('Dpvmenos3', false);
    return [false];
}

function corrige_q_4_b(valor) {

    valor[0] = valor[0].replace(',', '.');
    valor[0] = processaNumero(valor[0]);

    var applet = document.ggbApplet;

    var total = 0;
    var dados = getRespSoft("tabela_principal", "estat-dados");
    dados = eval(dados);
    var num_dados = dados.length;
    var dpAltura = Number(getResp('desvioPadraoAltura'));
    var mediaAltura = Number(getResp('mediaAltura'));


    for (i = 0; i < dados.length; i++) {
        if ((Number(dados[i].altura) >= dpAltura * (-3) + mediaAltura) && (Number(dados[i].altura) <= dpAltura * 3 + mediaAltura)) {
            total++;
        }
    }

    return [Math.abs(valor[0] - (total / num_dados)) < 0.01];
}

function corrige_q_5(valor) {
    //var dpCalcado = Number(getResp('desvioPadraoCalcado'));
    //var dpAltura = getResp('desvioPadraoAltura');

    var correto1 = false;
    var correto2 = false;

    var resp1 = (Number(getResp('meuCalcado')) - Number(getResp('mediaCalcado'))) / Number(getResp('desvioPadraoCalcado'));
    var resp2 = (Number(getResp('minhaAltura')) - Number(getResp('mediaAltura'))) / Number(getResp('desvioPadraoAltura'));
    //console.log(resp1);
    //console.log(resp2);

    var respAluno1 = ($('questao_5_a_1').value).replace(',', '.');
    var respAluno2 = ($('questao_5_a_2').value).replace(',', '.');

    if (Math.abs(resp1 - respAluno1) < 0.01) {
        $('corretor_questao_5_a_1').removeClassName('incorreto');
        $('corretor_questao_5_a_1').addClassName('correto');
        setResp('coordenadaZx', respAluno1);
        correto1 = true;
    } else {
        $('corretor_questao_5_a_1').removeClassName('correto');
        $('corretor_questao_5_a_1').addClassName('incorreto');
        setResp('coordenadaZx', '');
        correto1 = false;
    }

    if (Math.abs(resp2 - respAluno2) < 0.01) {
        $('corretor_questao_5_a_2').removeClassName('incorreto');
        $('corretor_questao_5_a_2').addClassName('correto');
        correto2 = true;
        setResp('coordenadaZy', respAluno2);
    } else {
        $('corretor_questao_5_a_2').removeClassName('correto');
        $('corretor_questao_5_a_2').addClassName('incorreto');
        setResp('coordenadaZy', '');
        correto2 = false;
    }

    return [correto1 && correto2];

}

function corrige_q_6_a(valor) {
    valor[0] = valor[0].replace(',', '.');

    //Correcao de acordo com o valor do bloco de notas.
    var Zx = (Number(getResp('meuCalcado')) - Number(getResp('mediaCalcado'))) / Number(getResp('desvioPadraoCalcado'));
    var Zy = (Number(getResp('minhaAltura')) - Number(getResp('mediaAltura'))) / Number(getResp('desvioPadraoAltura'));

    //Correcao de acordo com a resposta do aluno na Q5.
    var respostaDoAlunoZX = Number(getResp('coordenadaZx'));
    var respostaDoAlunoZY = Number(getResp('coordenadaZy'));
    var respostaAluno = respostaDoAlunoZX * respostaDoAlunoZY;

    if ((Math.abs((Zx * Zy) - valor[0]) < 0.01) || (Math.abs(respostaAluno - valor[0]) < 0.01)) {
        setResp('resp_A3_P5_Q8_A', (Zx * Zy));
        return [true];
    }
    return [false];
}

function corrige_q_6_b(valor) {
    var Zx = (Number(getResp('meuCalcado')) - Number(getResp('mediaCalcado'))) / Number(getResp('desvioPadraoCalcado'));
    var Zy = (Number(getResp('minhaAltura')) - Number(getResp('mediaAltura'))) / Number(getResp('desvioPadraoAltura'));
    var sinal = Zx * Zy;

    if (sinal > 0) {
        return [valor[0] ? true : null, valor[1] ? false : null, valor[2] ? false : null];
    } else if (sinal < 0) {
        return [valor[0] ? false : null, valor[1] ? true : null, valor[2] ? false : null];
    }

    return [valor[0] ? false : null, valor[1] ? false : null, valor[2] ? true : null];
}

function corrige_q_6_c(valor) {
    var applet = document.ggbApplet;
    var xOrigem = applet.getXcoord('Origem');
    var yOrigem = applet.getYcoord('Origem');
    var xMeuPonto = Number(getResp('meuCalcado'));
    var yMeuPonto = Number(getResp('minhaAltura'))

    if (xMeuPonto > xOrigem) {
        if (yMeuPonto > yOrigem) {
            //1
            return [valor[0] ? true : null, valor[1] ? false : null, valor[2] ? false : null, valor[3] ? false : null];
        } else {
            //4
            return [valor[0] ? false : null, valor[1] ? false : null, valor[2] ? false : null, valor[3] ? true : null];
        }
    } else {
        if (yMeuPonto > yOrigem) {
            //2
            return [valor[0] ? false : null, valor[1] ? true : null, valor[2] ? false : null, valor[3] ? false : null];
        } else {
            //3
            return [valor[0] ? false : null, valor[1] ? false : null, valor[2] ? true : null, valor[3] ? false : null];
        }
    }
}

function corrige_q_7(valor) {
    return [valor[0] ? false : null, valor[1] ? true : null, valor[2] ? false : null, valor[3] ? false : null];
}