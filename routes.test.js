const io = require('socket.io-client');
const request = require('supertest');
const GameServer = require('backend/js/GameServer');
const GameRoom = require('backend/js/GameRoom');
const { GAMES, GAME_TYPES } = require('backend/helpers/serverConstants');

const app = require('./app');

describe('Routes tests', () => {
  afterEach(() => {
    GAMES.clear();
  });

  describe('POST game', () => {
    const createGameTest = async (type) => {
      const urlParam = type === GAME_TYPES.MULTI ? 'multi' : 'single';

      expect(GAMES.size).toBe(0);

      const response = await request(app).post(`/games/${urlParam}`);

      expect(response.statusCode).toBe(201);
      expect(response.body.gameId).toEqual(expect.any(String));

      expect(GAMES.size).toBe(1);
      expect(GAMES.get(response.body.gameId)).toEqual(expect.any(GameRoom));
      expect(GAMES.get(response.body.gameId).gameType).toBe(type);
    };

    test('creates new game with uniqid - multiplayer', createGameTest.bind(null, GAME_TYPES.MULTI));

    test('creates new game with uniqid - single player', createGameTest.bind(null, GAME_TYPES.SINGLE));
  });

  describe('GET game', () => {
    test('gets an existing multiplayer game', async () => {
      const gameId = GameServer.addGame(GAME_TYPES.MULTI);

      expect(GAMES.size).toBe(1);

      const response = await request(app).get(`/games/multi/${gameId}`);

      expect(response.statusCode).toBe(200);

      expect(response.body.gameId).toBe(gameId);
    });

    test('error - game does not exist', async () => {
      const gameId = 1;

      expect(GAMES.size).toBe(0);

      const response = await request(app).get(`/games/multi/${gameId}`);

      expect(response.statusCode).toBe(404);

      expect(response.body.error).toEqual(expect.any(String));
    });

    test('error - game is not multiplayer', async () => {
      const gameId = GameServer.addGame(1, GAME_TYPES.SINGLE);

      expect(GAMES.size).toBe(1);

      const response = await request(app).get(`/games/multi/${gameId}`);

      expect(response.statusCode).toBe(404);

      expect(response.body.error).toEqual(expect.any(String));
    });
  });

  describe('WS tests', () => {
    let socket;

    const initSocket = (gameId) => new Promise((resolve, reject) => {
      socket = io('http://localhost:3000/game', {
        query: `gameId=${gameId || ''}`,
        'reconnection delay': 0,
        'reopen delay': 0,
        'force new connection': true,
      });

      socket.on('message', () => {
        resolve(socket);
      });

      setTimeout(() => reject(new Error('failed to connect')), 5000);
    });

    const destroySocket = (socket) => new Promise((resolve, reject) => {
      if (socket.connected) {
        socket.disconnect();
        resolve(true);
      }

      resolve(false);
    });

    beforeAll(() => {
      app.listen(3000);
    });

    afterAll(() => {
      app.close();
    });

    afterEach(() => {
      GAMES.clear();
      destroySocket(socket);
    });

    test('successfully connects', async () => {
      const id = GameServer.addGame(GAME_TYPES.MULTI);
      const socket = await initSocket(id);
      expect(socket).toEqual(expect.any(Object));
    });
  });
});
