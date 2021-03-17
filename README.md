Starter# Laughs

<p align='left'>
    <img src="https://pair-yo-pet-aws.s3-us-west-1.amazonaws.com/pyp-logo-cropped.png">
</p>

[![Contributors](https://img.shields.io/github/contributors/markhv-code/pair-yo-pet)](https://www.github.com/markhv-code/pair-yo-pet/contributors)
[![Open Issues](https://img.shields.io/github/issues/markhv-code/pair-yo-pet)](https://www.github.com/markhv-code/pair-yo-pet/issues)
[![Forks](https://img.shields.io/github/forks/markhv-code/pair-yo-pet)](https://www.github.com/markhv-code/pair-yo-pet/forks)
[![Stars](https://img.shields.io/github/stars/markhv-code/pair-yo-pet)](https://www.github.com/markhv-code/pair-yo-pet/stars)

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
- Vanilla CSS
- Node.js
- AWS S3
- Docker
- Heroku

## Live Site

[Here's](https://pairyopet.herokuapp.com/) a link to our live app!

## Documentation

[Here's](https://github.com/markhv-code/pair-yo-pet/wiki/) a link to our Wiki!

## Features

Users can:

- Add a pet
- Update their pets
- Browse open pets and choose to connect
- Message other owners
- Search for specific pets based on name, state, and city

## Best Code Snippets

This was how we initialized conversations for user on the `/messages` route.

```js
// filter for all messages from or to logged in user
const msgsArray = Object.values(allMsgs);
const allMsgsLgdInUser = msgsArray.filter(
  (message) =>
    message.senderId === lgdInUser.id || message.receiverId === lgdInUser.id
);

// filter again for all messages between logged in user and other user (chosen user)
const allMsgsWOtherUser = allMsgsLgdInUser.filter((message) => {
  const idToCheck = otherUser.id;
  return message.senderId === idToCheck || message.receiverId === idToCheck;
});
```

```js
// Find all users (only once) that the logged in user has had cnv with
const set = new Set();
const cnvUserIdArr = [];

for (let i = allMsgsLgdInUser.length - 1; i > 0; i--) {
  let msg = allMsgsLgdInUser[i];
  const idToAdd = msg.senderId === lgdInUser.id ? msg.receiverId : msg.senderId;
  if (!set.has(idToAdd)) cnvUserIdArr.push(idToAdd);
  set.add(idToAdd);
}

const cnvUsers = [];
cnvUserIdArr.forEach((id) => cnvUsers.push(allUsers[id]));
if (cnvUsers.length === 0) cnvUsers.push({ username: 'No message history' });
```

For our search feature we needed to connect each pet with the location of their owner for location based searching.

```py
owner = db.relationship("User", back_populates="pets")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "name": self.name,
            "petType": self.petType,
            "age": self.age,
            "imageURL": self.imageURL,
            "energy": self.energy,
            "social": self.social,
            "behaved": self.behaved,
            "size": self.size,
            "env": self.env,
            "description": self.description,
            "owner": self.owner.to_dict()
        }
```

Here we implement the database connection in the search file with a `useEffect`.

```js
useEffect(() => {
  setFilteredPets(
    petsFromStore.filter(
      (pet) =>
        pet.name.toLowerCase().includes(search.toLowerCase()) ||
        pet.petType.toLowerCase().includes(search.toLowerCase()) ||
        pet.owner.city.toLowerCase().includes(search.toLowerCase()) ||
        pet.owner.stateAbbr.toLowerCase().includes(search.toLowerCase())
    )
  );
}, [search]);
```
