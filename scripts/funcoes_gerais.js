/*********************************************
			SALVA LOCAL
*********************************************/

function getFlashMovie(movieName) {
    var isIE = navigator.appName.indexOf("Microsoft") != -1;
    return (isIE) ? window[movieName] : document[movieName];

}

function getResp(id) {
    return ($('SalvaLocal').Pega(nomeSoft, id) == 'undefined' ? '' : $('SalvaLocal').Pega(nomeSoft, id));
}

function getRespSoft(id, soft) {
    return ($('SalvaLocal').Pega(soft, id) == 'undefined' ? '' : $('SalvaLocal').Pega(soft, id));
}

function setResp(id, valor) {
    $('SalvaLocal').Salva(nomeSoft, id, valor);
}

function setRespSoft(id, valor, soft) {
    $('SalvaLocal').Salva(soft, id, valor);
}

function apagaTodasResp() {
    return ($('SalvaLocal').ApagaTudo(nomeSoft));
}


// Retorna um valor nao fracionario de um numero
function processaNumero(respStr) {
    var respStrSplited = respStr.split('/');

    var respostaValida = true;
    if (respStrSplited.length > 1) {

        for (var i = 0; i < respStrSplited.length; i++) {
            respStrSplited[i] = processaNumero(respStrSplited[i]);
            if (respStrSplited[i] == null) respostaValida = false;
            if (respostaValida) {
                if (i == 0) {
                    var resp = respStrSplited[i];
                } else {
                    resp = resp / respStrSplited[i];
                }

            }
        }
        if (respostaValida) return resp;
        else return null;
    } else {
        if (respStr.indexOf('%') > -1) {
            respStr = respStr.replace(/%/, '');
            var porcento = true;
        } else var procento = false;

        respStr = respStr.replace(/,/g, '.');
        if (!isNaN(respStr) && (respStr.length > 0)) {
            if (porcento) respStr = respStr / 100;
        } else respStr = null;
        return respStr;
    }

}


//Encontra um elemento num array, dado uma funcao de comparacao
function encontraElementoArray(elemento, vetor, funcao_comp) {

    for (var i = 0; i < vetor.length; i++) {
        /*
        if (funcao_comp(vetor[i],elemento)) {
        	return i;
        }*/
        if (vetor[i].dado == elemento) {
            return i;
        }
    }
    return -1;
}


/**
	Arredonda o valor para n casas decimais
*/
function arredonda(valor, n) {
    valor = valor * Math.pow(10, n);
    valor = Math.round(valor);
    valor = valor / Math.pow(10, n);
    return valor;
}

/**
 * Codigo pego do jogo do maximo.
 */
function setAtividade(nome, estado, forcar) {
    if (forcar == undefined) {
        forcar = false;
    }

    if (!forcar) {
        if ((getResp(nome) < estado) || getResp(nome) == '') {
            setResp(nome, estado);
        }
    } else {
        setResp(nome, estado);
    }
}

function valida(valor) {
    valor = valor.replace('.', ',');
    if ((valor == null) || (valor == 'undefined')) {
        return '';
    }
    return valor;
}

function processaNumero(respStr) {
    var respStrSplited = respStr.split('/');

    var respostaValida = true;
    if (respStrSplited.length > 1) {

        for (var i = 0; i < respStrSplited.length; i++) {
            respStrSplited[i] = processaNumero(respStrSplited[i]);
            if (respStrSplited[i] == null) respostaValida = false;
            if (respostaValida) {
                if (i == 0) {
                    var resp = respStrSplited[i];
                } else {
                    resp = resp / respStrSplited[i];
                }

            }
        }
        if (respostaValida) return resp;
        else return null;
    } else {
        if (respStr.indexOf('%') > -1) {
            respStr = respStr.replace(/%/, '');
            var porcento = true;
        } else var porcento = false;

        respStr = respStr.replace(/,/g, '.');
        if (!isNaN(respStr) && (respStr.length > 0)) {
            if (porcento) respStr = respStr / 100;
        } else respStr = null;
        return respStr;
    }

}