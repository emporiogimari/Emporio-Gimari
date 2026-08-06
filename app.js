/* ======================================================================
   EMPÓRIO GIMARI — LÓGICA DO SITE
   ======================================================================
   Este arquivo só CONSOME os dados definidos em js/data.js (CONFIG,
   CATEGORIES, PRODUCTS). Você não deveria precisar editar nada aqui
   para o uso normal do dia a dia — apenas em data.js.
   ====================================================================== */

// ---------------------------------------------------------------------
// ÍCONE placeholder (usado quando o produto ainda não tem foto real)
// ---------------------------------------------------------------------
const PLACEHOLDER_ICON = `
  <svg class="ph-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 26 L32 12 L56 26 L56 50 L8 50 Z" stroke="#2B3323" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="24" cy="36" r="2.4" fill="#2B3323"/>
    <circle cx="36" cy="30" r="2.4" fill="#2B3323"/>
    <circle cx="42" cy="42" r="2.4" fill="#2B3323"/>
  </svg>`;

// ---------------------------------------------------------------------
// ESTADO DOS FILTROS
// ---------------------------------------------------------------------
const state = {
  categoria: "todos",       // "todos" | id de uma categoria
  subcategoria: "todos",    // "todos" | id de uma subcategoria
};

// ---------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------

// Monta o link do WhatsApp com mensagem automática já preenchida.
function linkWhatsApp(mensagem){
  const texto = encodeURIComponent(mensagem);
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${texto}`;
}

function mensagemProduto(nomeProduto){
  return `Olá! Gostaria de fazer uma encomenda do ${nomeProduto}. Poderia me passar mais informações?`;
}

function formatarPreco(preco){
  if(preco === null || preco === undefined) return "Sob consulta";
  return preco.toLocaleString("pt-BR", { style:"currency", currency:"BRL" });
}

function getCategoria(id){
  return CATEGORIES.find(c => c.id === id);
}

// ---------------------------------------------------------------------
// RENDER: FILTROS (categoria + subcategoria)
// ---------------------------------------------------------------------
function renderFiltrosCategoria(){
  const row = document.getElementById("filterCategorias");
  const categoriasOrdenadas = [...CATEGORIES].sort((a,b)=>a.ordem-b.ordem);

  let html = `<button class="filter-pill ${state.categoria==='todos' ? 'active':''}" data-cat="todos">Todos</button>`;
  categoriasOrdenadas.forEach(cat=>{
    html += `<button class="filter-pill ${state.categoria===cat.id ? 'active':''}" data-cat="${cat.id}">${cat.nome}</button>`;
  });
  row.innerHTML = html;

  row.querySelectorAll("[data-cat]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      state.categoria = btn.dataset.cat;
      state.subcategoria = "todos";
      renderFiltrosCategoria();
      renderFiltrosSubcategoria();
      renderProdutos();
    });
  });
}

function renderFiltrosSubcategoria(){
  const row = document.getElementById("filterSubcategorias");

  if(state.categoria === "todos"){
    row.innerHTML = "";
    row.style.display = "none";
    return;
  }

  const cat = getCategoria(state.categoria);
  if(!cat || !cat.subcategorias || cat.subcategorias.length === 0){
    row.innerHTML = "";
    row.style.display = "none";
    return;
  }

  row.style.display = "flex";
  const subsOrdenadas = [...cat.subcategorias].sort((a,b)=>a.ordem-b.ordem);

  let html = `<button class="filter-pill ${state.subcategoria==='todos' ? 'active':''}" data-sub="todos">Todos</button>`;
  subsOrdenadas.forEach(sub=>{
    html += `<button class="filter-pill ${state.subcategoria===sub.id ? 'active':''}" data-sub="${sub.id}">${sub.nome}</button>`;
  });
  row.innerHTML = html;

  row.querySelectorAll("[data-sub]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      state.subcategoria = btn.dataset.sub;
      renderFiltrosSubcategoria();
      renderProdutos();
    });
  });
}

// ---------------------------------------------------------------------
// RENDER: GRID DE PRODUTOS
// ---------------------------------------------------------------------
function produtosFiltrados(){
  return PRODUCTS.filter(p=>{
    if(state.categoria !== "todos" && p.categoria !== state.categoria) return false;
    if(state.categoria !== "todos" && state.subcategoria !== "todos"){
      if(!p.subcategorias.includes(state.subcategoria)) return false;
    }
    return true;
  });
}

function cardProdutoHTML(p){
  const cat = getCategoria(p.categoria);
  const catNome = cat ? cat.nome : p.categoria;
  const indisponivel = !p.disponivel;

  const metaBits = [];
  if(p.produtor) metaBits.push(p.produtor);
  if(p.tipo) metaBits.push(p.tipo);
  if(p.maturacao) metaBits.push(`Maturação: ${p.maturacao}`);
  if(p.peso) metaBits.push(p.peso);

  const tagsHTML = (p.subcategorias || []).map(subId=>{
    const cat2 = getCategoria(p.categoria);
    const sub = cat2 ? cat2.subcategorias.find(s=>s.id===subId) : null;
    return sub ? `<span class="product-tag">${sub.nome}</span>` : "";
  }).join("");

  const fotoHTML = p.imagem
    ? `<img src="${p.imagem}" alt="${p.nome} — ${CONFIG.nomeMarca}" onerror="this.style.display='none'; this.parentElement.querySelector('.ph-icon').style.display='block';">${PLACEHOLDER_ICON}`
    : PLACEHOLDER_ICON;

  return `
    <article class="product-card">
      <div class="product-photo">
        ${indisponivel ? `<span class="badge-indisponivel">Esgotado</span>` : ""}
        ${fotoHTML}
      </div>
      <div class="product-body">
        <div class="product-cat">${catNome}</div>
        <h3 class="product-name">${p.nome}</h3>
        <div class="product-meta">${metaBits.map(b=>`<span>${b}</span>`).join("")}</div>
        <p class="product-desc">${p.descricao}</p>
        <div class="product-tags">${tagsHTML}</div>
        <div class="product-footer">
          <div class="product-price">${formatarPreco(p.preco)}</div>
          ${
            indisponivel
            ? `<button class="btn product-btn disabled" disabled>Indisponível</button>`
            : `<a class="btn btn-whatsapp product-btn" target="_blank" rel="noopener"
                 href="${linkWhatsApp(mensagemProduto(p.nome))}">Encomendar</a>`
          }
        </div>
      </div>
    </article>`;
}

function renderProdutos(){
  const grid = document.getElementById("catalogGrid");
  const lista = produtosFiltrados();

  if(lista.length === 0){
    grid.innerHTML = `<div class="empty-state">Nenhum produto encontrado nesta seleção no momento.</div>`;
    return;
  }
  grid.innerHTML = lista.map(cardProdutoHTML).join("");
}

// ---------------------------------------------------------------------
// RENDER: PRODUTO EM DESTAQUE
// ---------------------------------------------------------------------
function renderDestaque(){
  const box = document.getElementById("destaqueBox");
  const p = PRODUCTS.find(prod => prod.id === CONFIG.produtoDestaqueId);
  if(!p){ box.innerHTML = ""; return; }

  const metaBits = [];
  if(p.produtor) metaBits.push(p.produtor);
  if(p.maturacao) metaBits.push(`Maturação: ${p.maturacao}`);
  if(p.peso) metaBits.push(p.peso);

  const fotoHTML = p.imagem
    ? `<img src="${p.imagem}" alt="${p.nome} — ${CONFIG.nomeMarca}" onerror="this.style.display='none'; this.parentElement.querySelector('.ph-icon').style.display='block';">${PLACEHOLDER_ICON}`
    : PLACEHOLDER_ICON;

  box.innerHTML = `
    <div class="destaque-photo">${fotoHTML}</div>
    <div class="destaque-body">
      <div class="eyebrow">Queijo em destaque</div>
      <h3>${p.nome}</h3>
      <div class="product-meta">${metaBits.map(b=>`<span>${b}</span>`).join("")}</div>
      <p>${p.descricao}</p>
      <div class="destaque-price">${formatarPreco(p.preco)}</div>
      <a class="btn btn-whatsapp" target="_blank" rel="noopener" href="${linkWhatsApp(mensagemProduto(p.nome))}">Encomendar pelo WhatsApp</a>
    </div>`;
}

// ---------------------------------------------------------------------
// RENDER: CIDADES ATENDIDAS (seção Entregas + rodapé)
// ---------------------------------------------------------------------
function renderCidades(){
  const box = document.getElementById("cidadesList");
  if(box){
    box.innerHTML = CONFIG.cidadesAtendidas.map(c=>`<span class="cidade-pill">${c}</span>`).join("");
  }
  const footerCities = document.getElementById("footerCidades");
  if(footerCities){
    footerCities.textContent = "Entregas em " + CONFIG.cidadesAtendidas.join(" e ") + " e região.";
  }
}

// ---------------------------------------------------------------------
// RENDER: LINKS FIXOS DE WHATSAPP / INSTAGRAM / MARCA (usam CONFIG)
// ---------------------------------------------------------------------
function renderLinksGerais(){
  document.querySelectorAll("[data-wa-geral]").forEach(el=>{
    el.href = linkWhatsApp(`Olá! Gostaria de fazer um pedido no ${CONFIG.nomeMarca}.`);
    el.target = "_blank"; el.rel = "noopener";
  });
  document.querySelectorAll("[data-wa-presente]").forEach(el=>{
    el.href = linkWhatsApp(`Olá! Gostaria de montar uma seleção de presente no ${CONFIG.nomeMarca}.`);
    el.target = "_blank"; el.rel = "noopener";
  });
  document.querySelectorAll("[data-instagram]").forEach(el=>{
    el.href = CONFIG.instagramUrl; el.target = "_blank"; el.rel = "noopener"; el.textContent = CONFIG.instagram;
  });
  document.querySelectorAll("[data-marca-nome]").forEach(el=> el.textContent = CONFIG.nomeMarca);
  document.querySelectorAll("[data-marca-slogan]").forEach(el=> el.textContent = CONFIG.slogan);

  const ano = document.getElementById("anoAtual");
  if(ano) ano.textContent = new Date().getFullYear();
}

// ---------------------------------------------------------------------
// MENU MOBILE
// ---------------------------------------------------------------------
function setupMobileMenu(){
  const btn = document.getElementById("hamburgerBtn");
  const menu = document.getElementById("mobileMenu");
  btn.addEventListener("click", ()=>{
    btn.classList.toggle("open");
    menu.classList.toggle("open");
  });
  menu.querySelectorAll("a").forEach(a=>{
    a.addEventListener("click", ()=>{
      btn.classList.remove("open");
      menu.classList.remove("open");
    });
  });
}

// ---------------------------------------------------------------------
// INICIALIZAÇÃO
// ---------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", ()=>{
  renderLinksGerais();
  renderFiltrosCategoria();
  renderFiltrosSubcategoria();
  renderProdutos();
  renderDestaque();
  renderCidades();
  setupMobileMenu();
});
