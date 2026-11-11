
// PROTÓTIPO DE TREINAMENTO: esta versão contém erros intencionais.
// Alunos: investiguem o comportamento antes de modificar o código.

const formulario = document.querySelector('#form-cadastro');
const lista = document.querySelector('#lista');
const busca = document.querySelector('#busca');
const total = document.querySelector('#total');
const aviso = document.querySelector('#aviso');
const vazio = document.querySelector('#vazio');

// Recupera os dados salvos no navegador
let dadosSalvos = localStorage.getItem('interessados');

let interessados = [];

if (dadosSalvos) {
  interessados = JSON.parse(dadosSalvos);
} else {
  interessados = [];
}

let proximoId = 1;

// Identifica o próximo ID disponível
let ids = interessados.map(pessoa => pessoa.id);

if (ids.length > 0) {
  proximoId = Math.max(...ids) + 1;
} else {
  proximoId = 1;
}

function criarTexto(tag, classe, texto) {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  elemento.textContent = texto;
  return elemento;
}

function desenharLista() {
  lista.replaceChildren();

  // Pesquisa sem diferenciar maiúsculas e minúsculas.
  const pesquisa = busca.value.trim().toLowerCase();

  const filtrados = interessados.filter(pessoa =>
    pessoa.nome.toLowerCase().includes(pesquisa)
  );

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

    botao.addEventListener('click', () =>
      excluirInteressado(botao.dataset.id)
    );

    item.append(informacoes, botao);
    lista.appendChild(item);
  });

  // Ajusta o número de registros contados de forma correta
  total.textContent = `${interessados.length} registros`;
  vazio.hidden = filtrados.length > 0;
}

function excluirInteressado(id) {
  interessados = interessados.filter(
    pessoa => String(pessoa.id) !== String(id)
  );

  // Atualiza os dados salvos após a exclusão
  localStorage.setItem('interessados', JSON.stringify(interessados));

  aviso.textContent = 'Registro excluído.';

  // Remove o interessado a partir do seu id
  desenharLista();
}

formulario.addEventListener('submit', evento => {
  evento.preventDefault();

  const nome = document.querySelector('#nome').value.trim();
  const email = document.querySelector('#email').value.trim();
  const curso = document.querySelector('#curso').value;

  // Faz com que o campo nome aceite apenas letras.
  const apenasLetras = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

  if (!apenasLetras.test(nome)) {
    aviso.textContent = 'O nome deve conter apenas letras!';
    return;
  }

  // Verifica se o e-mail já está cadastrado
  if (interessados.some(pessoa =>
    pessoa.email.toLowerCase() === email.toLowerCase()
  )) {
    aviso.textContent = 'E-mail já cadastrado!';
    return;
  }

  interessados.push({
    id: proximoId++,
    nome: nome,
    email: email,
    curso: curso
  });

  // Salva os dados no navegador
  localStorage.setItem('interessados', JSON.stringify(interessados));

  aviso.textContent = 'Interessado cadastrado com sucesso!';

  formulario.reset();
  desenharLista();
});

busca.addEventListener('input', desenharLista);

// Exibe os registros salvos ao abrir a página
desenharLista();
