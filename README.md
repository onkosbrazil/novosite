# Site Onkos 2026

Site estático (HTML, CSS e JavaScript puros) recriado a partir do rascunho 2026 feito no WordPress/Elementor.

## Estrutura

```
index.html            todas as páginas (uma por bloco <div class="page" data-page="...">)
assets/css/style.css  estilos (cores e fontes no topo, em :root)
assets/js/main.js     navegação entre páginas, sliders, carrosséis e linha do tempo
assets/img/           imagens otimizadas (WebP) e vídeo do banner
```

## Páginas

| Endereço | Página |
|---|---|
| `#inicio` | Home |
| `#pacientes` | Exames · Pacientes |
| `#mir-thype` | mir-THYpe · Médicos |
| `#full` | mir-THYpe full |
| `#preop` | mir-THYpe pre-op |
| `#target` | mir-THYpe target |
| `#qualidade` | Nossa Qualidade |
| `#quem-somos` | Prêmio e Reconhecimentos |
| `#na-midia` | Na Mídia |
| `#contato` | Contato |

## Como ver localmente

Abra `index.html` no navegador, ou rode `python3 -m http.server` nesta pasta e acesse http://localhost:8000.

## Publicar

Funciona direto no GitHub Pages (Settings → Pages → branch `main`, pasta `/`), Vercel ou Netlify, sem build.

## Como editar

- Textos: procure o trecho em `index.html` e edite.
- Cores e fonte: variáveis no início de `assets/css/style.css`.
- Linha do tempo de prêmios: lista `TL` em `assets/js/main.js`.
- Cabeçalho, rodapé, FAQ, parceiros e carrossel do blog são blocos `<template>` compartilhados em `index.html`.
