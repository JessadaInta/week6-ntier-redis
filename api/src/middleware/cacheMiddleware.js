const { getCache } = require('../config/redis');

const cacheMiddleware = (keyGenerator) => {
    return async (req, res, next) => {
        try {
            const key = keyGenerator(req);
            const cachedData = await getCache(key);

            if (cachedData) {
                console.log('🟢 CACHE HIT');

                // ✅ เพิ่ม Header
                res.set('X-Cache-Status', 'HIT');

                return res.status(200).json(cachedData);
            }

            console.log('🔴 CACHE MISS');

            // ✅ ใส่ header ไว้ก่อน (จะถูกส่งตอน controller ตอบกลับ)
            res.set('X-Cache-Status', 'MISS');

            next();

        } catch (err) {
            console.error('Cache middleware error:', err);

            // ถ้า cache พัง ให้ถือว่า MISS
            res.set('X-Cache-Status', 'MISS');
            next();
        }
    };
};

module.exports = cacheMiddleware;