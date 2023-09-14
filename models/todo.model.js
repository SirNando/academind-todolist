const mongodb = require("mongodb");

const db = require("../data/database");

class Todo {
    constructor(text, id) {
        this.text = text;
        this.id = id;
    }

    static async getAllTodos() {
        const todoDocument = await db.getDb().collection("todos").find().toArray();
        return todoDocument.map((todoDocument) => {
            return new Todo(todoDocument.text, todoDocument._id);
        });
    }

    save() {
        if(this.id) {
            // Update an existing todo
            const todoid = mongodb.ObjectId(this.id);
            db.getDb().collection("todos").updateOne({_id: todoid}, {
                $set: {text: this.text}
            })
        } else {
            // Save a new todo
            return db.getDb().collection("todos").insertOne({text: this.text});
        }
    }

    delete() {
        if(!this.id) {
            throw new Error("Trying to delete todo without id!");
        }

        const todoid = mongodb.ObjectId(this.id);
        return db.getDb().collection("todos").deleteOne({_id: todoid});
    }
}

module.exports = Todo;