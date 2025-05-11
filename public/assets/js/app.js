/**
 * Representa a URL base da API a ser consumida pelo programa.
 *
 * O código irá adicionar novos dados nessa URL para formar a URL da requisição a
 * ser realizada.
 *
 * @var API_BASE_URL
 */
const API_BASE_URL = 'http://127.0.0.1:3000';

/**
 * Carrega o Carousel.
 */
async function carregarCarousel()
{
    const carouselIndicators = document.querySelector('#carousel-noticias-destaque > .carousel-indicators');

    const carouselInner = document.querySelector('#carousel-noticias-destaque > .carousel-inner');

    const todasNoticias = await getNoticias();

    const noticiasEmDestaque = todasNoticias.filter((noticia) => noticia['destaque']);

    let carouselIndicatorsHtml = '';
    
    let carouselInnerHtml = '';

    noticiasEmDestaque.forEach((noticia, i) => {

        carouselIndicatorsHtml += `<button type="button" data-bs-target="#carousel-noticias-destaque" data-bs-slide-to="${i}" ${i == 0 ? 'class="active" aria-current="true"' : ''} aria-label="Slide 1"></button>`;

        carouselInnerHtml += `
            <div class="carousel-item ${i == 0 ? 'active' : ''}">
                <a href="detalhes.html?id=${noticia['id']}">
                    <img src="${noticia['imagem_principal']}" class="d-block w-100">
                </a>
                <div class="carousel-caption d-none d-md-block">
                    <a class="text-decoration-none text-reset" href="detalhes.html?id=${noticia['id']}">
                        <h5>${noticia['titulo']}</h5>
                        <p>${noticia['descricao']}</p>
                    </a>
                </div>
            </div>
        `;
    });

    carouselIndicators.innerHTML = carouselIndicatorsHtml;

    carouselInner.innerHTML = carouselInnerHtml;
}

/**
 * Carrega a home page.
 *
 * @returns {void}
 */
async function homePage()
{
    const newsCardsSection = document.getElementById('news-cards-section');

    if (!newsCardsSection) {

        return;
    }

    carregarCarousel();

    const todasNoticias = await getNoticias();

    let noticiasHtml = '';

    todasNoticias.forEach(function (noticia) {
    
        noticiasHtml += `
            <article class="col-sm-8 col-lg-4">
                <div class="card h-100">
                    <img src="${noticia['imagem_principal']}" class="card-img-top" alt="${noticia['titulo']}">
                    <div class="card-body">
                        <h5 class="card-title">${noticia['titulo']}</h5>
                        <p class="card-text">${noticia['descricao']}</p>
                    </div>
                    <div class="card-footer text-center">
                        <a href="detalhes.html?id=${noticia['id']}" class="btn btn-success">Ler Notícia</a>
                    </div>
                </div>
            </article>
        `;
    });
    
    newsCardsSection.innerHTML = noticiasHtml;
}

/**
 * Carrega o 404.
 *
 * O código esconde o elemento #news-main, que contém o conteúdo da notícia e mostra o elemento #not-found,
 * que contém a mensagem de 404.
 */
function carregar404()
{
    document.getElementById('news-main').style.display = 'none';

    document.getElementById('not-found').style.display = 'block';
}

/**
 * Carrega as imagens adicionais para a notícia enviada como parâmetro.
 *
 * @param {Object} noticia 
 */
function carregarImagensAdicionais(noticia)
{
    const additionalImagesContainer = document.getElementById('additional-pictures-container')

    let imagensHtml = '';

    for (imagemAdicional of noticia['imagens_complementares']) {

      imagensHtml += `
        <figure class="figure col-sm-8 col-lg-4">
          <img src="${imagemAdicional['src']}" class="figure-img img-fluid rounded" alt="${imagemAdicional['descricao']}">
          <figcaption class="figure-caption">${imagemAdicional['descricao']}</figcaption>
        </figure>
      `;
    }

    additionalImagesContainer.innerHTML = imagensHtml;
}

/**
 * Carrega a página de detalhes.
 *
 * @returns {void}
 */
async function paginaDeDetalhes()
{
    // Checa se estamos na página de detalhes.
    if (!document.getElementById('news-container')) {

        return;
    }

    const urlParams = new URLSearchParams(window.location.search);

    const idNoticia = urlParams.get('id');

    // Checa se o usuário enviou algum ID para a página de detalhes, caso não tenha enviado, renderiza o 404.
    if (!idNoticia) {

        carregar404();

        return;
    }

    const noticia = await getNoticias(idNoticia);

    // Checa se a notícia existe no Back-End, caso não exista, renderiza o 404.
    if (!noticia) {

        carregar404();

        return;
    }

    const dataNoticia = new Date(noticia['data']);

    const noticiaHtml = `
        <article>
            <h2 class="mb-3">${noticia['titulo']}</h2>

            <section class="mb-4">
                <p>${noticia['descricao']}</p>
            </section>

            <p class="text-muted">Publicado em ${dataNoticia.toLocaleDateString({ day: '2-digit', month: 'long', year: 'numeric' })} | Por ${noticia['autor']}</p>

            <img src="${noticia['imagem_principal']}" class="img-fluid rounded mb-4" alt="${noticia['titulo']}">

            <p>${noticia['conteudo']}</p>
        </article>
    `;

    carregarImagensAdicionais(noticia);

    document.getElementById('news-container').innerHTML = noticiaHtml;
}

/**
 * Pega uma notícia em específico, caso o ID seja especificado, ou todas as notícias da API.
 *
 * @param {number|null} idNoticia ID da notícia é um parâmetro opcional, caso não seja enviado o sistema irá buscar todas as notícias da API.
 */
async function getNoticias(idNoticia = null)
{
  let apiUrl = `${API_BASE_URL}/noticias`;

  // Caso um ID de notícia seja enviado, adiciona-o na URL a ser requisitada.
  if (idNoticia) {

    apiUrl += `/${idNoticia}`;
  }

  const noticiasResponse = await fetch(apiUrl);

  // Checa se o status é 200 (OK), caso não seja, retorna null para que o Front-End renderize a mensagem de 404.
  if (noticiasResponse.status !== 200) {

    return null;
  }

  // Retorna o JSON retornado pelo servidor.
  return await noticiasResponse.json();
}

homePage();

paginaDeDetalhes();