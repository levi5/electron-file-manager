
const menu = `
<div class="left-menu-content">
    <ul>
        <li id='recent-button'> <img src="./assets/icons/left-menu/history-fill.png" alt="">Recente</li>
        <li> <img src="./assets/icons/left-menu/home-50.png">Pasta pessoal</li>
        <li> <img src="./assets/icons/left-menu/desktop.png" alt="">Área de trabalho</li>
        <li> <img src="./assets/icons/left-menu/document-48.png" alt="">Documentos</li>
        <li> <img src="./assets/icons/left-menu/download.png" alt="">Downloads</li>
        <li><img src="./assets/icons/left-menu/image.png" alt="">Imagens</li>
        <li><img src="./assets/icons/left-menu/music.png" alt="">Músicas</li>
        <li> <img src="./assets/icons/left-menu/videos.png" alt="">Videos</li>
    </ul>
</div>

<div id="content-tag-left-menu">
    <h4 for="">tags</h4>
    <ul>
        <template id="tag-left-menu">
            <li>
                <div class="tag-icon"></div>
                <div class="tag-name hiding-text" style="max-width:80%;"></div>

            </li>
        </template>
    </ul>
</div>
`;


module.exports = {
	menu,
};
