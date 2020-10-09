/* eslint-disable no-undef */
/* eslint-disable prefer-const */
// const getSize = require('get-folder-size');
// const byteSize = require('byte-size');
const moment = require('moment');

const fileSystem = require('../../../../utils/fileSystem');
const { Elements } = require('../../../../utils/Elements');

async function openWindowDetails(filename, filetype, filepath) {
	const { screen } = Elements.main.details;
	screen.classList.add('on');
	screen.setAttribute('data-path', filepath);
	screen.setAttribute('data-type', filetype);
	let {
		_size, atime, birthtime, mtime,
	} = await fileSystem.getFileDetails(filepath);

	const lastAccess = moment(atime).format('DD/MM/YYYY - HH:MM:SS').split('-');
	const creation = moment(birthtime).format('DD/MM/YYYY - HH:MM:SS').split('-');
	const modification = moment(mtime).format('DD/MM/YYYY - HH:MM:SS').split('-');

	screen.querySelector('.content').innerHTML = '';
	// size = byteSize(size);
	const content = `
				<img src="./assets/icons/left-menu/archive.svg" alt="">
				<div>
					<section>
					<div>
						<div>
							<label>Nome:</label>
						</div>
						<div>
							<label>${filename}</label>
						</div>
					</div>
						
					</section>
					<section>
						<label>Acesso</label>
					   	<div>
								<div>
									<label>Data:</label>
									<label>Hora:</label>
								</div>
								<div>
									<label name="">${lastAccess[0]}</label>
									<label name="">${lastAccess[1]}</label>
								</div>
					   </div>
					</section>
					<section>
						<label>Criação</label>
					   <div>
								<div>
									<label>Data:</label>
									<label>Hora:</label>
								</div>
								<div>
									<label name="">${creation[0]}</label>
									<label name="">${creation[1]}</label>
								</div>
					   </div>
					</section>
					<section>
						<label>Modificação</label>
					   <div>
							<div>
								<label>Data:</label>
								<label>Hora:</label>
							</div>
							<div>
								<label name="">${modification[0]}</label>
								<label name="">${modification[1]}</label>
							</div>
					   </div>
					</section>
				</div>

	`;
	screen.querySelector('.content').innerHTML = content;
}


function closeWindowDetails() {
	Elements.main.details.screen.classList.remove('on');
}


function loadDetails(loadDirectory) {
	document.querySelector('#btn-close-details-screen').addEventListener('click', () => {
		closeWindowDetails();
	});

	document.querySelector('#btn-open-file-details-screen').addEventListener('click', () => {
		const path = String(Elements.main.details.screen.getAttribute('data-path'));
		const type = String(Elements.main.details.screen.getAttribute('data-type'));
		if (type === 'directory') {
			loadDirectory(path);
		} else {
			console.log('open file function not implemented');
		}
		closeWindowDetails();
	});
}

module.exports = {
	openWindowDetails,
	closeWindowDetails,
	loadDetails,
};
