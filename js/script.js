// ===================================
// CONFIGURAÇÃO DO GITHUB
// ===================================

// ALTERE ISSO COM SEU NOME DE USUÁRIO DO GITHUB
const GITHUB_USERNAME = 'Lutrazovski';
const GITHUB_API_URL = 'https://api.github.com/users';

// ===================================
// CONFIGURAÇÃO DO EMAILJS
// ===================================

const EMAILJS_SERVICE_ID = 'Contado Portifólio';
const EMAILJS_TEMPLATE_ID = 'template_0t5s49b';
const EMAILJS_PUBLIC_KEY = 'aLY8kkJAdG2ARxtVN';

// Inicializar EmailJS será feito dentro do DOMContentLoaded

// ===================================
// CARREGAR PROJETOS DO GITHUB
// ===================================

async function carregarProjetos() {
    const container = document.getElementById('projetos-container');

    try {
        const response = await fetch(`${GITHUB_API_URL}/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const repos = await response.json();

        if (repos.length === 0) {
            container.innerHTML = '<div class="col-12"><p class="text-center text-muted">Nenhum repositório encontrado.</p></div>';
            return;
        }

        // Filtrar repositórios (opcional: remover forks)
        const reposFilterados = repos.filter(repo => !repo.fork);

        container.innerHTML = reposFilterados.map(repo => `
            <div class="col-md-6 col-lg-4">
                <div class="project-card">
                    <div class="project-image">
                        <i class="fas fa-code-branch"></i>
                    </div>
                    <div class="project-body">
                        <h5 class="project-title">${repo.name}</h5>
                        <p class="project-description">${repo.description ? repo.description.substring(0, 100) + '...' : 'Sem descrição'}</p>
                        <div class="project-footer">
                            ${repo.language ? `<span class="project-tag">${repo.language}</span>` : ''}
                            <span class="project-tag">⭐ ${repo.stargazers_count}</span>
                        </div>
                        <div style="margin-top: 1rem;">
                            <a href="${repo.html_url}" target="_blank" class="project-link">
                                Ver no GitHub <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning" role="alert">
                    <strong>Aviso:</strong> Não foi possível carregar os repositórios. 
                    Certifique-se de que alterou o nome de usuário do GitHub em <code>script.js</code>.
                    <br>
                    <small>Erro: ${error.message}</small>
                </div>
            </div>
        `;
    }
}

// ===================================
// FORMULÁRIO DE CONTATO (FORMSPREE)
// ===================================

window.addEventListener('load', function () {
    carregarProjetos();

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Obter valores do formulário
            const formInputs = this.querySelectorAll('.form-control');
            const from_name = formInputs[0].value;
            const from_email = formInputs[1].value;
            const message = formInputs[2].value;

            // Validação básica
            if (!from_name || !from_email || !message) {
                alert('Por favor, preencham todos os campos!');
                return;
            }

            // Mostrar loading
            const button = this.querySelector('.btn');
            const originalText = button.textContent;
            button.textContent = 'Enviando...';
            button.disabled = true;

            // Usar Formspree para enviar email
            fetch('https://formspree.io/f/xjgplbkk', {
                method: 'POST',
                body: JSON.stringify({
                    name: from_name,
                    email: from_email,
                    message: message
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                button.textContent = originalText;
                button.disabled = false;
                
                if (response.ok) {
                    console.log('✅ Email enviado com sucesso!');
                    alert('Mensagem enviada com sucesso! Obrigado por entrar em contato.');
                    contactForm.reset();
                } else {
                    console.error('❌ Erro ao enviar:', response.status);
                    alert('⚠️ Erro ao enviar. Tente novamente mais tarde.');
                }
            })
            .catch(function (error) {
                button.textContent = originalText;
                button.disabled = false;
                console.error('❌ Erro de conexão:', error);
                alert('⚠️ Erro de conexão. Verifique sua internet e tente novamente.');
            });
        });
    }

    // Fechar navbar ao clicar em um link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbar = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
        });
    });

    // Scroll animado para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80; // Compensar a navbar fixa
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efeito de scroll na navbar
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });
});

// ===================================
// UTILITÁRIOS
// ===================================

// Formatar número de estrelas
function formatarEstrelas(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num;
}
