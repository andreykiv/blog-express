const express = require('express')
const Post = require('../models/post')
const router = new express.Router()


//create a post
router.post('/posts', async (req, res) => {
    const post = new Post(req.body)
    try {
        await post.save()
        res.status(201).redirect('/')
    } catch (e) {
        res.status(400).send(e)
    }
})
//get all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({})
        res.send(posts)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/posts/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const post = await Post.findById(_id)

        if (!post) {
            return res.status(404).send()
        }

        res.send(post)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/posts/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'snippet', 'body']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!post) {
            return res.status(404).send()
        }

        res.send(post)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)

        if (!post) {
            res.status(404).send()
        }

        res.send(post)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router

