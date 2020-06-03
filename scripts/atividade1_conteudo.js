var IdPadrao = [['parte/parte','q/questao','/itemletra','/subitem'],'_'];

var nomeSoft = 'dispersao';
var Partes = ['1', '2'];

var Questoes = 
[
	{
	},
	{//Parte 2
		parte2_q1: //Questão 1
		{
			enunciadoGeral: 'Observe a figura e responda:',
			itens: 
			[
				{//A
					tipo: 'input',
					corrigir: corrige_q_1_a,
					enunciado: 'Qual é, aproximadamente, o maior valor de IMC observado na amostra?',
					msgErro: 'O IMC está representado no eixo vertical.'
				},
				{//B
					tipo: 'input',
					corrigir: corrige_q_1_b,
					enunciado: 'Qual é, aproximadamente, o IDH do indivíduo com maior IMC?',
					msgErro: 'Observe a coordenada horizontal do mesmo ponto do item anterior.'
				}
			]
		}
	}
];
	
var MeuBloco = new Array();

