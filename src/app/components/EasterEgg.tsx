// components/EasterEgg.tsx
"use client";

import { useEffect, useRef } from "react";

/*
  Idea for Enhancement:
  ---------------------
  Let's expand the EasterEgg component by creating an array of different ASCII art memes.
  Each time the page loads, we can randomly select one meme from the array to display in the console.
  This will add variety and a fun element of surprise for anyone checking the console logs.

  Implementation Steps:
  - Create an array containing multiple ASCII art strings.
  - Use a randomization function (e.g., Math.random()) to select one meme from the array.
  - Update the console.log() statement to output the selected meme.
  - Ensure that the selected meme is displayed only once per page load, even in development mode with React's StrictMode.

  This collection now includes a mix of sarcastic, self-ironic, and quantum-themed memes.
*/

export default function EasterEgg() {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      const asciiArts = [
        // Added your provided meme
        `
When you're debugging quantum code:

     _____________
    |             |
    |  It works   |
    |   and it    |
    | doesn't work|
    |    at the   |
    | same time!  |
    |_____________|

        (╯°□°）╯︵ ┻━┻

          
          ___________________________
          ( Dude, it's Schrödinger's  )
          (         code!             )
           ---------------------------
                 \\
     O            O
    /|\\          /|\\
    / \\          / \\
        `,
        // Existing memes
        `
When you finally fix a bug at 3 AM:

        (╯°□°）╯︵ ┻━┻

        ┬─┬ノ( º _ ºノ)

"Time to break something else!"
        `,
        `
Welcome to programming:

        ───────▄▀▀▀▀▀▀▀▄
        ────▄▀▀░░░░░░░░░▀▄
        ──▄▀░░░░░░░░░░░░░░▀▄
        ──█░░░░░░░░░░░░░░░░░█
        ──█░░░░░░░░░░░░░░░░░█
        ──█░░░░░░░░░░░░░░░░░█
        ──█░░░░░░░░░░░░░░░░░█
        ──█░░░░░░░░░░░░░░░░░█
        ──█░░░░░░░░░░░░░░░░░█
        ──▀▄░░░░░░░░░░░░░░░▄▀
        ────▀▀▄░░░░░░░░░▄▀▀
        ───────▀▀▀▀▀▀▀▀▀

"Abandon all hope, ye who enter here."
        `,
        `
On discovering the code works on the first try:

        ┌( ಠ_ಠ)┘
        ┌( ಠ‿ಠ)┘
        ┌(◕‿◕)┘

"Clearly, there's a hidden bug."
        `,
        `
Schrödinger's code:

        _____________
       |             |
       |   It works  |
       |   and it    |
       | doesn't work|
       |    at the   |
       |  same time! |
       |_____________|

"Observing it only makes it worse."
        `,
        `
Quantum debugging:

"I have no idea what I'm doing, but if I look away, it might fix itself."

        ( •_•)
        ( •_•)>⌐■-■
        (⌐■_■)

"Just kidding, time to print all the things."
        `,
        `
The universe according to a developer:

"In the beginning, there was nothing.

Then it exploded."

        (╯°□°）╯︵ ɹǝpɹɐƆ ɹǝʌo

"Oops, wrong branch."
        `,
        `
Dealing with legacy code:

        (╯°□°)╯︵ ┻━┻

"Why fix it when you can rewrite it?"

        ┬─┬ ノ( ゜-゜ノ)

"Wait, it's in production? Never mind."
        `,
        `
Optimist: The glass is half full.

Pessimist: The glass is half empty.

Programmer: The glass is twice as big as it needs to be.

        (⌐■_■)

"Time to refactor the glass."
        `,
        `
Quantum superposition:

        There are 2 types of people:

        Those who understand quantum physics.

        And those who don't.

        And those who both do and don't.

"Wait, that's three? Exactly."
        `,
        // Additional darker humor and quantum-themed memes
        `
When you look for the bug for hours, only to realize it's a quantum fluctuation:

        (╯°□°）╯︵ ┻━┻

        ┬─┬ ノ( ゜-゜ノ)

"Maybe the bug fixed itself... or did it?"
        `,
        `
Trying to measure the state of your code:

Schrödinger's Bug: Exists and doesn't exist until you check.

        ┌( ಠ_ಠ)┘

"Observation causes manifestation... of more bugs."
        `,
        `
When your code's uncertainty principle kicks in:

"The more precisely I fix one bug, the less certain I am about the rest of the code."

        (ノಠ益ಠ)ノ彡┻━┻

"Welcome to quantum coding."
        `,
        `
Entangled codebases:

"Touch one part, and another breaks instantaneously."

        (¬_¬")

"Spooky action at a distance."
        `,
        `
Facing the void:

"Gaze long into your code, and the code will gaze back into you."

        (⊙_⊙)

"Beware of infinite loops."
        `,
        `
Quantum tunneling through deadlines:

"I'll meet the deadline... if I can tunnel through the workload."

        ¯\\_(ツ)_/¯

"Reality is non-deterministic anyway."
        `,
        `
Superposition of deadlines:

"The project is both on schedule and delayed until you check."

        (•_•)

        ( •_•)>⌐■-■
         
        (⌐■_■)

"Better not to look."
        `,
        `
When debugging feels like a multiverse:

"In some universe, this code works."

        (╯︵╰,)

"Too bad we're not in that one."
        `,
        `
Black hole of bugs:

"The more code I write, the stronger the gravitational pull of bugs."

        (✖﹏✖)

"Not even tests can escape."
        `,
        `
Quantum immortality of legacy code:

"No matter how many times we try to replace it, it still exists."

        (ಠ_ಠ)

"Maybe it's time to accept our fate."
        `,
        `
Heisenbug:

"A bug that disappears or alters its behavior when one attempts to probe or isolate it."

        (⊙﹏⊙)

"Just look away..."
        `,
        `
Quantum entanglement in teams:

"When one developer is stuck, everyone feels it."

        (－‸ლ)

"Collective debugging is the only solution."
        `,
        `
The quantum leap:

"Tried to optimize the code, ended up in an entirely different state."

        (ノдヽ)

"There's no going back."
        `,
        `
The code uncertainty:

"I don't always know what my code does, but when I do, it changes."

        (ಥ﹏ಥ)

"Embrace the chaos."
        `,
        `
Programming in dark matter:

"90% of the code does nothing, but you can't see which 90%."

        (¬_¬)

"Invisible, yet influential."
        `
      ];

      const randomIndex = Math.floor(Math.random() * asciiArts.length);
      const selectedArt = asciiArts[randomIndex];

      console.log(selectedArt);
      hasRun.current = true;
    }
  }, []);

  return null;
}
