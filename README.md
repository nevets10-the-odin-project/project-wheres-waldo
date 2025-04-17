# Project: Where's Waldo (A Photo Tagging App)

https://www.theodinproject.com/lessons/react-new-where-s-waldo-a-photo-tagging-app

## Instructions

Build an app that, when it’s finished, will feel very similar to a photo tagging app. You’ll start with a large photograph containing several elements the user is meant to find, e.g. Waldo, The Wizard, Wilma etc. You can even name your own if you’d like to use custom pictures. The user will make selections for each character and they will be given feedback on whether they are correct or not.

To start with, you’ll need to choose a photo and identify where exactly each person is using its pixel position and save that to your database. When the user clicks the photo, it should place a targeting box around the portion of the photo the user has clicked. That box should contain a list of possible characters.

When the user selects one of these characters, you should check with your backend to see if that character is actually within the targeting box. Provide the user with appropriate feedback (e.g. if wrong, an error message). If correct, place a marker on the photo in the character’s location. In either case, remove the targeting box until the user clicks again.

Keep track of how long it takes from when the photo is first loaded to when the user finally identifies all of the characters. It is advisable to do this on the server side, otherwise the user could hack their score (but you should know this by now). Once a round is complete, ask the user for their name and record that time. This will get a bit tricky since you’ll have anonymous users you need to keep track of!

Extra credit - Load many images into your database and allow the user to select from among them before starting the game.

## Post project review

It's a little rough around the edges, but I think it turned out alright. The start was really rocky. I completely forgot about the bundling lesson, so I immediately went off the rails (ha ha. get it?) trying to find out how to use React with Rails. That was a couple days of lost time... I eventually remembered and the rest was relatively smooth.

I decided to try a different layout with the components, putting each component in their own folder along with their css file. I kinda don't like this idea. The folder names made the imports needlessly verbose. Maybe my project just isn't big enough to warrant the individual folders.

## Brainstorming

To keep things simple, I'll just use a Where's Waldo image. I would prefer to use a creative commons image, assuming Waldo is copyrighted, but I want to prioritize time. Since this is for educational purposes, I believe this would fall under fair use. I will try to avoid including images in this repo and just link to them from elsewhere instead.

I don't want to deal with timers, so I'm just going to store the start and end times in the Game table and then get the difference for the score - the length of time it took the player to complete the image. The start time will be posted when the page finished loading. The end time will be posted when the last character is found.

For the character targeting boxes, I'm thinking of just storing the opposite corner coordinates of a rectangle that encompass the character, then calculate the rectangle when a user submits an answer.

The submitted answer will follow the same logic as the character targeting box; the post request will contain the top left XY and bottom right XY of the selection. If there's any overlapping coordinates between the two boxes, it will count as finding the character. The user selection box will be some arbitrary size, like 10px.

For determining the locations of each character and where the user is clicking, I'll need to get some coordinates that are browser-size agnostic. My initial thought is to get the coordinates based off of the image itself. The image component could keep track of where the mouse is when the user clicks on the image, kind of like in an example from the React docs. This might be the hardest part of the project to get right.

### Front-end

#### Pages

1. Home page
    1. Explains project
1. Image select page
    1. List of images to play
1. Image page
    1. Specific image page
    - State: Which characters have been found
1. High score page
    1. High scores for all/specific image

- General navigation

### Database Setup

Assuming default values like ID, created date, etc.

1. Characters table
    1. Name - String
    - Has many images through coordinates
1. Image table
    1. Name - String
    1. File name - String
    - Has many characters through coordinates
    - Has many Games
1. Coordinates table
    1. Image ID - Reference
    1. Character ID - Reference
    1. start_X - Int
    1. start_Y - Int
    1. end_X - Int
    1. end_Y - Int
    - Belongs to characters, images
1. Game table
    1. Image ID - Reference
    1. Start_time - Date/time
    1. End_time - Date/time
    1. Initials - String
    - Belongs to Image