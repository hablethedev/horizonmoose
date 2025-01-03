const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.resolve(__dirname, '../databases/currency.db');
const db = new Database(dbPath);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gamble')
        .setDescription('Spend 10 Currency to gamble!'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const botSpamChannelId = '1319649023346479144';
        if (userId === '949691680796328046') {
            if (interaction.channel.id != botSpamChannelId) {
                await interaction.reply('Go to bot-spam in legitidevs, you have been banned from gambling anywhere else. <#1319649023346479144>');
                console.log(interaction.channel.id);
                return;
            }
        }

        let user = db.prepare('SELECT * FROM users WHERE user_id = ?').get(userId);
        if (!user) {
            db.prepare('INSERT INTO users (user_id, currency) VALUES (?, 5)').run(userId);
            user = { user_id: userId, currency: 5 };
        }

        if (user.currency < 10) {
            await interaction.reply(`You need at least 10 currency to gamble. You currently have ${user.currency} currency.`);
            return;
        }

        const newBalance = user.currency - 10;
        db.prepare('UPDATE users SET currency = ? WHERE user_id = ?').run(newBalance, userId);

        const random = Math.floor(Math.random() * 41) + 10;
        const updatedBalance = newBalance + random;

        db.prepare('UPDATE users SET currency = ? WHERE user_id = ?').run(updatedBalance, userId);

        await interaction.reply(`You gambled and earned ${random} currency! You now have ${updatedBalance} currency.`);
    },
};
