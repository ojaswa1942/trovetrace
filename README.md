# Trove Trace
Trove Trace is an online quest-oriented puzzling contest organized under Infotsav'19, the annual techno-managerial fest of ABV-IIIT, Gwalior.

## Documenting the code
### Front End
- Made using REACT. Check package.json for used npm packages
- App.js contains Routes for and fixed components such as Nav
- All user data has been managed via states in App.js and passed down to all children components. The functions to update states declared in App.js and are passed down as props as well.
- On mount, App.js sends a request to the backend controller profilex which provides complete user data, which is then updated
- React dev tools have been disabled to prevent unfair means during the competition

#### Components:
1. Home
	- Contains the home content, calls the Login component
2. Login
	- Contained in Home component
	- Checks for session/login
3. Nav
	- Navigation bar called in App.js
	- React Router for routes, NavLink for active tab
4. Play
	- Default component when logged in
	- Checks for session/login
	- Checks for errors and constraints such as game time
	- Calls the Game Component
5. Game
	- Text/Image for question
	- Text/Image for hint on a modal
	- Calls the JMPS Component(Chatbot)
6. JMPSBot
	- For answer and providing additional hints, wherever needed
	- Functions such as handleNewUserMessage and addResponseMessage are used to manage
	- All responses except a few defined are provided by the backend
7. Rules, Contact and Rank
	- Rank component displays leaderboard
8. Lost
	- 404 Page

### Back End
- Node server using express. Check package.json for used npm packages
- All controllers fulfill different purposes
- Custom middlewares are used

#### Database
There are primarily 2 tables, players and questions.
*Schema:*

1. Players:

| Field      | Type         | Null | Key | Default           | Extra |
|------------|--------------|------|-----|-------------------|-------|
| ifid       | varchar(10)  | NO   | PRI | NULL              |       |
| name       | varchar(60)  | NO   |     | NULL              |       |
| college    | varchar(150) | NO   |     | NULL              |       |
| score      | int(11)      | NO   |     | 0                 |       |
| qid        | int(11)      | NO   |     | 1                 |       |
| hint       | int(11)      | NO   |     | 0                 |       |
| time_taken | bigint(20)   | NO   |     | 0                 |       |
| timestamp  | datetime     | NO   |     | CURRENT_TIMESTAMP |       |

2. Questions:

| Field        | Type         | Null | Key | Default | Extra |
|--------------|--------------|------|-----|---------|-------|
| qid          | int(11)      | NO   | PRI | NULL    |       |
| question     | varchar(300) | NO   |     | NULL    |       |
| img          | int(11)      | NO   |     | 0       |       |
| img_url      | varchar(100) | YES  |     | NULL    |       |
| hint         | varchar(150) | NO   |     | NULL    |       |
| hint_img     | int(11)      | NO   |     | 0       |       |
| hint_img_url | varchar(150) | YES  |     | NULL    |       |

#### Controllers:
1. signin
	- Uses the accounts made on the [main Infotsav website](https://www.infotsav.in)
	- Uses the Infotsav database for login
	- Tables: Credentials, Users
	- Issue a JWT encoded cookie on success
2. score
	- Provides leaderboard
3. newGame
	- Used for initial registration (after login), registers user by entering user data into players
4. chatbot
	- Checks for answer and hints as needed, corresponding to each question and sends valid response
5. hint (Not in use)
	- Provide hints
	- Can be used when points are needed to be deducted for each hint request
6. lost
	- update 404 fire count

#### Middlewares:
1. withAuth
	- Checks if a cookie is provided or not
	- Success: Response status 200
	- Used to verify login
2. profilex
	- Checks if a cookie is provided or not
	- Success: Send complete game information about that user, so that states can be updated on the front end
3. timeCheck
	- Used to implement time boundations
	- Send error if actions are taken outside time boundaries.