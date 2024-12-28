const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.resolve(__dirname, '../databases/currency.db');
const db = new Database(dbPath);


const fs = require('fs');
const dbFolder = path.dirname(dbPath);
if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder, { recursive: true });
}

// we don't include the database (gitignore) so we need this too
db.prepare(`
CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    currency INTEGER DEFAULT 5
);`).run();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('economy')
        .setDescription('GET MONEY!!!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('work')
                .setDescription('Go work and earn money!')),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const userId = interaction.user.id;

        if (subcommand === 'work') {
            let user = db.prepare('SELECT * FROM users WHERE user_id = ?').get(userId);
            if (!user) {
                db.prepare('INSERT INTO users (user_id, currency) VALUES (?, 5)').run(userId);
                user = { user_id: userId, currency: 5 };
            }

            // TODO: wait time, jobs
            const earned = Math.floor(Math.random() * 41) + 10;
            const newBalance = user.currency + earned;
            db.prepare('UPDATE users SET currency = ? WHERE user_id = ?').run(newBalance, userId);


            await interaction.reply(
                `You worked hard and earned ${earned} currency! You now have ${newBalance} currency.`
            );
        } else {
            await interaction.reply('how do you even-');
        }
    }
};
