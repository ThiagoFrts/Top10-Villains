# Top 10 Vilões do Cinema

Projeto do curso de Informática para Internet, feito com HTML, CSS e JavaScript. A página inicial mostra um ranking dos 10 vilões mais marcantes do cinema, e cada vilão tem uma página com a sua história.

## Acesse meu projeto

https://top10viloescinema.netlify.app/

## Vilões

. Lotso
9. Tai Lung
8. Duende Verde
7. Loki
6. Pennywise
5. Scar
4. Thanos
3. Voldemort
2. Coringa
1. Darth Vader

## Estrutura das pastas

```
.
├── index.html
├── README.md
└── assets
    ├── css
    │   ├── all.css         # fontes e variáveis compartilhadas por todas as páginas
    │   ├── style.css       # estilo da página inicial
    │   └── vilaoN.css      # estilo da página de cada vilão
    ├── fonts
    │   └── *.woff2         # Bebas Neue (títulos) e Inter (texto), licença OFL
    ├── js
    │   └── script.js       # animações, barra de progresso e menu lateral da página inicial
    ├── img
    │   └── vilaoN.webp     # imagem de cada vilão (WebP, até 1600 px de largura)
    └── pages
        └── vilaoN.html     # página de cada vilão
```

O `N` é a posição do vilão no ranking, de 1 a 10.
