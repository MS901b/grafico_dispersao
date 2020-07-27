Event.observe(window, 'load', function() {
    BlocoNotas = new Blocao();
});

/*
	Padronização do ID: 
		- [['p/parte','q/questao','/item'],'_'] vai gerar um id do tipo p1_q2_1
		- [['p/parte','q/questao','/itemletra'],'_'] vai gerar um id do tipo p1_q2_a
	Palavras-chave: questao, parte, item, itemletra, subitem
	Devem ser precedidas de uma barra '/'.
	A palavra-chave subitem será usada somente em questões com mais de um campo
*/

var IdPadrao = [
    ['parte/parte', 'q/questao', '/itemletra', '/subitem'], '_'
];
var nomeSoft = 'dispersao';
var Partes = ['1', '2', '3', '4', '5', 'C'];

/*
	Questoes
	
	Aqui ficam concentrados todos os conteudos das questões da atividade!
	Veja que está separado por Parte/Questão/Item
	
	ATENÇÃO: Cada tipo possui um formato de entrada característico.
*/

var Questoes = [{ //Parte 1
    },
    { //Parte 2
        parte2_q1: //Questão 1
        {
            enunciadoGeral: '',
            itens: [{ //A
                tipo: 'instrucao',
                associado: true,
                corrigir: corrige_q_1,
                enunciado: 'Posicione o <a id="ponto_azul">ponto azul</a> no quadro ao lado no ponto de médias do gráfico. O ponto de médias é o ponto cujas coordenadas são as médias de cada uma das variáveis.',
                msgErro: ' Lembre-se que as coordenadas do ponto devem ser (média do número do calçado; média da altura).',
                msgAjuda: 'No bloco de notas, existe uma tabela com todos os valores de que você pode precisar.'
            }]
        },
        parte2_q2: //Questão 2
        {
            enunciadoGeral: '',
            itens: [{ //A
                tipo: 'generico',
                corrigir: corrige_q_2,
                dados: '<span class="a_esquerda">[</span><div id="corretor_questao_2_a_1"><input id="questao_2_a_1" style="width:40px; margin: 0 5px !important;"/></div><span class="a_esquerda antes_depois depois">;</span><div id="corretor_questao_2_a_2"><input id="questao_2_a_2" style="width:40px; margin: 0 5px !important;"/></div><div class="a_esquerda" style="margin-right:5px;"><span>]</span></div><br class="limpador" />',
                enunciado: 'Com este novo sistema de eixos coordenados, qual é a posição do ponto referente a você?',
                msgErro: 'Faça a diferença entre o seu número de sapato e a média para obter a nova abscissa. Faça o mesmo com a altura para obter a nova ordenada.',
                msgAjuda: 'Observe as distâncias horizontal e vertical do ponto até a nova origem. Dê a resposta com duas casas decimais.'
            }]
        }
    },
    { //Parte 3
        parte3_q3: //Questão 3
        {
            enunciadoGeral: '',
            itens: [{ //A
                    tipo: 'instrucao',
                    corrigir: corrige_q_3_a,
                    associado: true,
                    selecionada: selecionouA3_P3_Q4_A,
                    enunciado: 'Movendo o <a id="elemento_azul">elemento azul</a> destacado posicione-o de forma que sua distância até a origem seja igual a um desvio padrão da variável "número do calçado"',
                    msgErro: 'Verifique se o ponto está posicionado no valor do desvio-padrão do número do calçado.',
                    msgAjuda: 'O valor do desvio padrão do número do calçado pode ser encontrado no bloco de notas, e a coordenada do elemento azul está abaixo da ferramenta.'
                },
                { //B
                    tipo: 'input',
                    corrigir: corrige_q_3_b,
                    associado: true,
                    selecionada: selecionouA3_P3_Q4_B,
                    enunciado: 'O retângulo destacado representa a região contida no intervalo de 3 desvios-padrão em torno da média. De acordo com o tamanho de sua amostra, que proporção dos números do calçado está contida nesse intervalo?',
                    msgErro: 'Divida a quantidade de dados dentro do retângulo pela quantidade total de dados do gráfico.',
                    msgAjuda: 'Tamanho de uma amostra é o número total de pessoas estudadas.'
                }
            ]
        },
        parte3_q4: //Questão 4
        {
            enunciadoGeral: '',
            itens: [{ //A
                    tipo: 'instrucao',
                    corrigir: corrige_q_4_a,
                    associado: true,
                    selecionada: selecionouA3_P3_Q5_A,
                    enunciado: 'Movendo o <a id="elemento_azul1">elemento azul</a> destacado, posicione-o de tal forma que sua distância até a origem seja igual a um desvio-padrão da variável "altura".',
                    msgErro: 'Verifique se o ponto está posicionado no valor do desvio-padrão da altura.',
                    msgAjuda: 'O valor do desvio padrão da altura pode ser encontrado no bloco de notas.'
                },
                { //B
                    tipo: 'input',
                    corrigir: corrige_q_4_b,
                    associado: true,
                    selecionada: selecionouA3_P3_Q5_B,
                    enunciado: 'O retângulo destacado representa a região contida no intervalo de 3 desvios-padrão em torno da média. De acordo com o tamanho de sua amostra, que proporção das alturas está contida nesse intervalo?',
                    msgErro: 'Divida a quantidade de dados dentro do retângulo pela quantidade total de dados do gráfico.',
                    msgAjuda: 'Dê a resposta com duas casas decimais.'
                }
            ]
        }
    },
    { //Parte 4
        parte4_q5: //Questão 5
        {
            enunciadoGeral: '',
            itens: [{ //A
                tipo: 'generico',
                corrigir: corrige_q_5,
                enunciado: 'Quais são as novas coordenadas do seu ponto?',
                dados: '<span class="a_esquerda">(</span><div id="corretor_questao_5_a_1"><input id="questao_5_a_1" style="width:40px; margin: 0 5px !important;"/></div><span class="a_esquerda antes_depois depois">;</span><div id="corretor_questao_5_a_2"><input id="questao_5_a_2" style="width:40px; margin: 0 5px !important;"/></div><div class="a_esquerda" style="margin-right:5px;"><span>)</span></div><br class="limpador" />',
                msgErro: 'Para obter as novas coordenadas, você deve dividir cada valor pelo desvio-padrão correspondente, por causa da alteração na escala. Consulte tais valores no bloco de notas.',
                msgAjuda: 'Dê a resposta com duas casas decimais. As coordenadas do seu ponto eram (<span id="coordenadaPontoA2P4"></span>).'
            }]
        }
    },
    { //Parte 5
        parte5_q6: //Questão 6
        {
            enunciadoGeral: '',
            itens: [{ //A
                    tipo: 'input',
                    corrigir: corrige_q_6_a,
                    enunciado: 'Qual é o valor da multiplicação entre z<sub>x</sub> e z<sub>y</sub> para os valores dos seus dados?',
                    msgErro: 'Verifique se você usou os valores das coordenadas do seu ponto.',
                    msgAjuda: 'Dê a resposta com duas casas decimais.'
                },
                { //B
                    tipo: 'multipla_escolha',
                    corrigir: corrige_q_6_b,
                    enunciado: 'Este valor é:',
                    dados: [
                        { value: '1', label: 'Positivo' },
                        { value: '2', label: 'Negativo' },
                        { value: '3', label: 'Zero' }
                    ],
                    msgErro: 'Verifique o sinal da multiplicação.'
                },
                { //C
                    tipo: 'multipla_escolha',
                    corrigir: corrige_q_6_c,
                    enunciado: 'Em qual quadrante está seu ponto?',
                    dados: [
                        { value: '1', label: '1&#176; Quadrante' },
                        { value: '2', label: '2&#176; Quadrante' },
                        { value: '3', label: '3&#176; Quadrante' },
                        { value: '4', label: '4&#176; Quadrante' }
                    ],
                    msgErro: 'O 1° quadrante é o superior da direita, e a contagem se faz no sentido anti-horário.'
                }
            ]
        },
        parte5_q7: //Questão 7
        {
            enunciadoGeral: '',
            itens: [{ //A
                tipo: 'multipla_escolha',
                corrigir: corrige_q_7,
                associado: true,
                //selecionada: selecionouA2_P5_Q7_A,
                enunciado: 'No gráfico ao lado, para os pontos A, no 1&#176; quadrante, B, no 2&#176; quadrante, C, no 3&#176; quadrante, e D, no 4&#176; quadrante, marque a opção que indica o sinal da multiplicação z<sub>x</sub>.z<sub>y</sub> respectivamente: ',
                dados: [
                    { value: '1', label: '+,+,+,+' },
                    { value: '2', label: '+, -, +, -' },
                    { value: '3', label: '-, +, - , +' },
                    { value: '4', label: '+, +, -, -' }
                ],
                msgErro: 'Note que, se um ponto estiver no 1&#176; quadrante, suas duas coordenadas serão positivas. Se estiver no 2&#176;, a abscissa será negativa e a ordenada positiva. Se estiver no 3&#176;, ambas serão negativas. Já no 4&#176;, a abscissa será positiva e a ordenada negativa.'
            }]
        }
    }
]

/*
	Bloco de Notas
	
	Nesse Array ficam os dados que aparecem no Bloquinho de notas.
	Se você for na linha 35 do exemplo_correcao.js verá que está sendo criada uma instância
	de "Blocao", uma classe de bloco de notas que permite tabelas no conteúdo. Se não for
	usar tabelas no Software, altere para "Bloco". Ambas classes utilizam a variavel global
	MeuBloco para preencher o seu conteúdo.
*/

var MeuBloco = new Array();