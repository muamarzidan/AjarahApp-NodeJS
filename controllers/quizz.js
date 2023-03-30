const db = require('../models')
const Quiz = db.kuiz

// Create and Save a new Quiz
exports.create = (req, res) => {
    // Validate request
    if (!req.body.quiz) {
        res.status(400).send({
            message: 'Content can not be empty!'
        })
        return
    }

    // Create a Quiz
    const quiz = {
        quiz: req.body.quiz,
        options: req.body.options,
        key: req.body.key,
        categoryId: req.body.categoryId,
        levelId: req.body.levelId
    }



    // Save Quiz in the database
    Quiz.create(quiz)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Quiz.'
            })
        })
}

// Retrieve all Quizzes from the database.
exports.findAll = (req, res) => {
    Quiz.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving quizzes.'
            })
        })
}

// Find a single Quiz with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    Quiz.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving Quiz with id=' + id
            })
        })
}

// Update a Quiz by the id in the request
exports.update = (req, res) => {
    const id = req.params.id

    Quiz.update(req.body, {
        where: { id: id }
    })


}

// Delete a Quiz with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id

    Quiz.destroy({
        where: { id: id }
    })
}

// get by category id
exports.getByCategoryid = (req, res) => {
    const id = req.params.id
    Quiz.findAll({
        where: { categoryId: id }
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving Quiz with id=' + id
            })
        })
}

// get by level id
exports.getByLevelid = (req, res) => {
    const id = req.params.id
    Quiz.findAll({
        where: { levelId: id }
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving Quiz with id=' + id
            })
        })
}