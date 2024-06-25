const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/library.db')

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS books (
        code TEXT PRIMARY KEY,
        title TEXT,
        author TEXT,
        stock INT
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS members (
        code TEXT PRIMARY KEY,
        name TEXT,
        penaltyEndDate TEXT
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS borrows (
        memberCode TEXT,
        bookCode TEXT,
        borrowDate TEXT,
        returnDate TEXT,
        FOREIGN KEY(memberCode) REFERENCES members(code),
        FOREIGN KEY(bookCode) REFERENCES books(code)
    )`)

    // Inser Data Dummy
    const books = [
        { code: "JK-45", title: "Harry Potter", author: "J.K Rowling", stock: 1 },
        { code: "SHR-1", title: "A Study in Scarlet", author: "Arthur Conan Doyle", stock: 1 },
        { code: "TW-11", title: "Twilight", author: "Stephenie Meyer", stock: 1 },
        { code: "HOB-83", title: "The Hobbit, or There and Back Again", author: "J.R.R. Tolkien", stock: 1 },
        { code: "NRN-7", title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", stock: 1 }
    ];

    const members = [
        { code: "M001", name: "Angga" },
        { code: "M002", name: "Ferry" },
        { code: "M003", name: "Putri" }
    ];

    books.forEach(book => {
        db.run(`INSERT INTO books (code, title, author, stock) VALUES (?, ?, ?, ?)`, [book.code, book.title, book.author, book.stock]);
    })

    members.forEach(member => {
        db.run(`INSERT INTO members (code, name) VALUES (?, ?)`,[member.code, member.name]);
    })
})


module.exports = db