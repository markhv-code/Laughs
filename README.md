# Laughs

<p align='left'>
    <img src="https://pairyopet.s3-us-west-1.amazonaws.com/pyp-logo-cropped.png">
</p>

[![Contributors](https://img.shields.io/github/contributors/markhv-code/Laughs)](https://www.github.com/markhv-code/Laughs/contributors)
[![Open Issues](https://img.shields.io/github/issues/markhv-code/Laughs)](https://www.github.com/markhv-code/Laughs/issues)
[![Forks](https://img.shields.io/github/forks/markhv-code/Laughs)](https://www.github.com/markhv-code/Laughs/forks)
[![Stars](https://img.shields.io/github/stars/markhv-code/Laughs)](https://www.github.com/markhv-code/Laughs/stars)

## What is it?

Laughs is a web web app built to be a social platform for sharing jokes and connecting with others!

## Developing

To run this application locally, you'll need to:

1. `git clone` this repo
2. `cd` into the local repo
3. `pipenv install` to install the backend dependencies
4. Create a `.env` file based on the `.env.example` file included in the repo with your own values
5. Create a user on your local machine with the username and password specified in your `.env` file in PostgreSQL
6. Create a database on your local machine with the name specified in your `.env` file in PostgreSQL
7. Go into the pipenv shell with `pipenv shell`
8. Run `flask db upgrade` to run the migrations
9. Run `flask seed all` to seed the database
10. Open another terminal and cd into the `react-app` directory and run `npm install` to install frontend dependencies
11. Create your own `.env` file in the `react-app` directory based on the `.env.example` there
12. Start your Flask backend in the terminal that's in the root of the local project with `flask run`
13. Finally, start the frontend server with `npm start` inside the `react-app` directory. The application should automatically open in your default web browser.
14. If you desire further modifications simply create a new branch and `git push` your changes to Github.

## Technologies Used

- Python
- PostgreSQL
- SQLAlchemy
- Flask
- WTForms
- React
- Redux
- JavaScript
- TailWindCSS
- Node.js
- AWS S3
- Docker
- Heroku


## Live Site

[Here's](https://laughs-app.herokuapp.com/) a link to our live app!

## Documentation

[Here's](https://github.com/markhv-code/Laughs/wiki/) a link to our Wiki!

## Features

Users can:

- Post a joke
- Update their joke
- Browse jokes and comment on jokes
- Message others
- Search for specific jokes



