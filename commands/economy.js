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

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    currency INTEGER DEFAULT 5,
    last_worked INTEGER DEFAULT 0
);`).run();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('economy')
        .setDescription('Manage your currency')
        .addSubcommand(subcommand =>
            subcommand
                .setName('work')
                .setDescription('Go work and earn money!'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('modifycurrency')
                .setDescription('Modify a user\'s currency')
                .addStringOption(option =>
                    option.setName('username')
                        .setDescription('The username of the user to modify')
                        .setRequired(true))
                .addIntegerOption(option =>
                    option.setName('amount')
                        .setDescription('The amount to set the user\'s currency to')
                        .setRequired(true))),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const userId = interaction.user.id;

        if (subcommand === 'work') {
            let user = db.prepare('SELECT * FROM users WHERE user_id = ?').get(userId);
            if (!user) {
                db.prepare('INSERT INTO users (user_id, currency, last_worked) VALUES (?, 5, 0)').run(userId);
                user = { user_id: userId, currency: 5, last_worked: 0 };
            }

            const currentTime = Math.floor(Date.now() / 1000);
            const cooldownDuration = 10 * 60;
            const nextAvailableTime = user.last_worked + cooldownDuration;

            if (currentTime < nextAvailableTime) {
                await interaction.reply(
                    `You can work again <t:${nextAvailableTime}:R>!`
                );
                return;
            }

            const earned = Math.floor(Math.random() * 41) + 10;
            const newBalance = user.currency + earned;

            db.prepare('UPDATE users SET currency = ?, last_worked = ? WHERE user_id = ?')
                .run(newBalance, currentTime, userId);

            await interaction.reply(
                `You worked hard and earned ${earned} currency! You now have ${newBalance} currency.`
            );
        } else if (subcommand === 'modifycurrency') {
            const adminId = '1113284520737771621';

            if (userId !== adminId) {
                await interaction.reply('You are not authorized to use this command.');
                return;
            }

            const username = interaction.options.getString('username');
            const amount = interaction.options.getInteger('amount');

            const targetUser = interaction.guild.members.cache.find(member => member.user.username === username);

            if (!targetUser) {
                await interaction.reply('User not found. Please provide a valid username.');
                return;
            }

            const targetUserId = targetUser.id;

            let user = db.prepare('SELECT * FROM users WHERE user_id = ?').get(targetUserId);
            if (!user) {
                db.prepare('INSERT INTO users (user_id, currency) VALUES (?, ?)').run(targetUserId, amount);
            } else {
                db.prepare('UPDATE users SET currency = ? WHERE user_id = ?').run(amount, targetUserId);
            }

            await interaction.reply(`User ${targetUserId} (${targetUser.user.username}) now has ${amount} currency.`);
        }
    },
};
