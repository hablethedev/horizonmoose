const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eightball')
		.setDescription('It predicts your future... just kidding.'),
	async execute(interaction) {
		const userId = interaction.user.id;

		const random = Math.floor(Math.random() * 8);

		if (random === 1) {
			await interaction.reply(`Not likely. At all.`);
		} else if (random === 2) {
			await interaction.reply(`https://youtu.be/A1UhABiAfVk?t=202`);
		} else if (random === 3) {
			await interaction.reply(`It might happen.`);
		} else if (random === 4) {
			await interaction.reply(`Yeah, that'll definitely happen. /srs`);
		} else if (random === 5) {
			await interaction.reply(`Download Opera GX (which comes with NordVPN and Honey) and there might be a chance.`);
		} else if (random === 6) {
			await interaction.reply(`God no.`);
		} else if (random === 7) {
			await interaction.reply(`Undetermined... lemme figure it out.`);
		} else if (random === 8) {
			await interaction.reply(`That'll only happen so far in the future if it happens I can't predict it.`);
		}
	},
};
