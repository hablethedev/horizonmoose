const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gamble')
		.setDescription('Go gambling!'),
	async execute(interaction) {
		const userId = interaction.user.id;
		const botSpamChannelId = '1319649023346479144'; // gambling
		const member = interaction.guild.members.cache.get(userId);

		// sorry sea
		if (userId === '949691680796328046' //* || userId === '1113284520737771621' *//) {

			if (interaction.channel.id != "1319649023346479144") {
				await interaction.reply('Go to bot-spam in legitidevs, you have been banned from gambling anywhere else. <#1319649023346479144>');
				console.log(interaction.channel.id);
				return; 
			}
		}

		const random = Math.floor(Math.random() * 101);

		if (random === 1) {
			await interaction.reply(`<@${userId}> gambled, and got: ${random}. How do you even score that bad? Seriously?`);
		} else if (random >= 2 && random <= 25) {
			await interaction.reply(`<@${userId}> gambled, and got: ${random}. Probably the worst you can get.`);
		} else if (random >= 26 && random <= 49) {
			await interaction.reply(`<@${userId}> gambled, and got: ${random}. Not the best.`);
		} else if (random === 50) {
			await interaction.reply(`<@${userId}> gambled, and got: ${random}. Mediocre.`);
		} else if (random >= 51 && random <= 75) {
			await interaction.reply(`<@${userId}> gambled, and got: ${random}. Not the worst.`);
		} else if (random >= 76 && random <= 98) {
			await interaction.reply(`<@${userId}> gambled, and got: ${random}. Oooh. Getting close.`);
		} else if (random === 99) {
			await interaction.reply(`<@${userId}> gambled, had a skill issue, and got: ${random}. Haha!`);
		} else if (random === 100) {
			await interaction.reply(`<@${userId}> gambled, and *somehow* got: ${random}!??? THAT'S CRAZY!`);
		}
	},
};
