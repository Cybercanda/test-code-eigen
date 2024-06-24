const db = require('../models/library_model');
const moment = require('moment')
const {json} = require("express");

// Get All Books
exports.getAllBooks = (req, res) => {
    db.all('SELECT * FROM books WHERE stocks > 0', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return
        }
        res.json(rows)
    })
}

// Get All Members
exports.getAllMembers = (req, res) => {
    db.all('SELECT members.*, COUNT(borrows.bookCode) as borrowedBooks FROM members LEFT JOIN borrows ON members.code = borrows.memberCode AND borrows.returnDate IS NULL GROUP BY members.code', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows)
    })
}

// Borrow Book
exports.borrowBook = (req, res) => {
    const { memberCode, bookCode } = req.body;

    // Check Penalty
    db.get('SELECT penaltyEndDate FROM members WHERE code = ?', [memberCode], (err, member) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return
        }
        if (member.penaltyEndDate && moment(member.penaltyEndDate).isAfter(moment())) {
            res.status(400).json({ error: "Member got penalty" })
            return
        }

        // Check the number of book being borrowed
        db.get('SELECT COUNT(*) AS count FROM borrows WHERE memberCode = ? AND returnDate IS NULL', [memberCode], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message })
                return
            }
            if (result.count >= 2) {
                res.status(400).json({ error: "Member cannot borrow more than 2" })
                return
            }

            // Check stock of books
            db.get('SELECT stock FROM books WHERE code = ?', [bookCode], (err, book) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    return
                }
                if (book.stock <= 0) {
                    res.status(400).json({ error: "Book is not avalaible" })
                    return;
                }

                db.run('UPDATE books SET stock = stock - 1 WHERE code = ?', [bookCode])
                db.run('INSERT INTO borrows (memberCode, bookCode, borrowDate) VALUES (?, ?, ?)', [memberCode, bookCode, moment().format('YYYY-MM-DD')])
                res.json({ message: "Book borrowed successfully" })
            })
        })
    })
}

// Return Book
exports.returnBook = (req, res) => {
    const { memberCode, bookCode } = req.body;

    // Check Borrows
    db.get('SELECT borrowDate FROM borrows WHERE memberCode = ? AND bookCode = ? AND returnDate IS NULL', [memberCode, bookCode], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return
        }
        if (!borrow) {
            res.status(400).json({ error: "Book is not borrowed by the member" })
            return
        }

        // Return the book and check the penalty
        db.run('UPDATE borrows SET returnDate = ? WHERE memberCode = ? AND bookCode = ?', [moment().format('YYYY-MM-DD'), memberCode, bookCode])
        db.run('UPDATE books SET stock = stock + 1 WHERE code = ?', [bookCode])

        if (moment().diff(moment(borrow.borrowDate), 'days') > 7) {
            const penaltyEndDate = moment().add(3, 'days').format('YYYY-MM-DD')
            db.run('UPDATE members SET penaltyEndDate = ? WHERE code = ?', [penaltyEndDate, memberCode])
            res.json({ message: "Book returned successfully, member is penalized" });
        } else {
            res.json({ message: "Book returned successfully" })
        }
    })
}