# Instructions

### For running in development

- Clone Git repo
- Switch to directory if not in correct directory
- `npm install`
- `npm run dev`

### Assumptions

- Only 1 robot can exist on a board at a time
- Once a robot is placed it can, place function is disabled and cannot be used again. Unless user resets the game.
- use left(), right(), move() for navigation
- Incorrect moves are not logged for example a move() that will lead the robot outside the board will not be logged
- place(x,y,direction) works even with 'north' or north. However double qoutes aren't considered, the document didn't have any conditions for it. Though it can easily be added, just a simple replace method on the string during sanitization.

### Decisions (design, technology)

- Vite-react template used
- Tailwind css
- Lucide-React(ONLY for one ICON)
- vitest for testing
- localStorage for storing game

### Future-goals

- Will deploy on github pages
- Add a system that spawns orbs at random time intervals on the board which will vanish. Once robot reaches the orb we incrememnt score and not reaching orbs decrement score. The game will become a challenge of typing speed.
