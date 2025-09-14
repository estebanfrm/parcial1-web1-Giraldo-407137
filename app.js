// SPA con Vanilla JS usando hash routing
const routes = {
    "/muro": renderMuro,
    "/info": renderInfo,
    "/photos": renderPhotos,
    "/boxes": renderBoxes,
};

const view = document.getElementById("view");
const navLinks = [...document.querySelectorAll(".nav-link")];

function setActive(hash) {
    navLinks.forEach((a) => {
        const isCurrent = a.getAttribute("href") === hash;
        a.setAttribute("aria-current", isCurrent ? "page" : "false");
    });
}

function navigate() {
    const hash = location.hash || "#/muro";
    const path = hash.replace("#", "");
    const render = routes[path] || renderNotFound;
    setActive("#" + path);
    view.innerHTML = "";
    render(view);
    view.focus();
}

window.addEventListener("hashchange", navigate);
window.addEventListener("DOMContentLoaded", navigate);

// ===== Vistas =====
function renderMuro(root) {
    root.appendChild(el("h2", { textContent: "Muro" }));
    root.appendChild(postComposer());
    const posts = [
        {
            user: "Brayan Martinez",
            time: "Lunes 8:45 pm",
            text: "Me encanta esta red social.",
        },
        {
            user: "Valeroa Gomez",
            time: "Lunes 11:46 pm",
            text: "Scrollear genera mucha dopamina",
        },
    ];
    posts.forEach((p) => root.appendChild(postItem(p)));
}

function postComposer() {
    const card = el("article", { className: "card" });
    const form = el("form", { className: "post form", onsubmit: onSubmit });
    const thumb = el("div", { className: "thumb", ariaHidden: true });
    const textarea = el("textarea", {
        placeholder: "Escribe algo...",
        rows: 3,
        style: "width:100%",
    });
    const actions = el("div", { className: "actions" });
    const publish = el("button", { type: "submit", textContent: "Compartir" });
    actions.append(publish);
    form.append(thumb, textarea, actions);
    card.append(form);
    function onSubmit(ev) {
        ev.preventDefault();
        const text = textarea.value.trim();
        if (!text) return;
        const post = postItem({ user: "Esteban Giraldo", time: "Ahora", text });
        card.after(post);
        textarea.value = "";
    }
    return card;
}

function postItem({ user, time, text }) {
    const article = el("article", { className: "card post" });
    article.append(
        el("div", { className: "thumb", ariaHidden: true }),
        (function () {
            const container = el("div");
            const header = el("header");
            header.append(
                el("strong", { textContent: user }),
                el("time", { dateTime: "", textContent: time })
            );
            const body = el("p", { textContent: text });
            const actions = el("div", { className: "actions" });
            actions.append(
                el("button", { type: "button", textContent: "Me gusta 👍" }),
                el("button", { type: "button", textContent: "Comentar 💬" }),
                el("button", { type: "button", textContent: "Compartir ↗" })
            );
            container.append(header, body, actions);
            return container;
        })()
    );
    return article;
}

function renderInfo(root) {
    root.appendChild(el("h2", { textContent: "Info" }));
    const dl = el("dl", { className: "card" });
    const rows = [
        ["Email", "esteban.giraldo01@unicatolica.edu.co"],
        ["Teléfono", "(+57) 3126822833"],
        ["Intereses", "música, videojuegos, tiktok"],
        ["Situación sentimental", "soltero"],
    ];
    rows.forEach(([dt, dd]) => {
        const wrapper = el("div", {
            style: "display:flex; gap:1rem; padding:.4rem 0; border-top:1px solid var(--border)",
        });
        wrapper.append(
            el("dt", {
                style: "min-width:140px; color:var(--muted);",
                textContent: dt,
            })
        );
        wrapper.append(el("dd", { textContent: dd }));
        dl.append(wrapper);
    });
    root.appendChild(dl);
}

function renderPhotos(root) {
    root.appendChild(el("h2", { textContent: "Photos" }));
    const grid = el("div", { className: "grid-photos" });
    for (let i = 0; i < 12; i++) {
        const img = new Image();
        img.alt = "Foto " + (i + 1);
        img.src = "assets/photo_" + ((i % 6) + 1) + ".jpg"; // placeholders
        grid.appendChild(img);
    }
    root.appendChild(grid);
}

function renderBoxes(root) {
    root.appendChild(el("h2", { textContent: "Boxes" }));
    const grid = el("div", { className: "grid-boxes" });
    const items = [
        ["Sobre mí", "Estudiante de ingeniería de sistemas"],
        ["Amigos", "256 amigos"],
        ["Intereses", "Bachata, videojuegos, tiktok, musica, programacion"],
        ["Habilidades", "JavaScript, HTML, CSS, Python"],
    ];
    items.forEach(([title, desc]) => {
        const box = el("article", { className: "card box" });
        box.append(
            el("h3", { textContent: title }),
            el("p", { textContent: desc })
        );
        grid.appendChild(box);
    });
    root.appendChild(grid);
}

function renderNotFound(root) {
    root.appendChild(el("h2", { textContent: "404" }));
    root.appendChild(
        el("p", { textContent: "La sección solicitada no existe." })
    );
}

// Utilidad para crear elementos
function el(tag, props = {}) {
    const node = document.createElement(tag);
    Object.assign(node, props);
    return node;
}

// Búsqueda (simulada)
const search = document.querySelector(".search");
search.addEventListener("submit", (e) => {
    e.preventDefault();
    const term = e.currentTarget.q.value.trim();
    if (!term) return;
    alert("Buscar: " + term + "\n(Comportamiento simulado)");
});
