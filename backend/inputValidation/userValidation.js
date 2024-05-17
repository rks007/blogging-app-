const zod = require('zod');

const userInput = zod.object({
    username: zod.string().email(),
    password: zod.string().min(4),
    firstName: zod.string().min(3).optional(),
    lastName: zod.string().min(3).optional()
})


module.exports = userInput;