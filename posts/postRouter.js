const express = require('express');

const router = express.Router();

const postDb = require('./postDb')


router.get('/', async (req, res) => {
  try {
    const users = await postDb.get()

    res.status(200).json(users)
  } catch (error) {
    res.status(404).status(error.message)
  }
});

router.get('/:id', validatePostId , (req, res) => {
  res.status(200).json(req.user)
});

router.delete('/:id', validatePostId, async (req, res) => {
  try {

    const postRemove = await postDb.remove(req.id)

    res.status(200).json(postRemove)

  } catch (error) {
    res.status(404).json(error.message)
  }
});

router.put('/:id', validatePostId, async (req, res) => {

  try {

    const postUpdate = await postDb.update(req.id, req.body)

    res.status(200).json(postUpdate)

  } catch (error) {
    res.status(404).json(error.message)
  }

});

// custom middleware

async function validatePostId (req, res, next) {

  const {id} = req.params

  const post = await postDb.getById(id)

  try {

    if(!post) {
      res.status(404).json({
        message: 'no user found'
      })
    } else {
      req.id = id
      req.user = post
      next()
    }
  } catch(error) {
    res.status(404).json(error.message)
  }

}

module.exports = router;
