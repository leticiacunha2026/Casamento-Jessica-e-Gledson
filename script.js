function escapeHtml(text) {
    if (!text) return "";
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, function(m) { return map[m]; });
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("rsvpForm");
    const commentsList = document.getElementById("commentsList");

    // Carregar comentários salvos no navegador ao iniciar a página
    loadComments();

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("guestName").value;
        const attendance = document.getElementById("attendance").value;
        const message = document.getElementById("guestMessage").value;

        const commentData = {
            name,
            attendance,
            message: message.trim() ? message : "Apenas confirmou presença sem recado.",
            date: new Date().toLocaleDateString('pt-BR')
        };

        saveComment(commentData);
        addCommentToDOM(commentData, true); // true indica que é um novo comentário (vai no topo)

        // Limpar formulário
        form.reset();
        alert("Obrigado pela confirmação, " + name + "!");
    });

    function saveComment(data) {
        let comments = JSON.parse(localStorage.getItem("wedding_comments")) || [];
        comments.unshift(data); // Adiciona no início da lista
        localStorage.setItem("wedding_comments", JSON.stringify(comments));
    }

    function loadComments() {
        let comments = JSON.parse(localStorage.getItem("wedding_comments")) || [];
        // Limpa a lista antes de carregar
        commentsList.innerHTML = "";
        
        // Renderiza cada comentário salvo
        comments.forEach(data => addCommentToDOM(data, false));
    }

    function addCommentToDOM(data, isNew = false) {
        const card = document.createElement("div");
        card.classList.add("comment-card");

        card.innerHTML = `
            <div class="comment-header">
                <strong>${escapeHtml(data.name)}</strong>
                <span class="comment-status">${escapeHtml(data.attendance)}</span>
            </div>
            <div class="comment-body">
                <p>${escapeHtml(data.message)}</p>
                <small class="comment-date">${escapeHtml(data.date)}</small>
            </div>
        `;

        if (isNew) {
            commentsList.prepend(card); // Adiciona no topo se for recém-enviado
        } else {
            commentsList.appendChild(card); // Mantém a ordem salva se estiver carregando do LocalStorage
        }
    }
    // Adicione este trecho dentro de document.addEventListener("DOMContentLoaded", () => { ... })

const music = document.getElementById("bgMusic");
const modal = document.getElementById("musicModal");
const btnPlay = document.getElementById("btnPlayMusic");
const btnNo = document.getElementById("btnNoMusic");

// Quando clicar em "Sim"
btnPlay.addEventListener("click", () => {
    music.play().catch(error => console.log("Erro ao tocar áudio:", error));
    modal.style.display = "none"; // Esconde o pop-up
});

// Quando clicar em "Não"
btnNo.addEventListener("click", () => {
    modal.style.display = "none"; // Apenas esconde o pop-up
});
});