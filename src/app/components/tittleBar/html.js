const header = `
<div class="window-icons">
<button type="button" id="btn-close-window">
    <img src="./assets/icons/title-bar/close/2x/baseline_close_white_18dp.png" alt="close window">
</button>
<button type="button" id="btn-maximize-window">
    <img src="./assets/icons/title-bar/maximize/maximize2.png" alt="maximize window">
</button>
<button type="button" id="btn-minimize-window">
    <img src="./assets/icons/title-bar/minimize/minimize.png" alt="minimize window">
</button>
</div>

<div class="title-bar">
<div id="hidden-path-title-bar"></div>
<div class="previous-directory">
    <img src="./assets/icons/title-bar/directory/arrow-left-s-line.svg" alt="">
</div>
<ul>
</ul>
<div class="next-directory">
    <img src="./assets/icons/title-bar/directory/arrow-right-s-line.svg" alt="">

</div>
</div>

<div class="menu-window">
<div class="menu-toggle">
    <img id="icon-grade" src="./assets/icons/title-bar/layout/grade-2-50.png" alt="">
</div>


<div class="menu-toggle">
    <img id="icon-menu" src="./assets/icons/title-bar/menu/menu.png" alt="">
</div>
</div>

`;

module.exports = {
	header,
};
