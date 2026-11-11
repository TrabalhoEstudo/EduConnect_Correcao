// PROTÓTIPO DE TREINAMENTO: esta versão contém erros intencionais.
// Alunos: investiguem o comportamento antes de modificar o código.
const formulario = document.querySelector('#form-cadastro');
const lista = document.querySelector('#lista');
const busca = document.querySelector('#busca');
const total = document.querySelector('#total');
const aviso = document.querySelector('#aviso');
const vazio = document.querySelector('#vazio');

let interessados = [];
let proximoId = 1;

function criarTexto(tag, classe, texto) {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  elemento.textContent = texto;
  return elemento;
}

function desenharLista() {
  lista.replaceChildren();
  const pesquisa = busca.value.trim();
  const filtrados = interessados.filter(pessoa => pessoa.nome.includes(pesquisa));

  filtrados.forEach(pessoa => {
    const item = criarTexto('li', 'registro', '');
    const informacoes = document.createElement('div');
    informacoes.append(
      criarTexto('strong', '', pessoa.nome),
      criarTexto('small', '', pessoa.email),
      criarTexto('small', '', pessoa.curso)
    );
    const botao = criarTexto('button', 'excluir', 'Excluir');
    botao.type = 'button';
    botao.dataset.id = pessoa.id;
    botao.addEventListener('click', () => excluirInteressado(botao.dataset.id));
    item.append(informacoes, botao);
    lista.appendChild(item);
  });

// Ajusta o número de registros contados de forma correta
  total.textContent = `${interessados.length} registros`;
  vazio.hidden = filtrados.length > 0;
}

function excluirInteressado(id) {
  interessados = interessados.filter(pessoa => String(pessoa.id) !== String(id));
  aviso.textContent = 'Registro excluído.';

  // Remove o interessado a partir do seu id
  desenharLista(interessados);
}

formulario.addEventListener('submit', evento => {
  evento.preventDefault();
  const nome = document.querySelector('#nome').value.trim();
  const email = document.querySelector('#email').value.trim();
  const curso = document.querySelector('#curso').value;

  interessados.push({ id: proximoId++, nome: nome, email: email,  curso: curso });
  aviso.textContent = 'Interessado cadastrado com sucesso!';
  formulario.reset();
  desenharLista();
});

busca.addEventListener('input', desenharLista);

