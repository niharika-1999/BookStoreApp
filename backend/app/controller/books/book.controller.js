const {getBooks}=require("../../service/books/book.service");
exports.findAll = (req, res) => {
    getBooks().then(books => {
        res.send(books);
    }).catch(err => {
        return res.send(err)
});}