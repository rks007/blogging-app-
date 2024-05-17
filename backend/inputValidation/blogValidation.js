const zod = require('zod');

const blogInput = zod.object({
    title: zod.string().min(3),
    description: zod.string().min(8)
})

module.exports = blogInput;