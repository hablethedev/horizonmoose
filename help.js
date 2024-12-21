const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays a list of available commands.',
    execute(message, args) {
        // Create a new embed
        const helpEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Help')
            .setDescription('List of available commands')
            .addFields(
                { name: '/help', value: 'Displays this message' },
                { name: '/vsauce', value: 'Sends a vsauce intro mp4.' },
                { name: '/gamble', value: 'Go gambling!' },
                { name: '/cats', value: 'Get a random neko from nekos.best' },
                // Add more commands as needed
            )
            .setFooter('Bot by Hazel');

        // Send the embed to the same channel as the message
        message.channel.send({ embeds: [helpEmbed] });

        // Create a new webhook client
        const webhookClient = new WebhookClient({ id: 'webhook-id', token: 'webhook-token' });

        // Send a message using the webhook
        webhookClient.send({
            content: 'Help',
            username: 'horizonmoose',
            avatarURL: 'https://i.imgur.com/AfFp7pu.png', // change this to the png of it
            embeds: [helpEmbed],
        });
    },
};
