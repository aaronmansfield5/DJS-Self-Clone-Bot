
# DJS Self Clone Bot

![GitHub repo size](https://img.shields.io/github/repo-size/aaronmansfield5/DJS-Self-Clone-Bot)
![GitHub contributors](https://img.shields.io/github/contributors/aaronmansfield5/DJS-Self-Clone-Bot)
![GitHub stars](https://img.shields.io/github/stars/aaronmansfield5/DJS-Self-Clone-Bot)
![GitHub forks](https://img.shields.io/github/forks/aaronmansfield5/DJS-Self-Clone-Bot)

DJS Self Clone Bot is a Discord self-bot that allows users to clone Discord servers using `.clone` or `.copy` commands. This bot is built using Discord.js and is designed for personal use.

**Disclaimer:** Self-bots are generally against Discord's Terms of Service. Using self-bots can lead to account suspension. Use at your own risk.

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed the latest version of [Node.js](https://nodejs.org/).
* You have a Discord account.

## Installation

To install DJS Self Clone Bot, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/aaronmansfield5/DJS-Self-Clone-Bot.git
   ```
2. Navigate to the bot directory:
   ```bash
   cd DJS-Self-Clone-Bot
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. **Getting Your Discord Token:**
   - Open Discord and go to User Settings.
   - Open the 'Appearance' tab, scroll down, and enable Developer Mode.
   - Press `Ctrl` + `Shift` + `I` (Cmd + Option + I on Mac) to open the Developer Tools.
   - Go to the 'Network' tab.
   - Reload Discord with `Ctrl` + `R` (Cmd + `R` on Mac).
   - Type `/api` in the filter box and look for a request that starts with `science`.
   - Click on it, go to the 'Headers' tab, and find the 'authorization' header.
   - Copy the token value. This is your Discord token. **Do not share this with anyone.**

2. **Setting Up .env File:**
   - Create a `.env` file in the root directory of the bot.
   - Add the following line:
     ```
     TOKEN=Your_Discord_Token
     ```
   - Replace `Your_Discord_Token` with the token you obtained from Discord.

## Running the Bot

To run DJS Self Clone Bot, execute:

```bash
node app.js
```

Or use the provided batch script:

```bash
./run.bat
```

## Contributing to DJS Self Clone Bot

To contribute to DJS Self Clone Bot, follow these steps:

1. Fork the repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`.
4. Push to the original branch: `git push origin <project_name>/<location>`.
5. Create the pull request.

Alternatively, see the GitHub documentation on [creating a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).
