import { useState, useEffect } from "react";
import useFetchRepeatedly from "./useFetchRepeatedly";
import _ from "lodash";

const createBoard = ({ width, height, bots, gameObjects, diamonds }) => {
  const rows = [];
  for (let y = 0; y < height; y++) {
    rows.push([]);
    for (let x = 0; x < width; x++) {
      rows[y][x] = {};
    }
  }

  // Insert bots into board
  bots.forEach(bot => {
    rows[bot.position.y][bot.position.x] = {
      ...rows[bot.position.y][bot.position.x],
      botName: bot.name
    };
    rows[bot.base.y][bot.base.x] = {
      ...rows[bot.base.y][bot.base.x],
      base: bot.name
    };
  });

  // Insert diamonds into board
  diamonds.forEach(diamond => {
    rows[diamond.y][diamond.x] = {
      ...rows[diamond.y][diamond.x],
      diamond: true,
      points: diamond.points
    };
  });

  // Insert gameObjects into board
  gameObjects.forEach(go => {
    rows[go.position.y][go.position.x] = {
      ...rows[go.position.y][go.position.x],
      goName: go.name,
      go: true
    };
  });

  return rows;
};

export default (url, delay) => {
  const [rows, setRows] = useState([[]]);
  const [bots, setBots] = useState([]);
  const boardData = useFetchRepeatedly(url, delay, {});

  useEffect(() => {
    if (!_.isEmpty(boardData)) {
      setRows(createBoard(boardData));
      setBots(boardData.bots);
    }
  }, [boardData]);

  return [rows, bots];
};
