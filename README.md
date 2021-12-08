# Getting Started with NC Games

NC Games is a social games content rating, and discussion website.

## Front-end app

- Published app [_here_](https://brave-khorana-429f41.netlify.app).
- Front-end repo [_here_](https://github.com/cjpearson85/fe-nc-games).

## Back-end API

- Hosted API [_here_](https://nc-games-chris.herokuapp.com/api).
- Back-end repo [_here_](https://github.com/cjpearson85/be-nc-games).

## Table of Contents

- [Requirements](#requirements)
- [Features](#features)
- [Screenshots](#screenshots)
- [Local Installation](#local-installation)
- [Usage](#usage)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Contact](#contact)

## Requirements

- Node v16.0.0

## Features

- Users & guests can view a list of user reviews, most recent first by default.
- Reviews can filtered by category and sorted by most likes or comments.
- A search term can be entered to partially match against a review title.
- Authorised users can post new reviews - guests will be prompted to log in or register.
- Users & guests can navigate to a more detailed review that contains more infomation-aswell as any associated comments.
- From here authorised users can upvote a review or comment (users cannot upvote their own) and post a new comment - guests will be prompted to log in or register.
- Users & guests can view another user's profile page, along with a list of their recent posts.
- Users can delete any of their reviews or comments.

## Local Installation

To run this project, install it locally using npm:

```
$ git clone https://github.com/cjpearson85/fe-nc-games.git
$ cd fe-nc-games
$ npm install
$ npm start
```

## Usage

Once the dependencies are installed, you can run 'npm start' to start the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Many features of the site - such as posting reviews & comments - require an account. Either make your own at [http://localhost:3000/register](http://localhost:3000/register), or log in at [http://localhost:3000/login](http://localhost:3000/login) with the following credentials:

Username: jessjelly
Password: secure123

## Project Status

Project is: _in progress_.

## Room for Improvement

Room for improvement:

- User should be able to edit their existing reviews - backend already allows this.
- User should be able to edit their existing comments - backend already allows this.
- Likes should be tied to users in the db, so they can't vote more than once across sessions.
- Flesh out the user profiles - eg. bio, favourite game, etc.
- Dark mode

## Contact

Created by [@cjpearson85](https://cjpearson-dev.netlify.app/) - feel free to contact me!
