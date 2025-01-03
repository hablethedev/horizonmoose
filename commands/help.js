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
				{ name: '/vsauce', value: 'Sends a random vsauce-related video.' },
				{ name: '/gamble', value: 'Go gambling!' },
				{ name: '/nekos', value: 'Get a random neko from nekos.best.' },
				{ name: '/eightball', value: 'The non-magic :8ball: predicts your future.' },
				{ name: '/economy work', value: 'Go work and earn money!' },
				{ name: '/joke', value: 'Can i has dad joke?' },
				{ name: '/ping', value: 'It is important that i reply Pong to this command.' }
			)
			.setFooter({ text: 'bot by hablethedev' });

		await interaction.reply({ embeds: [helpEmbed] });
	},
};
