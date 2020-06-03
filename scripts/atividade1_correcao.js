var SalvaLocalLoaded = true;
var GGBLoaded = false;
var HTMLLoaded = false;

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
    //Atividade sem applet
    GGBLoaded = true;

    // Checagem se tanto SalvaLocal e Geogebra foram carregados.

    if (SalvaLocalLoaded && GGBLoaded && HTMLLoaded) InitOnLoad();
}

function InitOnLoad() {
    setResp('atividade_1', 2); //Comecou a fazer a atividade_1

    BlocoNotas = new Blocao();
    MeuBloco[0] = 'Tabela de dados';
    MeuBloco[1] = [
        [{ value: ' ', largura: 4 }, { value: 'Número do Calçado', largura: 4 }, { value: 'Altura', largura: 4 }], //header
        [{ value: 'Média', tipo: 'texto' }, { value: getResp('mediaCalcado'), tipo: 'texto' }, { value: getResp('mediaAltura'), tipo: 'texto' }],
        [{ value: 'Mediana', tipo: 'texto' }, { value: getResp('medianaCalcado'), tipo: 'texto' }, { value: getResp('medianaAltura'), tipo: 'texto' }],
        [{ value: 'Desvio Padrão', tipo: 'texto' }, { value: getResp('desvioPadraoCalcado'), tipo: 'texto' }, { value: getResp('desvioPadraoAltura'), tipo: 'texto' }]
    ];

    switch (PosicaoAtual.Parte) {
        case 0:
            Event.observe('add5row', 'click', function(evento) {
                adicionarLinhas(5);
            });

            var existeTabela = eval(getRespSoft("tabela_principal", "estat-dados"));

            if (existeTabela != null) {

                $('msg_alerta_tabela').update("<strong>Atenção</strong>:  A tabela já está preenchida com dados digitados anteriormente. Se você quiser aproveitá-los, clique <strong>Salvar dados</strong> ou então clique <strong>limpar dados</strong> para preencher com novas informações. Lembre-se de incluir os dados relativos a você mesmo.<br><br>");;

                carregarDadosTabela();
                verificaRestricoesTabela();
                //permiteContinuar(true);
            } else {
                idTabela = 0;
                adicionarLinhas(10);
            }

            //Deixar sempre travado a A1_P2
            permiteContinuar(false);
            setResp('automacao_atividade_1_parte_1', 0);
            gerencia_partes();

            var tbody = document.getElementById("tabelaDados").getElementsByTagName("TBODY")[0];
            adicionaInputListener(tbody.rows.length);

            break;

        case 1:
            intiA1_P2();
            /* Traz respostas do aluno */
            $('parte2_q1_a').value = valida(getResp('atividade1_parte2_q1_a'));
            Event.observe('parte2_q1_a', 'change', function(evento) {
                setResp('atividade1_parte2_q1_a', $('parte2_q1_a').value);
            });

            $('parte2_q1_b').value = valida(getResp('atividade1_parte2_q1_b'));
            Event.observe('parte2_q1_b', 'change', function(evento) {
                setResp('atividade1_parte2_q1_b', $('parte2_q1_b').value);
            });

            break;
    }
}


function tudoCerto() {
    if (PosicaoAtual.Parte == 1) { //Ultima parte
        setAtividade('atividade_1', 3, true); //atividade_1 estah feita
        setAtividade('atividade_2', 1, false); //atividade_2 estah liberada
    }
}

function verificaRestricoesTabela() {

    var array_dados = criaArrayDados();

    if (array_dados.length == 0) {
        var err_msg = "";

        err_msg = "O seu conjunto de dados não contém dez linhas válidas. Preencha a tabela até atingir esse valor mínimo.<br>";
        $('confirma_gravacao').update(err_msg);
        return false;
    } else {
        //Busca ao menos 1 elemento por sexo
        var contM = 0;
        var contF = 0;
        var sexoOK = false;

        for (var i = 0;
            ((i < array_dados.length) && !sexoOK); i++) {
            if (array_dados[i].sexo == "M") {
                contM++;
            } else {
                contF++;
            }

            sexoOK = ((contM != 0) && (contF != 0));
        }

        var maisQueDez = false;
        if (array_dados.length >= 10) maisQueDez = true;

        var err = sexoOK && maisQueDez;
        var err_msg = "";

        if (!maisQueDez) err_msg = "O seu conjunto de dados não contém dez linhas válidas. Preencha a tabela até atingir esse valor mínimo.<br>";
        if (!sexoOK) err_msg = err_msg + "A tabela deve conter pelo menos um indivíduo de cada gênero. Preencha, no mínimo, mais uma linha com o gênero que ainda não apareceu.<br>";

        $('confirma_gravacao').update(err_msg);
        //permiteContinuar(err);		

        return err;
    }
}


var idTabela = 0;
var nCorretos = 0;
var vetorSexo = new Array();
var vetorCalcado = new Array();
var vetorAltura = new Array();


function adicionaInputListener(nListeners) {

    for (i = 0; i < nListeners; i++) {

        // Inputs de sexo
        Event.observe('sexo_' + i, 'change', function(evento) {
            validaInput_linha(this);
        });

        // Inputs de altura
        Event.observe('altura_' + i, 'change', function(evento) {
            validaInput_linha(this);
        });

        // Inputs de calcado
        Event.observe('calcado_' + i, 'change', function(evento) {
            validaInput_linha(this);
        });

    }
}

function validaInput_linha(obj) {
    var nome = obj.id;
    var idLinha;

    idLinha = nome.split("_")[1];

    var aux_sexo = $('sexo_' + idLinha);
    var aux_calcado = $('calcado_' + idLinha);
    var aux_altura = $('altura_' + idLinha);

    // estado = ["0","1","2"] -> [ vazio, correto, incorreto  ]
    //var estado = $('status_'+idLinha).innerHTML;
    var estado = $('linha_' + idLinha).readAttribute("status");

    if ((aux_calcado.value.length == 0) || (aux_sexo.value.length == 0) || (aux_altura.value.length == 0)) {
        $('valida_' + idLinha).update(' ');
        $('linha_' + idLinha).writeAttribute("status", "0");

        if (estado == 1) {
            nCorretos--;
        }
        //$('status_'+idLinha).update("0");
    } else if (validaInput_sexo(aux_sexo.value) && validaInput_altura(aux_altura.value) && validaInput_calcado(aux_calcado.value)) {

        if (estado != "1") {
            nCorretos++;
        }

        $('valida_' + idLinha).update('<img src="img_layout/certinho.gif"/>');
        $('linha_' + idLinha).writeAttribute("status", "1");
        //$('status_'+idLinha).update("1");

    } else {
        if (estado == "1") {
            nCorretos--;
        }

        $('valida_' + idLinha).update('<img src="img_layout/erradinho.gif"/>');
        $('linha_' + idLinha).writeAttribute("status", "2");
        //$('status_'+idLinha).update("2");
    }

    $('nDadosValidos').update(nCorretos);
}

function validaInput_sexo(valor) {

    if ((valor.toUpperCase() == "M") || (valor.toUpperCase() == "F")) {
        return true;
    } else {
        return false;
    }

}

function validaInput_altura(valor) {

    if (valor.length == 0) {
        return false;
    } else {
        var k = valor.replace(/[0-9]/g, "");
        if (k.length == 0) {
            return true;
        } else {
            return false;
        }
    }
}

function validaInput_calcado(valor) {

    if (valor.length == 0) {
        return false;
    } else {
        var k = valor.replace(/[0-9]/g, "");
        if (k.length == 0) {
            return true;
        } else {
            return false;
        }
    }
}

function cb_limpar_tabela() {
    if (this.resultado == 'sim') {
        var tabela = $('tabelaDados');

        limparTabela();
        adicionarLinhas(10);

        $('confirma_gravacao').update('');

        setResp('tabela_principal', ""); //apagada dados da tabela
        setRespSoft("tabela_principal", "", 'estat-dados');
        setRespSoft('tabela_definida', 0, 'estat-dados');

        setResp('atividade_2', 0); //Travado
        setResp('atividade_1', 2); //Comecou a fazer

        permiteContinuar(false);
        setResp('automacao_atividade_1_parte_1', 0);
        gerencia_partes();
    }
}

function limparTabela() {
    while ($('tabelaDados').rows.length > 1) {
        $('tabelaDados').deleteRow(1);
    }
    idTabela = 0;
    //adicionarLinhas(15);

    $('nDadosValidos').update("0");
    nCorretos = 0;

    vetorSexo = new Array();
    vetorCalcado = new Array();
    vetorAltura = new Array();

    permiteContinuar(false);
}

function cb_salvar_tabela() {
    if (this.resultado == 'sim') {
        salvaTabela();
    }
}

function salvaTabela() {
    var array_dados = criaArrayDados();
    var oldTabela = getRespSoft("tabela_principal", "estat-dados");

    // Verifica se há dados a serem gravados
    if (array_dados.length != 0) {
        // Como se fosse uma alteração de valor inicial

        var tabelaOK = verificaRestricoesTabela();

        if (tabelaOK) {

            if (oldTabela.toJSON() != array_dados.toJSON()) {
                var valor_atividade1 = getResp('atividade_1');
                var valor_parte2 = getResp('automacao_atividade_1_parte_1');
                var resp1 = getResp('atividade1_parte2_q1_a');
                var resp2 = getResp('atividade1_parte2_q1_b');

                $('SalvaLocal').ApagaTudo('dispersao');

                setResp('atividade1_parte2_q1_a', resp1);
                setResp('atividade1_parte2_q1_b', resp2);
                setResp('atividade_1', valor_atividade1);
                setResp('automacao_atividade_1_parte_1', valor_parte2);
            }

            permiteContinuar(true);

            //setResp('tabela_principal', array_dados.toJSON());
            setRespSoft("tabela_principal", array_dados.toJSON(), "estat-dados");

            setResp('tabela_num_elementos', array_dados.length);

            montaVetoresDados();

            $('msg_ok').update("Seus dados foram salvos com sucesso.");
            setRespSoft('tabela_definida', 1, 'estat-dados');
            calculaDadosCalcadoAltura();
            //calculaDadosAltura();
            //calculaDadosCalcado();							
        } else {
            $('msg_ok').update(" ");
            setResp('atividade_2', 0); //Travado
            setRespSoft('tabela_definida', 0, 'estat-dados');
        }
    } else {
        verificaRestricoesTabela();

        setResp('tabela_principal', "");
        setRespSoft("tabela_principal", "", 'estat-dados');
        setRespSoft('tabela_definida', 0, 'estat-dados');

        setResp('atividade_2', 0); //Travado
    }

    MeuBloco[0] = 'Tabela de dados';
    MeuBloco[1] = [
        [{ value: ' ', largura: 4 }, { value: 'Número do Calçado', largura: 4 }, { value: 'Altura', largura: 4 }], //header
        [{ value: 'Média', tipo: 'texto' }, { value: getResp('mediaCalcado'), tipo: 'texto' }, { value: getResp('mediaAltura'), tipo: 'texto' }],
        [{ value: 'Mediana', tipo: 'texto' }, { value: getResp('medianaCalcado'), tipo: 'texto' }, { value: getResp('medianaAltura'), tipo: 'texto' }],
        [{ value: 'Desvio Padrão', tipo: 'texto' }, { value: getResp('desvioPadraoCalcado'), tipo: 'texto' }, { value: getResp('desvioPadraoAltura'), tipo: 'texto' }]
    ];

}

/********************************
 * Correção das questões        *
 ********************************/
function corrige_q_1_a(valor) {
    valor[0] = valor[0].replace(',', '.');
    return [(valor[0] >= 22.3 && valor[0] <= 23)];
}

function corrige_q_1_b(valor) {
    valor[0] = valor[0].replace(',', '.');
    return [(valor[0] >= 0.78 && valor[0] <= 0.82)];
}