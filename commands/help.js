const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays a list of available commands.'),
	async execute(interaction) {
		const helpEmbed = new EmbedBuilder()
			.setColor('#dd44bb')
			.setTitle('Help')
			.setDescription('List of available commands:')
			.addFields(
				{ name: '/help', value: 'Displays this message.' },
				{ name: '/vsauce', value: 'Sends a Vsauce intro mp4.' },
				{ name: '/gamble', value: 'Go gambling!' },
				{ name: '/cats', value: 'Get a random neko from nekos.best.' }
			)
			.setFooter({ text: 'bot by hablethedev' });

		await interaction.reply({ embeds: [helpEmbed] });
	},
};
