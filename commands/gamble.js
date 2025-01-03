const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.resolve(__dirname, '../databases/currency.db');
const db = new Database(dbPath);

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        user_id TEXT PRIMARY KEY,
        currency INTEGER DEFAULT 5,
        gambleCountdown INTEGER
    );
`).run();

const usersTableExists = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").get();
if (usersTableExists) {
    const columns = db.prepare("PRAGMA table_info(users)").all();
    if (!columns.find(column => column.name === 'gambleCountdown')) {
        db.prepare("ALTER TABLE users ADD COLUMN gambleCountdown INTEGER").run();
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gamble')
        .setDescription('Spend 10 Currency to gamble!'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const botSpamChannelId = '1319649023346479144';

        if (userId === '949691680796328046') {
            if (interaction.channel.id !== botSpamChannelId) {
                await interaction.reply({
                    content: 'Go to bot-spam in legitidevs, you have been banned from gambling anywhere else. <#1319649023346479144>',
                    ephemeral: true
                });
                return;
            }
        }

        let user = db.prepare('SELECT * FROM users WHERE user_id = ?').get(userId);
        if (!user) {
            db.prepare('INSERT INTO users (user_id, currency) VALUES (?, 5)').run(userId);
            user = { user_id: userId, currency: 5 };
        }

        const now = Date.now();
        const cooldownTime = 10 * 1000;

        if (user.gambleCountdown && now - user.gambleCountdown < cooldownTime) {
            const timeLeft = Math.ceil((cooldownTime - (now - user.gambleCountdown)) / 1000);
            await interaction.reply({
                content: `You must wait ${timeLeft} more second(s) before gambling again.`,
                ephemeral: true
            });
            return;
        }

        db.prepare('UPDATE users SET gambleCountdown = ? WHERE user_id = ?').run(now, userId);

        if (user.currency < 10) {
            await interaction.reply({
                content: `You need at least 10 currency to gamble. You currently have ${user.currency} currency.`,
                ephemeral: true
            });
            return;
        }

        const newBalance = user.currency - 10;
        db.prepare('UPDATE users SET currency = ? WHERE user_id = ?').run(newBalance, userId);

        const random = Math.floor(Math.random() * 21);
        const updatedBalance = newBalance + random;

        db.prepare('UPDATE users SET currency = ? WHERE user_id = ?').run(updatedBalance, userId);

        await interaction.reply({
            content: `You gambled and earned ${random} currency! You now have ${updatedBalance} currency.`,
            ephemeral: true
        });
    },
};
