const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vsauce')
		.setDescription('hey, michael, vsauce here. math.random is random. or is it?'),
	async execute(interaction) {
		const folderPath = path.join(__dirname, '..', 'vsauce');
		const files = fs.readdirSync(folderPath);
		const mp4Files = files.filter(file => file.endsWith('.mp4'));

		if (mp4Files.length === 0) {
			await interaction.reply('No videos found in the folder!');
			return;
		}

		// i still don't understand how random works ngl
		const randomVideo = mp4Files[Math.floor(Math.random() * mp4Files.length)];
		const videoPath = path.join(folderPath, randomVideo);
		await interaction.reply({
			files: [videoPath],
		});
	},
};
