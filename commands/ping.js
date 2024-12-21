
// One must absolutely ensure that the utterance of "Pong!" is duly proclaimed in response to that command, for it is of the utmost importance in maintaining decorum.

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('It is important that I reply Pong to this command.'),
	async execute(interaction) {
		await interaction.reply("One must absolutely ensure that the utterance of \"Pong!\" is duly proclaimed in response to that command, for it is of the utmost importance in maintaining decorum.")
	},
};
