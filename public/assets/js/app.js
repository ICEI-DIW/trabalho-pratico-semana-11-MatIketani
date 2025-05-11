const dados = {
    "noticias": [
      {
        "id": 1,
        "titulo": "Prefeitura Lança Novo Plano de Mobilidade Urbana",
        "descricao": "Novo plano visa melhorar o transporte público e reduzir o trânsito na cidade.",
        "conteudo": "A Prefeitura apresentou nesta segunda-feira um novo plano de mobilidade urbana que inclui a criação de corredores exclusivos de ônibus, ciclovias e a requalificação de vias principais. O projeto será implementado ao longo dos próximos dois anos.",
        "categoria": "Cidades",
        "autor": "Joana Ribeiro",
        "destaque": true,
        "data": "2025-03-30",
        "imagem_principal": "assets/img/mobilidade.jpg",
        "imagens_complementares": [
          { 
            "id": 1,
            "src": "assets/img/mobilidade1.jpg",
            "descricao": "Corredor exclusivo para ônibus"
          },
          { 
            "id": 2,
            "src": "assets/img/mobilidade2.jpg",
            "descricao": "Ciclovia em área central"
          },
          { 
            "id": 3,
            "src": "assets/img/mobilidade3.jpg",
            "descricao": "Requalificação de calçadas"
          }
        ]
      },
      {
        "id": 2,
        "titulo": "Tecnologia 6G Está em Desenvolvimento",
        "descricao": "Pesquisadores anunciam avanços na próxima geração de redes móveis.",
        "conteudo": "Universidades e empresas de telecomunicação já estão testando tecnologias que poderão compor a infraestrutura do 6G. A expectativa é que a nova geração seja 100 vezes mais rápida que o 5G e amplie a integração entre dispositivos inteligentes.",
        "categoria": "Tecnologia",
        "autor": "Carlos Mendes",
        "destaque": false,
        "data": "2025-03-28",
        "imagem_principal": "assets/img/tecnologia_6g.jpg",
        "imagens_complementares": [
          { 
            "id": 1,
            "src": "assets/img/tecnologia_6g1.jpg",
            "descricao": "Teste de rede 6G em laboratório"
          },
          { 
            "id": 2,
            "src": "assets/img/tecnologia_6g2.jpg",
            "descricao": "Equipamentos para 6G"
          }
        ]
      },
      {
        "id": 3,
        "titulo": "Festival de Música Reúne Mais de 50 Mil Pessoas",
        "descricao": "Evento cultural movimentou o final de semana com atrações nacionais e internacionais.",
        "conteudo": "Durante três dias de programação, o festival contou com a participação de mais de 40 artistas e promoveu atividades culturais e gastronômicas em paralelo. A prefeitura estima um impacto positivo no turismo local.",
        "categoria": "Cultura",
        "autor": "Ana Clara Silva",
        "destaque": true,
        "data": "2025-03-27",
        "imagem_principal": "assets/img/festival_musica.jpg",
        "imagens_complementares": [
          { 
            "id": 1,
            "src": "assets/img/festival_musica1.jpg",
            "descricao": "Público no festival"
          },
          { 
            "id": 2,
            "src": "assets/img/festival_musica2.jpg",
            "descricao": "Artista se apresentando"
          }
        ]
      }
    ]
}

/**
 * Carrega o Carousel.
 */
function carregarCarousel()
{
    const carouselIndicators = document.querySelector('#carousel-noticias-destaque > .carousel-indicators');

    const carouselInner = document.querySelector('#carousel-noticias-destaque > .carousel-inner');

    const noticiasEmDestaque = dados['noticias'].filter((noticia) => noticia['destaque']);

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
function homePage()
{
    const newsCardsSection = document.getElementById('news-cards-section');

    if (!newsCardsSection) {

        return;
    }

    carregarCarousel();

    const todasNoticias = dados['noticias'];

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
 */
function carregar404()
{
    document.getElementById('news-container').style.display = 'none';

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
function paginaDeDetalhes()
{
    // Checa se estamos na página de detalhes.
    if (!document.getElementById('news-container')) {

        return;
    }

    const urlParams = new URLSearchParams(window.location.search);

    const idNoticia = urlParams.get('id');

    if (!idNoticia) {

        carregar404();

        return;
    }

    const todasNoticias = dados['noticias'];

    const noticia = todasNoticias.find((noticia) => noticia['id'] == idNoticia);

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

homePage();

paginaDeDetalhes();