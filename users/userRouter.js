const express = require('express');

const userDb = require('./userDb')

const router = express.Router();

router.post('/', validateUserPost, async (req, res) => {
  try {
    const user = await userDb.insert(req.body)

    res.status(200).json(user)
  } catch (error) {
    res.status(404).status(error.message)
  }

});

router.post('/:id/posts', async (req, res) => {
  
  try {
    const user = await userDb.insert({text: req.body, hub_id: req.params})

    res.status(200).json(user)
  } catch (error) {
    res.status(404).status(error.message)
  }

});

router.get('/', async (req, res) => {
  // do your magic!
  try {
    const users = await userDb.get()

    res.status(200).json(users)
  } catch (error) {
    res.status(404).status(error.message)
  }

});

router.get('/:id', validateUserId, (req, res) => {
   res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  
  try {

    const userPosts = await userDb.getUserPosts(req.id)

    res.status(200).json(userPosts)

  } catch (error) {
    res.status(404).json(error.message)
  }

});

router.delete('/:id', validateUserId, async (req, res) => {
 
  try {

    const postRemove = await userDb.remove(req.id)

    res.status(200).json(postRemove)

  } catch (error) {
    res.status(404).json(error.message)
  }

});

router.put('/:id',validateUserId, validateUser, async (req, res) => {
  
  try {

    const postUpdate = await userDb.update(req.id, req.body)

    res.status(200).json(postUpdate)

  } catch (error) {
    res.status(404).json(error.message)
  }

});

//custom middleware

async function validateUserId(req, res, next) {

  const {id} = req.params

  const user = await userDb.getById(id)

  try {

    if(!user) {
      res.status(404).json({
        message: 'no user found'
      })
    } else {
      req.id = id
      req.user = user
      next()
    }
  } catch(error) {
    res.status(404).json(error.message)
  }

  
}

function validateUser(req, res, next) {
  
  const {name} = req.body

  if(!name) {
    res.status(400).json({
      message: 'name is required'
    })
  } else {
    req.name = name
    next()
  }

}

function validatePost(req, res, next) {

  const { text } = req.body

  if(!text) {
    res.status(400).json({
      message: 'text is required'
    })
  } else {
    next()
  }
}

function validateUserPost(req, res, next) {

  const { name } = req.body

  if(!name) {
    res.status(400).json({
      message: 'name is required'
    })
  } else {
    next()
  }
}

module.exports = router;
