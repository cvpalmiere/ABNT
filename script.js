<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Palmieri ABNT - Completo</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: #FFF8E1;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container { max-width: 800px; width: 100%; }
        .card {
            background: white;
            border-radius: 24px;
            padding: 32px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        .header { text-align: center; margin-bottom: 24px; }
        .header-icon { font-size: 48px; color: #F97316; }
        .title { font-size: 28px; font-weight: 700; color: #1a1a2e; }
        .subtitle { color: #666; margin-top: 4px; }
        .btn-manual {
            background: none;
            border: 1px solid #ddd;
            padding: 6px 14px;
            border-radius: 20px;
            cursor: pointer;
            margin-top: 12px;
            font-size: 12px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }
        .btn-manual:hover { background: #FFF8E1; border-color: #F97316; }
        .drop-area {
            border: 2px dashed #ccc;
            border-radius: 16px;
            padding: 40px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
        }
        .drop-area:hover, .drop-area.drag-over { border-color: #F97316; background: #FFF8E1; }
        .upload-icon { font-size: 48px; color: #999; }
        .btn-outline {
            background: none;
            border: 1px solid #ccc;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 12px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        .btn-outline:hover { background: #FFF8E1; border-color: #F97316; }
        .btn-primary {
            width: 100%;
            background: #F97316;
            border: none;
            padding: 14px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 16px;
        }
        .btn-primary:hover { background: #EA580C; }
        .file-info {
            background: #E8F5E9;
            padding: 12px;
            border-radius: 12px;
            margin-top: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .hidden { display: none; }
        .progress {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 20px;
            color: #F97316;
        }
        .spinning { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .error-msg {
            background: #FFEBEE;
            color: #EF5350;
            padding: 12px;
            border-radius: 8px;
            margin-top: 16px;
            text-align: center;
        }
        .success-msg {
            background: #E8F5E9;
            color: #4CAF50;
            padding: 12px;
            border-radius: 8px;
            margin-top: 16px;
            text-align: center;
        }
        .input-group { margin: 16px 0; }
        .input-group label { display: block; margin-bottom: 6px; font-weight: 500; }
        .input-group input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
        }
        .titulos-section {
            margin-top: 24px;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
        .titulos-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            flex-wrap: wrap;
            gap: 10px;
        }
        .titulos-header h3 { display: flex; align-items: center; gap: 8px; font-size: 16px; }
        .btn-small {
            background: none;
            border: 1px solid #ddd;
            padding: 6px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }
        .btn-small:hover { background: #f5f5f5; border-color: #F97316; }
        .titulos-list {
            background: #f9f9f9;
            border-radius: 12px;
            padding: 12px;
            max-height: 300px;
            overflow-y: auto;
        }
        .titulo-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px;
            border-bottom: 1px solid #eee;
            background: white;
            margin-bottom: 6px;
            border-radius: 8px;
        }
        .titulo-nivel { width: 60px; font-size: 11px; color: #F97316; font-weight: bold; }
        .titulo-texto { flex: 1; font-size: 13px; word-break: break-word; }
        .titulo-acoes { display: flex; gap: 8px; }
        .titulo-acoes button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
            padding: 4px;
            border-radius: 4px;
        }
        .titulo-acoes button:hover { background: #f0f0f0; }
        .add-titulo-form {
            display: flex;
            gap: 10px;
            margin-top: 12px;
            flex-wrap: wrap;
        }
        .add-titulo-form input { flex: 2; padding: 10px; border: 1px solid #ddd; border-radius: 8px; }
        .add-titulo-form select { padding: 10px; border: 1px solid #ddd; border-radius: 8px; }
        .badge { background: #F97316; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; }
        .footer { text-align: center; font-size: 12px; color: #999; margin-top: 20px; }
        
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .modal {
            background: white;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            padding: 24px;
        }
        .modal h3 { margin-bottom: 16px; font-size: 20px; }
        .modal p { margin: 10px 0; line-height: 1.5; }
        .modal button { margin-top: 20px; width: 100%; }
    </style>
</head>
<body>
<div class="container">
    <div class="card">
        <div class="header">
            <div class="header-icon">📄</div>
            <h1 class="title">Palmieri ABNT</h1>
            <p class="subtitle">Formatação automática com validação de títulos</p>
            <button class="btn-manual" id="btnManual">
                <span>📖</span> Manual de Uso
            </button>
        </div>

        <div class="drop-area" id="dropArea">
            <div class="upload-icon">📁</div>
            <p>Arraste seu arquivo .docx aqui</p>
            <p style="font-size: 12px; color: #999;">ou</p>
            <button class="btn-outline" id="selectBtn">📂 Selecionar arquivo</button>
            <input type="file" id="fileInput" accept=".docx" hidden>
        </div>

        <div id="fileInfo" class="file-info hidden">
            <span>📄</span>
            <span id="fileName" style="flex:1"></span>
            <button id="removeFile" style="background:none; border:none; cursor:pointer;">✖️</button>
        </div>

        <div class="input-group hidden" id="nameGroup">
            <label>📝 Nome do arquivo PDF</label>
            <input type="text" id="pdfName" placeholder="Meu documento formatado">
        </div>

        <div id="titulosSection" class="titulos-section hidden">
            <div class="titulos-header">
                <h3><span>📑</span> Títulos/Seções Detectados <span id="titulosCount" class="badge">0</span></h3>
                <button id="buscarNovosTitulos" class="btn-small">🔍 Buscar títulos esquecidos</button>
            </div>
            <div id="titulosList" class="titulos-list"></div>
            <div class="add-titulo-form">
                <input type="text" id="novoTituloTexto" placeholder="Título que não foi encontrado...">
                <select id="novoTituloNivel">
                    <option value="1">Nível 1 (Principal)</option>
                    <option value="2">Nível 2 (Subseção)</option>
                    <option value="3">Nível 3</option>
                </select>
                <button id="adicionarTituloBtn" class="btn-small">➕ Adicionar</button>
            </div>
        </div>

        <button id="formatBtn" class="btn-primary hidden">✨ Gerar PDF Formatado</button>

        <div id="progress" class="progress hidden">
            <span class="spinning">🔄</span>
            <span>Processando seu documento...</span>
        </div>

        <div id="errorMsg" class="error-msg hidden"></div>
        <div id="successMsg" class="success-msg hidden"></div>
    </div>
    <div class="footer">⚡ Processamento local · Nenhum dado é enviado a servidores</div>
</div>

<div id="manualModal" class="modal-overlay hidden">
    <div class="modal">
        <h3>📖 Manual de Uso</h3>
        <p><strong>1.</strong> Envie um arquivo .docx</p>
        <p><strong>2.</strong> O sistema detecta automaticamente os títulos</p>
        <p><strong>3.</strong> Revise, edite ou remova títulos</p>
        <p><strong>4.</strong> Use "Buscar títulos esquecidos" se faltar algum</p>
        <p><strong>5.</strong> Adicione títulos manualmente se necessário</p>
        <p><strong>6.</strong> Clique em "Gerar PDF Formatado"</p>
        <button id="closeModalBtn" class="btn-primary">✅ Entendi</button>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

<script>
(function() {
    // Elementos
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const selectBtn = document.getElementById('selectBtn');
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const removeFile = document.getElementById('removeFile');
    const nameGroup = document.getElementById('nameGroup');
    const pdfNameInput = document.getElementById('pdfName');
    const formatBtn = document.getElementById('formatBtn');
    const progress = document.getElementById('progress');
    const errorMsg = document.getElementById('errorMsg');
    const successMsg = document.getElementById('successMsg');
    const titulosSection = document.getElementById('titulosSection');
    const titulosList = document.getElementById('titulosList');
    const titulosCount = document.getElementById('titulosCount');
    const buscarNovosTitulos = document.getElementById('buscarNovosTitulos');
    const adicionarTituloBtn = document.getElementById('adicionarTituloBtn');
    const novoTituloTexto = document.getElementById('novoTituloTexto');
    const novoTituloNivel = document.getElementById('novoTituloNivel');

    // Modal
    const btnManual = document.getElementById('btnManual');
    const manualModal = document.getElementById('manualModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Estado
    let selectedFile = null;
    let rawHtml = null;
    let titulos = [];

    // ========== MODAL (FUNCIONANDO) ==========
    function abrirModal() { manualModal.classList.remove('hidden'); }
    function fecharModal() { manualModal.classList.add('hidden'); }
    
    btnManual.addEventListener('click', abrirModal);
    closeModalBtn.addEventListener('click', fecharModal);
    manualModal.addEventListener('click', (e) => { if (e.target === manualModal) fecharModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !manualModal.classList.contains('hidden')) fecharModal(); });

    // ========== UPLOAD ==========
    selectBtn.addEventListener('click', () => fileInput.click());
    dropArea.addEventListener('click', (e) => { if (e.target !== selectBtn && !selectBtn.contains(e.target)) fileInput.click(); });
    removeFile.addEventListener('click', resetState);
    formatBtn.addEventListener('click', gerarPDF);
    buscarNovosTitulos.addEventListener('click', buscarTitulosEsquecidos);
    adicionarTituloBtn.addEventListener('click', adicionarTituloManual);

    fileInput.addEventListener('change', (e) => { if (e.target.files[0]) handleFile(e.target.files[0]); });
    dropArea.addEventListener('dragover', (e) => { e.preventDefault(); dropArea.classList.add('drag-over'); });
    dropArea.addEventListener('dragleave', () => dropArea.classList.remove('drag-over'));
    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('drag-over');
        if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });

    async function handleFile(file) {
        if (!file.name.toLowerCase().endsWith('.docx')) { showError('❌ Arquivo .docx válido é necessário.'); return; }
        if (file.size > 50 * 1024 * 1024) { showError('❌ Arquivo muito grande. Máximo 50MB.'); return; }
        
        selectedFile = file;
        fileName.textContent = file.name;
        pdfNameInput.value = file.name.replace(/\.docx$/i, '') + ' - Formatado ABNT';
        
        fileInfo.classList.remove('hidden');
        nameGroup.classList.remove('hidden');
        
        await processarDocumento(file);
    }

    async function processarDocumento(file) {
        progress.classList.remove('hidden');
        formatBtn.classList.add('hidden');
        
        try {
            const arrayBuffer = await readFile(file);
            const result = await mammoth.convertToHtml({ arrayBuffer });
            rawHtml = result.value;
            
            titulos = extrairTitulos(rawHtml);
            
            titulosSection.classList.remove('hidden');
            renderizarTitulos();
            showSuccess(`✅ Processado! ${titulos.length} títulos encontrados.`);
        } catch (err) {
            showError('❌ Erro ao processar: ' + err.message);
        } finally {
            progress.classList.add('hidden');
            formatBtn.classList.remove('hidden');
        }
    }

    function extrairTitulos(html) {
        const encontrados = [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const textosVistos = new Set();
        
        const keywords = ['INTRODUÇÃO', 'OBJETIVO', 'METODOLOGIA', 'CONCLUSÃO', 'REFERÊNCIAS', 'ANEXO', 'APÊNDICE', 'RESUMO'];
        
        doc.body.querySelectorAll('*').forEach(el => {
            const texto = el.textContent.trim();
            if (!texto || texto.length < 3 || texto.length > 150 || textosVistos.has(texto)) return;
            
            const temNegrito = el.querySelector('strong, b') || el.tagName === 'STRONG' || el.tagName === 'B';
            const temNumero = /^\d+\./.test(texto);
            const temKeyword = keywords.some(k => texto.toUpperCase().includes(k));
            
            if ((temNegrito || temNumero || temKeyword) && texto.length < 100) {
                let nivel = 2;
                if (temNumero) { const pontos = (texto.match(/\./g) || []).length; nivel = Math.min(pontos + 1, 4); }
                else if (texto.length < 60 && temNegrito) nivel = 1;
                
                encontrados.push({ texto, nivel });
                textosVistos.add(texto);
            }
        });
        return encontrados;
    }

    function buscarTitulosEsquecidos() {
        if (!rawHtml) { showError('❌ Processe um documento primeiro.'); return; }
        progress.classList.remove('hidden');
        setTimeout(() => {
            const novos = extrairTitulos(rawHtml);
            const existentes = new Set(titulos.map(t => t.texto));
            const adicionados = novos.filter(t => !existentes.has(t.texto));
            if (adicionados.length === 0) showSuccess('🔍 Nenhum título novo encontrado!');
            else { titulos.push(...adicionados); renderizarTitulos(); showSuccess(`✅ ${adicionados.length} título(s) adicionado(s)!`); }
            progress.classList.add('hidden');
        }, 100);
    }

    function adicionarTituloManual() {
        const texto = novoTituloTexto.value.trim();
        if (!texto) { showError('❌ Digite um título.'); return; }
        const nivel = parseInt(novoTituloNivel.value);
        if (titulos.some(t => t.texto === texto)) { showError('❌ Título já existe.'); return; }
        titulos.push({ texto, nivel, manual: true });
        renderizarTitulos();
        novoTituloTexto.value = '';
        showSuccess(`✅ Título "${texto}" adicionado!`);
    }

    function removerTitulo(idx) { titulos.splice(idx, 1); renderizarTitulos(); showSuccess('✅ Título removido.'); }
    function editarTitulo(idx) {
        const novo = prompt('Editar título:', titulos[idx].texto);
        if (novo && novo.trim()) { titulos[idx].texto = novo.trim(); renderizarTitulos(); showSuccess('✅ Título atualizado.'); }
    }

    function renderizarTitulos() {
        if (!titulosList) return;
        if (titulos.length === 0) { titulosList.innerHTML = '<p style="text-align:center;color:#999;padding:20px;">Nenhum título detectado.</p>'; titulosCount.textContent = '0'; return; }
        titulosCount.textContent = titulos.length;
        titulosList.innerHTML = titulos.map((t, i) => `
            <div class="titulo-item">
                <div class="titulo-nivel">Nível ${t.nivel}</div>
                <div class="titulo-texto">${escapeHtml(t.texto)}${t.manual ? ' <span style="font-size:10px;color:#4CAF50;">(adicionado)</span>' : ''}</div>
                <div class="titulo-acoes">
                    <button onclick="window.editarTitulo(${i})">✏️</button>
                    <button onclick="window.removerTitulo(${i})">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    window.editarTitulo = editarTitulo;
    window.removerTitulo = removerTitulo;

    async function gerarPDF() {
        if (!selectedFile) { showError('❌ Nenhum arquivo.'); return; }
        const nomePDF = pdfNameInput.value.trim();
        if (!nomePDF) { showError('❌ Digite um nome para o PDF.'); return; }
        
        formatBtn.classList.add('hidden');
        progress.classList.remove('hidden');
        
        try {
            const arrayBuffer = await readFile(selectedFile);
            const result = await mammoth.convertToHtml({ arrayBuffer });
            let conteudo = result.value;
            if (!conteudo || conteudo.length < 50) {
                const texto = await mammoth.extractRawText({ arrayBuffer });
                conteudo = `<div style="white-space:pre-wrap;">${escapeHtml(texto.value)}</div>`;
            }
            
            const sumario = gerarSumario();
            const fullHtml = montarDocumento(conteudo, nomePDF, sumario);
            
            const temp = document.createElement('div');
            temp.innerHTML = fullHtml;
            temp.style.cssText = 'position:absolute; left:-9999px; top:0; width:210mm; background:white;';
            document.body.appendChild(temp);
            
            await html2pdf().set({ margin: [25,20,20,25], filename: nomePDF+'.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4' } }).from(temp).save();
            document.body.removeChild(temp);
            showSuccess(`✅ PDF gerado! ${titulos.length} títulos no sumário.`);
        } catch (err) { showError('❌ Erro: ' + err.message); }
        finally { progress.classList.add('hidden'); formatBtn.classList.remove('hidden'); }
    }

    function gerarSumario() {
        if (titulos.length === 0) return '<p>Nenhum título.</p>';
        let html = '<div style="margin:20pt 0;"><h2 style="text-align:center;">SUMÁRIO</h2><ul style="list-style:none;padding-left:0;">';
        titulos.forEach(t => html += `<li style="margin-left:${(t.nivel-1)*20}px;margin-bottom:4px;">${escapeHtml(t.texto)}</li>`);
        return html + '</ul></div><div style="page-break-before:always;"></div>';
    }

    function montarDocumento(conteudo, titulo, sumario) {
        return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>${escapeHtml(titulo)}</title>
<style>
    @page { size: A4; margin: 3cm 2cm 2cm 3cm; }
    body { font-family: 'Times New Roman', Arial; font-size: 12pt; line-height: 1.5; text-align: justify; margin: 0; padding: 0; }
    h1 { font-size: 14pt; text-align: center; text-transform: uppercase; }
    p { margin: 0 0 6pt; text-indent: 1.25cm; }
    table { border-collapse: collapse; width: 100%; margin: 12pt 0; }
    th, td { border: 1px solid #000; padding: 6pt; }
    img { max-width: 100%; display: block; margin: 12pt auto; }
    blockquote { margin-left: 4cm; font-size: 10pt; }
</style>
</head>
<body><div style="text-align:center;font-weight:bold;margin-bottom:20pt;">${escapeHtml(titulo)}</div>${sumario}${conteudo}</body></html>`;
    }

    function readFile(file) { return new Promise((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(r.result); r.onerror = () => reject(new Error('Falha na leitura')); r.readAsArrayBuffer(file); }); }
    function escapeHtml(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
    function showError(m) { errorMsg.textContent = m; errorMsg.classList.remove('hidden'); successMsg.classList.add('hidden'); setTimeout(() => errorMsg.classList.add('hidden'), 5000); }
    function showSuccess(m) { successMsg.textContent = m; successMsg.classList.remove('hidden'); errorMsg.classList.add('hidden'); setTimeout(() => successMsg.classList.add('hidden'), 4000); }
    function resetState() { selectedFile = null; rawHtml = null; titulos = []; fileInput.value = ''; fileInfo.classList.add('hidden'); nameGroup.classList.add('hidden'); titulosSection.classList.add('hidden'); formatBtn.classList.add('hidden'); progress.classList.add('hidden'); errorMsg.classList.add('hidden'); successMsg.classList.add('hidden'); }
})();
</script>
</body>
</html>
