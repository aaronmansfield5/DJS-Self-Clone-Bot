const {
    Client
} = require('discord.js-selfbot-v13')
require('dotenv').config();

const client = new Client({
    checkUpdate: false
})

function wait(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}

async function edit(message, content, rewrite = true) {
    const slowmode = message.channel.rateLimitPerUser;
    let newM;
    if (slowmode > 0) {
        await wait(slowmode + 1.5)
        rewrite ? newM = await message.channel.send(content) : newM = await message.channel.send(`${message.content}\n${content}`);
    } else {
        rewrite ? newM = await message.channel.send(content) : newM = await message.channel.send(`${message.content}\n${content}`);
    }
    await message.delete();
    return newM;
}

client.once('ready', async (bot) => {
    console.log(`Self-bot applied to ${bot.user.tag}`)
})

client.on('messageCreate', async (message) => {
    if (message.author.id === client.user.id) {
        if (message.content === ".clone" || message.content === ".copy") {
            if (message.channel.type == "DM") {
                message = await edit(message, `\`\`\`ansi\n> [1;2m[2;31mCannot Clone DM Channel [0m\`\`\``)
            } else if (message.guild) {
                message = await edit(message, `\`\`\`ansi\n> [1;2m[2;34mCloning Server [0m\`\`\``)
                const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position);
                const channels = message.guild.channels.cache;
                const newGuild = await client.guilds.create(message.guild.name);

                const deletePromises = newGuild.channels.cache.map(ch => {
                    if (ch.id != "0") return ch.delete();
                    else return Promise.resolve();
                });
                await Promise.all(deletePromises);

                for (const channel of channels.values()) {
                    if (channel.type === "GUILD_CATEGORY") {
                        await newGuild.channels.create(channel.name, {
                            type: channel.type,
                            position: channel.position
                        });
                    }
                }

                for (const channel of channels.values()) {
                    if (channel.type !== "GUILD_CATEGORY" && channel.type !== "GUILD_NEWS") {
                        if (!channel.parentId) {
                            await newGuild.channels.create(channel.name, {
                                type: channel.type,
                                position: channel.position
                            });
                        } else {
                            const parentChannel = channels.find(ca => ca.id === channel.parentId);
                            const newParentId = newGuild.channels.cache.find(c => c.name === parentChannel.name).id;
                            await newGuild.channels.create(channel.name, {
                                type: channel.type,
                                parent: newParentId,
                                position: channel.position
                            });
                        }
                    } else if (channel.type === "GUILD_NEWS") {
                        message = await edit(message, `\`\`\`ansi\n⨯ [1;2m[2;31mCannot Clone ${channel.name} [0m\`\`\``, false);
                    }
                }

                let roleMap = new Map();
                for (const role of roles.values()) {
                    if (!role.managed) {
                        const newRole = await newGuild.roles.create({
                            name: role.name,
                            color: role.color,
                            permissions: role.permissions,
                            mentionable: role.mentionable
                        });
                        roleMap.set(role.id, newRole);
                    }
                }

                for (const [oldRoleId, newRole] of roleMap.entries()) {
                    const oldRole = roles.get(oldRoleId);
                    await newRole.setPosition(oldRole.position).catch(console.error);
                }

                message = await edit(message, `\`\`\`ansi\n✓ [1;2m[2;32m${message.guild.name} was successfully cloned! [0m\`\`\``, false);

            } else {
                message = await edit(message, `\`\`\`ansi\n> [1;2m[2;31mError Cloning Server [0m\`\`\``)
            }
        }
    }
})

client.login(process.env.TOKEN)