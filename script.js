/* =========================================================
   CÓDIGOS GEOMETRY DASH
   VERSION 1.0
========================================================= */


/* ================= AÑO AUTOMÁTICO ================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ================= MENÚ MÓVIL ================= */

const menuButton = document.getElementById("menuButton");
const menu = document.querySelector(".menu");

if (menuButton) {

    menuButton.addEventListener("click", () => {

        menu.classList.toggle("open");

    });

}


/* Cerrar menú al pulsar un enlace */

document.querySelectorAll(".menu a").forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("open");

    });

});


/* ================= TABS DE VAULTS ================= */

const vaultTabs = document.querySelectorAll(".vault-tab");
const codePanels = document.querySelectorAll(".code-panel");


vaultTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const target = tab.dataset.vault;


        /* Quitar active de botones */

        vaultTabs.forEach(item => {

            item.classList.remove("active");

        });


        /* Activar botón seleccionado */

        tab.classList.add("active");


        /* Ocultar paneles */

        codePanels.forEach(panel => {

            panel.classList.remove("active");

        });


        /* Mostrar panel */

        const selectedPanel =
            document.getElementById(target);

        if (selectedPanel) {

            selectedPanel.classList.add("active");

        }

    });

});


/* ================= COPIAR CÓDIGOS ================= */

const copyButtons =
    document.querySelectorAll(".copy-button");

const toast =
    document.getElementById("toast");


copyButtons.forEach(button => {

    button.addEventListener("click", async () => {

        const code = button.dataset.code;


        try {

            await navigator.clipboard.writeText(code);

            showToast("Código copiado ✓");


            const originalText =
                button.textContent;


            button.textContent = "COPIADO ✓";


            setTimeout(() => {

                button.textContent =
                    originalText;

            }, 1500);


        } catch (error) {

            showToast(
                "No se pudo copiar automáticamente"
            );

        }

    });

});


/* ================= TOAST ================= */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* ================= BUSCADOR ================= */

const searchInput =
    document.getElementById("searchInput");

const clearSearch =
    document.getElementById("clearSearch");


const searchableElements = [
    ...document.querySelectorAll(
        ".category-card, .code-card, .article-card, .guide-item"
    )
];


if (searchInput) {

    searchInput.addEventListener("input", () => {

        const search =
            searchInput.value
                .toLowerCase()
                .trim();


        searchableElements.forEach(element => {

            const text =
                element.textContent.toLowerCase();


            if (
                search === "" ||
                text.includes(search)
            ) {

                element.classList.remove(
                    "search-hidden"
                );

            } else {

                element.classList.add(
                    "search-hidden"
                );

            }

        });

    });

}


/* ================= LIMPIAR BÚSQUEDA ================= */

if (clearSearch) {

    clearSearch.addEventListener("click", () => {

        searchInput.value = "";


        searchableElements.forEach(element => {

            element.classList.remove(
                "search-hidden"
            );

        });


        searchInput.focus();

    });

}


/* ================= ANIMACIÓN AL HACER SCROLL ================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.08
        }
    );


document.querySelectorAll(
    ".category-card, .article-card, .guide-item, .code-card"
).forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(15px)";

    element.style.transition =
        "opacity 0.5s ease, transform 0.5s ease";

    observer.observe(element);

});
