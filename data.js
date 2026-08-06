/* ======================================================================
   EMPÓRIO GIMARI — ARQUIVO CENTRAL DE DADOS
   ======================================================================
   ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA MEXER NO DIA A DIA.

   Aqui estão, em blocos separados e comentados:
     1) CONFIG          -> WhatsApp, Instagram, cidades atendidas, produto em destaque
     2) CATEGORIES       -> categorias e subcategorias do catálogo
     3) PRODUCTS         -> todos os produtos do catálogo

   Não é necessário mexer em nenhum outro arquivo (HTML, CSS ou os
   outros .js) para cadastrar produto, mudar preço, foto, categoria,
   disponibilidade, número de WhatsApp ou cidades atendidas.

   Ao final do projeto você recebe um passo a passo explicando cada
   uma dessas alterações. Este arquivo também funciona como a "base
   de dados" que, no futuro, poderá alimentar um painel administrativo
   (o mesmo formato de objeto pode ser salvo/editado por um backend
   sem precisar mudar a estrutura do site).
   ====================================================================== */


/* ======================================================================
   1) CONFIG GERAL
   ====================================================================== */
const CONFIG = {

  // Número de WhatsApp usado em TODOS os botões do site.
  // Formato: código do país + DDD + número, sem espaços, traços ou "+".
  // Exemplo Brasil (SP, Lorena/Guaratinguetá): 55 + 12 + número
  whatsappNumber: "5512999999999", // <-- TROQUE AQUI pelo número real do Empório Gimari

  // Instagram exibido no site (rodapé e seção de contato)
  instagram: "@emporiogimari",
  instagramUrl: "https://instagram.com/emporiogimari",

  // Cidades atendidas (seção "Entregas" e rodapé).
  // Para adicionar/remover uma cidade, basta editar esta lista.
  cidadesAtendidas: [
    "Lorena",
    "Guaratinguetá"
  ],

  // ID do produto que aparece na seção "Queijo em destaque".
  // Basta trocar pelo "id" de qualquer produto cadastrado em PRODUCTS abaixo.
  produtoDestaqueId: "canastra-maturado",

  // Textos-base usados em mais de um lugar do site (evita repetição).
  nomeMarca: "Empório Gimari",
  slogan: "Sabores que transformam momentos.",
};


/* ======================================================================
   2) CATEGORIAS E SUBCATEGORIAS
   ======================================================================
   Cada categoria tem:
     id             -> identificador único, usado internamente (não muda sozinho)
     nome           -> nome exibido nos filtros e nos cards
     ordem          -> ordem de exibição (menor aparece primeiro)
     subcategorias  -> lista de subcategorias dessa categoria

   Cada subcategoria tem:
     id     -> identificador único DENTRO da categoria
     nome   -> nome exibido no filtro
     ordem  -> ordem de exibição

   PARA CRIAR UMA CATEGORIA NOVA: copie um bloco inteiro { id, nome,
   ordem, subcategorias:[...] } e cole na lista, com um id novo.

   PARA CRIAR UMA SUBCATEGORIA NOVA: copie uma linha { id, nome, ordem }
   dentro da lista "subcategorias" da categoria desejada.

   O filtro "Todos" de cada categoria é gerado automaticamente pelo
   site — não precisa cadastrar "Todos" aqui.
   ====================================================================== */
const CATEGORIES = [
  {
    id: "queijos",
    nome: "Queijos",
    ordem: 1,
    subcategorias: [
      { id: "maturados",  nome: "Maturados",  ordem: 1 },
      { id: "artesanais", nome: "Artesanais", ordem: 2 },
      { id: "temperados", nome: "Temperados", ordem: 3 },
      { id: "premiados",  nome: "Premiados",  ordem: 4 },
      { id: "especiais",  nome: "Especiais",  ordem: 5 },
    ],
  },
  {
    id: "derivados",
    nome: "Derivados",
    ordem: 2,
    subcategorias: [
      { id: "doces",     nome: "Doces",     ordem: 1 },
      { id: "iogurtes",  nome: "Iogurtes",  ordem: 2 },
      // Exemplo de como adicionar novos derivados no futuro:
      // { id: "doce-de-leite", nome: "Doce de leite", ordem: 3 },
      // { id: "manteiga",      nome: "Manteiga",      ordem: 4 },
    ],
  },
  {
    id: "presentes",
    nome: "Presentes",
    ordem: 3,
    subcategorias: [
      { id: "cestas",         nome: "Cestas",         ordem: 1 },
      { id: "kits",           nome: "Kits",           ordem: 2 },
      { id: "personalizados", nome: "Personalizados", ordem: 3 },
    ],
  },
];


/* ======================================================================
   3) PRODUTOS
   ======================================================================
   Cada produto segue exatamente esta estrutura:

   {
     id:            identificador único (sem espaços/acentos, use hífen)
     nome:          nome do produto
     categoria:     id de UMA categoria (definida acima em CATEGORIES)
     subcategorias: lista de ids de subcategorias (pode ter 1 ou várias,
                    e devem pertencer à categoria informada)
     produtor:      nome da queijaria/produtor (opcional, use "" se não tiver)
     tipo:          tipo do produto (ex: "Queijo de leite cru")
     maturacao:     tempo de maturação (opcional, use "" se não se aplica)
     descricao:     texto descritivo do produto
     peso:          peso ou volume (ex: "500g", "300ml")
     preco:         número (use ponto, não vírgula: 89.90)
     imagem:        caminho da foto do produto (pasta images/produtos/)
     disponivel:    true = disponível | false = esgotado/indisponível
   }

   IMPORTANTE — FOTOS:
   As fotos usadas abaixo são placeholders (ilustrações em vez de
   fotografia real dos produtos), pois nenhuma foto de produto foi
   fornecida ainda. Basta colocar os arquivos reais dentro de
   images/produtos/ e atualizar o campo "imagem" de cada produto —
   nada mais precisa mudar.

   PARA ADICIONAR UM PRODUTO NOVO: copie um bloco inteiro { ... },
   cole antes do "];" final, dê um novo "id" e preencha os campos.
   ====================================================================== */
const PRODUCTS = [

  // ---------------------- QUEIJOS ----------------------
  {
    id: "canastra-maturado",
    nome: "Queijo Canastra Maturado",
    categoria: "queijos",
    subcategorias: ["maturados", "artesanais", "premiados"],
    produtor: "Queijaria Serra da Canastra",
    tipo: "Queijo de leite cru",
    maturacao: "90 dias",
    descricao: "Casca rústica e massa firme, com aroma marcante e notas amanteigadas. Produzido artesanalmente na Serra da Canastra, é um dos queijos mais premiados do Brasil.",
    peso: "500g",
    preco: 89.90,
    imagem: "images/produtos/placeholder-canastra.jpg",
    disponivel: true,
  },
  {
    id: "coalho-temperado-ervas",
    nome: "Queijo Coalho com Ervas Finas",
    categoria: "queijos",
    subcategorias: ["temperados", "artesanais"],
    produtor: "Queijaria Vale Verde",
    tipo: "Queijo de coalho",
    maturacao: "",
    descricao: "Massa semifirme temperada com ervas finas selecionadas. Ótimo para grelhar ou servir em tábuas de frios.",
    peso: "400g",
    preco: 42.90,
    imagem: "images/produtos/placeholder-coalho-ervas.jpg",
    disponivel: true,
  },
  {
    id: "brie-artesanal",
    nome: "Brie Artesanal",
    categoria: "queijos",
    subcategorias: ["artesanais", "especiais"],
    produtor: "Queijaria Casa do Leite",
    tipo: "Queijo de casca florida",
    maturacao: "30 dias",
    descricao: "Casca aveludada e miolo cremoso, com sabor suave e amanteigado. Uma escolha elegante para tábuas e ocasiões especiais.",
    peso: "250g",
    preco: 54.90,
    imagem: "images/produtos/placeholder-brie.jpg",
    disponivel: true,
  },
  {
    id: "gorgonzola-premiado",
    nome: "Gorgonzola Premiado",
    categoria: "queijos",
    subcategorias: ["premiados", "especiais", "maturados"],
    produtor: "Queijaria Monte Azul",
    tipo: "Queijo azul",
    maturacao: "60 dias",
    descricao: "Veios azuis intensos e sabor marcante, equilibrado por uma cremosidade envolvente. Vencedor de concursos artesanais regionais.",
    peso: "300g",
    preco: 64.90,
    imagem: "images/produtos/placeholder-gorgonzola.jpg",
    disponivel: false,
  },
  {
    id: "minas-artesanal-curado",
    nome: "Minas Artesanal Curado",
    categoria: "queijos",
    subcategorias: ["artesanais", "maturados"],
    produtor: "Queijaria Campos de Minas",
    tipo: "Queijo de leite cru",
    maturacao: "45 dias",
    descricao: "Tradição mineira em cada fatia: casca fina, massa compacta e sabor levemente ácido e amanteigado.",
    peso: "500g",
    preco: 58.90,
    imagem: "images/produtos/placeholder-minas.jpg",
    disponivel: true,
  },

  // ---------------------- DERIVADOS ----------------------
  {
    id: "doce-de-leite-artesanal",
    nome: "Doce de Leite Artesanal",
    categoria: "derivados",
    subcategorias: ["doces"],
    produtor: "Empório Gimari",
    tipo: "Doce cremoso",
    maturacao: "",
    descricao: "Feito lentamente em tacho de cobre, com textura macia e sabor equilibrado. Combina perfeitamente com queijos maturados.",
    peso: "300g",
    preco: 28.90,
    imagem: "images/produtos/placeholder-doce-de-leite.jpg",
    disponivel: true,
  },
  {
    id: "iogurte-natural-integral",
    nome: "Iogurte Natural Integral",
    categoria: "derivados",
    subcategorias: ["iogurtes"],
    produtor: "Fazenda Boa Vista",
    tipo: "Iogurte artesanal",
    maturacao: "",
    descricao: "Cremoso e levemente ácido, sem conservantes. Produzido em pequenos lotes com leite selecionado.",
    peso: "500ml",
    preco: 22.90,
    imagem: "images/produtos/placeholder-iogurte.jpg",
    disponivel: true,
  },

  // ---------------------- PRESENTES ----------------------
  {
    id: "cesta-degustacao-classica",
    nome: "Cesta Degustação Clássica",
    categoria: "presentes",
    subcategorias: ["cestas"],
    produtor: "Empório Gimari",
    tipo: "Cesta com seleção de queijos e doces",
    maturacao: "",
    descricao: "Uma seleção cuidadosa de queijos artesanais, doce de leite e acompanhamentos, embalada com cuidado para presentear.",
    peso: "Aprox. 1,5kg",
    preco: 189.90,
    imagem: "images/produtos/placeholder-cesta.jpg",
    disponivel: true,
  },
  {
    id: "kit-tabua-de-frios",
    nome: "Kit Tábua de Frios",
    categoria: "presentes",
    subcategorias: ["kits"],
    produtor: "Empório Gimari",
    tipo: "Kit com queijos variados",
    maturacao: "",
    descricao: "Combinação pensada para montar uma tábua completa: queijos maturados, temperados e um acompanhamento doce.",
    peso: "Aprox. 900g",
    preco: 129.90,
    imagem: "images/produtos/placeholder-kit-tabua.jpg",
    disponivel: true,
  },
  {
    id: "presente-personalizado",
    nome: "Presente Personalizado",
    categoria: "presentes",
    subcategorias: ["personalizados"],
    produtor: "Empório Gimari",
    tipo: "Seleção sob encomenda",
    maturacao: "",
    descricao: "Monte, com a nossa curadoria, uma seleção personalizada de acordo com o gosto de quem vai receber o presente.",
    peso: "Sob consulta",
    preco: null, // preço sob consulta — o card exibirá "Sob consulta"
    imagem: "images/produtos/placeholder-personalizado.jpg",
    disponivel: true,
  },
];
