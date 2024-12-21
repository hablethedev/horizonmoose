const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('I can has dad joke?'),
	async execute(interaction) {
		try {
			const response = await fetch('https://icanhazdadjoke.com/', {
				headers: { Accept: 'text/plain' }
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const joke = await response.text();
			await interaction.reply(joke);
		} catch (error) {
			console.error('Error fetching the joke:', error);
			await interaction.reply('Sorry, I couldn’t fetch a joke right now. Try again later!');
		}
	},
};
