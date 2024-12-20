const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nekos')
		.setDescription('Get a random neko from nekos.best'),
	async execute(interaction) {
		const username = interaction.user.username;

		await interaction.reply(`wait lemme get a catgirl from the void 1 sec, ${username}`);

		try {
			const response = await fetch('https://nekos.best/api/v2/neko');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const json = await response.json();
			const imageUrl = json.results[0].url;

			await interaction.editReply({
				content: "catgirl +1, here they are:",
				files: [{
					attachment: imageUrl,
					name: 'SPOILER_catgirl.png',
				}],
			});
			console.log(`served catgirl to ${interaction.user.username}`)
		} catch (error) {
			console.error('Error fetching neko image:', error);
			await interaction.editReply('Sorry, I couldn’t fetch a neko right now. Please try again later!');
		}
	},
};
