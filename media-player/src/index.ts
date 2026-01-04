import { MediaPlayer } from "./MediaPlayer";

const player = new MediaPlayer();

player.play();   // Play from beginning
player.pause(); // Pause
player.play();  // Resume
player.stop();  // Stop
player.pause(); // Invalid action
