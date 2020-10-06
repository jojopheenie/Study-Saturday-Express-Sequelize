const Test = require('../db/models/test');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const tests = await Test.findAll()
    res.send(tests)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id)
    res.send(test)
  } catch (error) {
    next(error)
  }
})

router.post('/student/:studentId', async (req, res, next) => {
  try {
    let studentTest = req.body
    studentTest.studentId = req.params.studentId
    const createdTest = await Test.create(studentTest)
    res.status(201).send(createdTest)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Test.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router;
