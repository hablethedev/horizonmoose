const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gamble')
		.setDescription('Go gambling!'),
	async execute(interaction) {
		await interaction.reply('Gambling Result: ' + Math.floor(Math.random() * 11));
	},
};
