
const menu = `
<div id="left-menu-options">
        <ul>
            <li id="btn-open-options-menu"><img src="./assets/icons/all/folder.svg" alt="open">Abrir</li>
            <li id="btn-remove-options-menu"><img src="./assets/icons/all/delete-bin.svg" alt="remove"> Remover</li>
        </ul>
</div>

<div class="left-menu-content">
    <ul id="fixed-items-menu">
        <li id="recent-button"> <img src="./assets/icons/left-menu/recent.png" alt="">Recente</li>
        <li id="homedir-button"><img src="./assets/icons/left-menu/homedir.png" alt="pasta pessoal">Pasta pessoal</li>
    <ul>

    <ul id="variable-items-menu">
            <template id="left-menu-template">
            <li> 
                <img>
            
            </li>
            </template>
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
