const rateLimit = require('express-rate-limit');
const memoryStore = new Map();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  keyGenerator: (req) => req.headers['x-api-key'] || req.ip,
  handler: (req, res) => {
    res.status(429).json({ error: 'Too many requests, please try again later.' });
  },
  store: {
    increment: (key, cb) => {
      const entry = memoryStore.get(key) || { total: 0 };
      entry.total += 1;
      memoryStore.set(key, entry);
      cb(null, entry.total);
    },
    decrement: (key) => {
      const entry = memoryStore.get(key);
      if (entry) {
        entry.total -= 1;
        if (entry.total <= 0) {
          memoryStore.delete(key);
        } else {
          memoryStore.set(key, entry);
        }
      }
    },
    resetKey: (key) => {
      memoryStore.delete(key);
    },
    resetAll: () => {
      memoryStore.clear();
    },
  },
});

module.exports = rateLimiter;
