// Third party
import { Router } from 'express';
// Local
import GameLogs from '../models/gameLog.js';

const router = Router();

// Append gameLog to user history
router.post('/:id', getGameLogs, async (req, res) => {
  const gameLog = buildGameLogObject(req);
  console.log(gameLog);
  // Append game to gameList
  let gameLogs = res.gameLogs;
  gameLogs.history.push(gameLog);

  try {
    const updated = await gameLogs.save();
    console.log(`update: ${updated}`);
    res.status(201).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// method that returns the history of a given user
async function getGameLogs(req, res, next) {
  try {
    gameLogs = await GameLogs.findOne({ userId: req.params.id });
    if (gameLogs == null) {
      return res.status(404).json({ message: `Can't find game logs. Sorry.` });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.gameLogs = gameLogs;
  next();
}

function buildGameLogObject(req) {
  const obj = req.body;
  return {
    gameId: obj.bggId,
    gameTitle: obj.title,
    players: obj.selectedFriends,
    type: obj.type ? obj.type : 'N/A',
    outcome: obj.outcome ? obj.outcome : 'N/A',
    datePlayed: obj.myDate ? obj.myDate : new Date(),
  };
}

export default router;
