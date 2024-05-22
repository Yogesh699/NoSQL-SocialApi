
# Social media Api

Welcome to the Social Media API, a powerful tool for building social media applications. This API provides access to a wide range of social media platforms, allowing you to retrieve and manipulate data


## Features

- Data retrieval: Get user data, posts, comments, likes, and more
- Data manipulation: Create, update, and delete posts, comments, and other data


## Technology

- Mongo db
- Express
- Nodejs


## Api

#### GET APIs:

- /api/v1/users/  - getAlluser
- /api/v1/thought/ - getAllThoughts
- /api/v1/thought/id - getThoughts
- /api/v1/users/id - getUser
- /api/v1/users/id/friends - getUserFriends

#### POST APIs:

- /api/v1/users/ - createUser
- /api/v1/thought/ - createThoughts
- /api/v1/users/id/friends/ - createUserFriends
- /api/v1/thought/id/reactions - createReaction
#### PUT APIs:
- /api/v1/thought/id - updateThoughts
- /api/v1/users/id - updateUser

#### DELETE APIs:
- /api/v1/thought/id - deleteThoughts
- /api/v1/thought/id/reactions/id - deleteReaction
- /api/v1/users/id/friends/id - deleteUserFriends
- /api/v1/users/id/ - DeletUser

  ## Video Link
[link](https://drive.google.com/file/d/1AJR7VcNe_TPiQXaNW1A7HF41JARFJXMP/view?usp=drive_link)
