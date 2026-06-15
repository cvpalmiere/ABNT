// ==================== ELEMENTOS DO DOM ====================
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const selectBtn = document.getElementById('selectBtn');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const removeFile = document.getElementById('removeFile');
const nameSection = document.getElementById('nameSection');
const pdfNameInput = document.getElementById('pdfName');
const formatBtn = document.getElementById('formatBtn');
const progress = document.getElementById('progress');
const errorMsg = document.getElementById('errorMsg');
const uploadSection = document.getElementById('uploadSection');

// Elementos do modal
const btnManual = document.getElementById('btnManual');
const modalOverlay = document.getElementById('modalOverlay');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCloseModalFooter = document.getElementById('btnCloseModalFooter');

// ==================== VARIÁVEIS DE ESTADO ====================
let selectedFile = null;

// ==================== EVENTOS DO MODAL ====================

// Abrir modal
btnManual.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // travar scroll da página
});

// Fechar modal (botão X)
btnCloseModal.addEventListener('click', closeModal);

// Fechar modal (botão "Entendi")
btnCloseModalFooter.addEventListener('click', closeModal);

// Fechar modal clicando fora
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
        closeModal();
    }
});

function closeModal() {
    modalOverlay.classList.add('hidden');
    document.body.style.overflow = ''; // liberar scroll
}

// ==================== EVENTOS DE UPLOAD ====================

// Clique no botão "Selecionar arquivo"
selectBtn.addEventListener('click', () => fileInput.click());

// Clique na área de arrastar (evita abrir o input quando clica no botão interno)
dropArea.addEventListener('click', (e) => {
    if (e.target !== selectBtn && !selectBtn.contains(e.target)) {
        fileInput.click();
    }
});

// Arquivo selecionado via input
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
});

// Drag and drop
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('active');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('active');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('active');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
});

// Remover arquivo
removeFile.addEventListener('click', () => {
    resetState();
});

// ==================== LÓGICA DE ARQUIVO ====================

function handleFile(file) {
    // Validar extensão
    if (!file.name.toLowerCase().endsWith('.docx')) {
        showError('Por favor, selecione um arquivo .docx válido.');
        return;
    }

    // Validar tamanho (50MB máximo)
    if (file.size > 50 * 1024 * 1024) {
        showError('O arquivo é muito grande. Tamanho máximo: 50MB.');
        return;
    }

    selectedFile = file;
    fileName.textContent = file.name;
    clearError();

    // Mostrar info do arquivo, campo de nome e botão
    fileInfo.classList.remove('hidden');
    nameSection.classList.remove('hidden');
    formatBtn.classList.remove('hidden');

    // Sugerir nome para o PDF baseado no nome original
    const baseName = file.name.replace(/\.docx$/i, '');
    pdfNameInput.value = baseName + ' - Formatado ABNT';
}

function resetState() {
    selectedFile = null;
    fileInput.value = '';
    fileName.textContent = '';
    pdfNameInput.value = '';
    fileInfo.classList.add('hidden');
    nameSection.classList.add('hidden');
    formatBtn.classList.add('hidden');
    progress.classList.add('hidden');
    clearError();
}

// ==================== FORMATAÇÃO ====================

formatBtn.addEventListener('click', async () => {
    if (!selectedFile) {
        showError('Nenhum arquivo selecionado.');
        return;
    }

    const pdfName = pdfNameInput.value.trim();
    if (!pdfName) {
        showError('Por favor, defina um nome para o arquivo PDF.');
        return;
    }

    clearError();
    formatBtn.classList.add('hidden');
    progress.classList.remove('hidden');

    try {
        await formatDocument(selectedFile, pdfName);
    } catch (err) {
        console.error('Erro na formatação:', err);
        showError('Ocorreu um erro ao formatar o documento. Verifique se o arquivo .docx é válido.');
    } finally {
        progress.classList.add('hidden');
        formatBtn.classList.remove('hidden');
    }
});

// ==================== PROCESSAMENTO PRINCIPAL ====================

async function formatDocument(file, pdfName) {
    // 1. Ler o arquivo como ArrayBuffer
    const arrayBuffer = await readFileAsArrayBuffer(file);

    // 2. Extrair conteúdo do .docx com Mammoth
    const mammothResult = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
    const rawHtml = mammothResult.value;

    // 3. Construir o HTML formatado conforme ABNT
    const formattedHtml = buildAbntHtml(rawHtml);

    // 4. Criar um container temporário invisível para gerar o PDF
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = formattedHtml;
    tempContainer.style.cssText = `
        position: absolute;
        left: -9999px;
        top: 0;
        width: 210mm;
        background: white;
        font-family: Arial, sans-serif;
    `;
    document.body.appendChild(tempContainer);

    // 5. Gerar PDF com html2pdf
    const opt = {
        margin: [30, 30, 20, 20], // superior, esquerda, inferior, direita (mm)
        filename: pdfName + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    await html2pdf().set(opt).from(tempContainer).save();

    // 6. Limpar container temporário
    document.body.removeChild(tempContainer);
}

// ==================== CONSTRUÇÃO DO HTML ABNT ====================

function buildAbntHtml(rawHtml) {
    // Cria um DOM parser para manipular o HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, 'text/html');
    const body = doc.body;

    // Coletar títulos (elementos em negrito = <strong>)
    const headings = [];
    const allElements = body.querySelectorAll('*');

    allElements.forEach((el) => {
        // Verifica se o elemento contém <strong> e se parece um título
        const strongChild = el.querySelector('strong');
        if (strongChild && isLikelyHeading(el, strongChild)) {
            const text = el.textContent.trim();
            const level = determineHeadingLevel(text);
            headings.push({ text, level, element: el });
        }
    });

    // Construir o sumário
    let sumarioHtml = '<div class="sumario">';
    sumarioHtml += '<h2 style="text-align:center; font-weight:bold; font-family:Arial, sans-serif;">SUMÁRIO</h2>';
    sumarioHtml += '<ul style="list-style:none; padding-left:0;">';
    headings.forEach((h) => {
        const indent = (h.level - 1) * 20;
        sumarioHtml += `
            <li style="margin-left:${indent}px; margin-bottom:6px; font-size:12px; font-family:Arial, sans-serif;">
                ${h.text}
            </li>
        `;
    });
    sumarioHtml += '</ul></div>';

    // Aplicar classes ABNT aos elementos
    applyAbntStyles(body, headings);

    // Juntar tudo
    const fullHtml = `
        <div style="font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.5; color: #000;">
            ${sumarioHtml}
            <div style="page-break-before: always;"></div>
            ${body.innerHTML}
        </div>
    `;

    return fullHtml;
}

function isLikelyHeading(el, strongChild) {
    // Um título provável tem <strong> com texto relativamente curto
    const text = el.textContent.trim();
    if (text.length > 120) return false; // títulos não são muito longos
    if (text.length < 3) return false;

    // Verifica se começa com número (ex: "1. INTRODUÇÃO")
    if (/^\d/.test(text)) return true;

    // Verifica palavras-chave de seções
    const headingKeywords = [
        'INTRODUÇÃO', 'INTRODUCAO', 'OBJETIVO', 'OBJETIVOS',
        'METODOLOGIA', 'DESENVOLVIMENTO', 'RESULTADOS',
        'CONCLUSÃO', 'CONCLUSOES', 'CONCLUSAO', 'REFERÊNCIAS',
        'REFERENCIAS', 'BIBLIOGRAFIA', 'ANEXO', 'APÊNDICE', 'APENDICE',
        'JUSTIFICATIVA', 'FUNDAMENTAÇÃO', 'FUNDAMENTACAO',
        'RESUMO', 'ABSTRACT'
    ];

    const upperText = text.toUpperCase();
    return headingKeywords.some(kw => upperText.includes(kw));
}

function determineHeadingLevel(text) {
    const match = text.match(/^(\d+)/);
    if (match) {
        // Conta quantos pontos tem a numeração para definir o nível
        const dots = (text.match(/\./g) || []).length;
        // Ex: "1." = nível 1 (1 ponto), "1.1" = nível 2 (2 pontos)
        return Math.min(dots, 4); // máximo nível 4
    }
    return 1; // títulos sem número = nível 1
}

function applyAbntStyles(body, headings) {
    // Aplicar estilos ABNT aos parágrafos
    const paragraphs = body.querySelectorAll('p');
    paragraphs.forEach((p) => {
        p.style.textIndent = '1.25cm';
        p.style.marginBottom = '0';
        p.style.fontSize = '12pt';
        p.style.lineHeight = '1.5';
        p.style.fontFamily = 'Arial, sans-serif';
    });

    // Aplicar estilos aos títulos detectados
    headings.forEach((h) => {
        const el = h.element;
        el.style.fontWeight = 'bold';
        el.style.fontSize = '12pt';
        el.style.textIndent = '0';
        el.style.marginTop = '12pt';
        el.style.marginBottom = '6pt';
        el.style.fontFamily = 'Arial, sans-serif';

        if (h.level === 1) {
            el.style.textAlign = 'center';
            el.style.textTransform = 'uppercase';
        } else {
            el.style.textAlign = 'left';
        }
    });

    // Aplicar estilos a imagens
    const images = body.querySelectorAll('img');
    images.forEach((img) => {
        img.style.display = 'block';
        img.style.margin = '12pt auto';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });

    // Aplicar estilos a citações longas (blockquote)
    const blockquotes = body.querySelectorAll('blockquote');
    blockquotes.forEach((bq) => {
        bq.style.marginLeft = '4cm';
        bq.style.fontSize = '10pt';
        bq.style.lineHeight = '1.0';
        bq.style.textIndent = '0';
        bq.style.fontFamily = 'Arial, sans-serif';
    });

    // Aplicar estilos a listas
    const lists = body.querySelectorAll('ul, ol');
    lists.forEach((list) => {
        list.style.fontFamily = 'Arial, sans-serif';
        list.style.fontSize = '12pt';
        list.style.lineHeight = '1.5';
    });
}

// ==================== UTILITÁRIOS ====================

function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Falha ao ler o arquivo.'));
        reader.readAsArrayBuffer(file);
    });
}

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove('hidden');
}

function clearError() {
    errorMsg.textContent = '';
    errorMsg.classList.add('hidden');
}
