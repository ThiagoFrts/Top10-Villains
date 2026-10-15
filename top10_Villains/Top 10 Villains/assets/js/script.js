const secoes = document.querySelectorAll("main section");
const links = document.querySelectorAll("#navLateral a");
const nav = document.getElementById("navLateral");
const barra = document.getElementById("progresso");
const topo = document.querySelector(".topo");
const semAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function contarAte(elemento, alvo) {
    if (semAnimacao) {
        elemento.textContent = alvo;
        return;
    }

    const duracao = 900;
    const inicio = performance.now();

    function passo(agora) {
        const andamento = Math.min((agora - inicio) / duracao, 1);
        elemento.textContent = Math.ceil(andamento * alvo);

        if (andamento < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
}

const observadorRevelar = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        const secao = entrada.target;

        if (entrada.isIntersecting) {
            if (!secao.classList.contains("visivel")) {
                const numero = secao.querySelector(".posicao");
                contarAte(numero, Number(secao.dataset.pos));
            }
            secao.classList.add("visivel");
        } else if (entrada.intersectionRatio === 0) {
            secao.classList.remove("visivel");
        }
    });
}, { threshold: [0, 0.4] });

secoes.forEach((secao) => observadorRevelar.observe(secao));

const observadorMenu = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        const posicao = [...secoes].indexOf(entrada.target);

        // marca o ponto do menu lateral correspondente à seção que está na tela
        const ativo = links[posicao];
        if (ativo) {
            links.forEach((link) => {
                link.classList.remove("ativo");
                link.removeAttribute("aria-current");
            });
            ativo.classList.add("ativo");
            ativo.setAttribute("aria-current", "true");
        }

        // a barra de progresso e o menu passam a usar a cor do vilão atual
        const cor = getComputedStyle(entrada.target).getPropertyValue("--cor");
        if (cor.trim()) document.documentElement.style.setProperty("--cor", cor);
    });
}, { threshold: 0.6 });

secoes.forEach((secao) => observadorMenu.observe(secao));

function aoRolar() {
    const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;

    if (barra && alturaTotal > 0) {
        barra.style.width = (window.scrollY / alturaTotal) * 100 + "%";
    }

    // o menu lateral só aparece depois que o título inicial sai de cena
    if (nav && topo) {
        nav.classList.toggle("visivel", window.scrollY > topo.offsetHeight * 0.5);
    }

    if (topo && !semAnimacao) {
        const quanto = Math.min(window.scrollY / topo.offsetHeight, 1);
        topo.style.opacity = 1 - quanto * 0.8;
        topo.style.transform = "translateY(" + quanto * 40 + "px)";
    }
}

window.addEventListener("scroll", aoRolar, { passive: true });
window.addEventListener("resize", aoRolar);
aoRolar();
