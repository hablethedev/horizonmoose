const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('welcome')
		.setDescription('A nice greeting'),
	async execute(interaction) {
		const userId = interaction.user.id;

			await interaction.reply(`Say welcome to <@${userId}.> `);
		
	},
}
