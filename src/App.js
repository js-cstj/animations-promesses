export default class App {
	/**
	 * Méthode principale. Sera appelée après le chargement de la page.
	 */
	static main() {
		// this.exemple1();
		// this.exemple2();
		this.exemple3();
	}
	static exemple1() {
		const boite = document.getElementById('boite');
		boite.innerHTML = 'Exemple 1';

		console.log('Début des animations');
		// Attendre 1s pour commencer les animations
		console.log('Attente de 1 seconde...');
		setTimeout(() => {

			// Première animation
			console.log('Première animation');
			boite.style.width = '300px';
			boite.addEventListener('transitionend', e => {

				// Deuxième animation (changement de hauteur)
				console.log('Deuxième animation');
				boite.style.height = '200px';
				boite.addEventListener('transitionend', e => {

					// Troisième animation (changement de couleur)
					boite.style.backgroundColor = 'blue';
					console.log('Troisième animation');
					boite.addEventListener('transitionend', e => {
						console.log('Toutes les animations sont terminées');
					}, { once: true });
				}, { once: true });
			}, { once: true });
		}, 1000);
	}
	static exemple2() {
		const boite = document.getElementById('boite');
		boite.innerHTML = 'Exemple 2';

		console.log('Début des animations');
		// Attendre 1s pour commencer les animations
		const delai = new Promise((resolve) => {
			console.log('Attente de 1 seconde...');
			setTimeout(() => {
				resolve();
			}, 1000);
		});

		// Première animation
		const animation1 = delai.then(() => {
			return new Promise((resolve) => {
				console.log('Première animation');

				boite.style.width = '300px';
				boite.addEventListener('transitionend', e => {
					resolve();
				}, { once: true });
			});
		});

		// Deuxième animation
		const animation2 = animation1.then(() => {
			return new Promise((resolve) => {
				console.log('Deuxième animation');
				boite.style.height = '200px';
				boite.addEventListener('transitionend', e => {
					resolve();
				}, { once: true });
			});
		});

		// Troisième animation
		const animation3 = animation2.then(() => {
			return new Promise((resolve) => {
				boite.style.backgroundColor = 'blue';
				boite.addEventListener('transitionend', e => {
					resolve();
				}, { once: true });
			});
		});

		// Fin des animations
		animation3.then(() => {
			console.log('Toutes les animations sont terminées');
		});

		// Remarque : il est possible de chaîner les promesses sans les stocker dans des variables intermédiaires
		// const delai = new Promise((resolve) => {
		// 	... // Attendre 1s
		// })
		// .then(() => {
		// 	... // Première animation
		// })
		// .then(() => {
		// 	...	// Deuxième animation
		// })
		// .then(() => {
		// 	...	// Troisième animation
		// })
		// .then(() => {
		// 	...	// Fin des animations
		// });
	}
	static exemple3() {
		const boite = document.getElementById('boite');
		boite.innerHTML = 'Exemple 3';

		// Chaînage des promesses pour effectuer les animations séquentielles
		this.attendreDelai(1000)
			.then(() => {
				boite.style.width = '300px';
				return this.attendreTransition(boite);
			})
			.then(() => {
				boite.style.height = '200px';
				return this.attendreTransition(boite);
			})
			.then(() => {
				boite.style.backgroundColor = 'blue';
				return this.attendreTransition(boite);
			})
			.then(() => {
				console.log('Toutes les animations sont terminées');
			});
	}
	// Fonction pour créer une promesse qui se résout à la fin d'une transition
	static attendreTransition(element) {
		return new Promise((resolve) => {
			element.addEventListener('transitionend', e => {
				resolve();
			}, { once: true });
		});
	}
	// Fonction pour créer une promesse qui se résout après un délai
	static attendreDelai(delai) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, delai);
		});
	}
};