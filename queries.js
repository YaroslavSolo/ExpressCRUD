const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'NodeJS',
    password: '08797210',
    port: 5432
});

const getUsers = (request, response) => {
    pool.query('select (name, email) from users order by id asc', (error, results) => {
        if (error)
            throw error;
        response.status(200).json(results.rows);
    });
};

const getUserById = (request, response) => {
    const id = request.params.id;

    pool.query('select * from users where id = $1', [id], (error, results) => {
        if (error)
            throw error;
        response.status(200).json(results.rows);
    });
};

const createUser = (request, response) => {
    const { name, email } = request.body;

    pool.query('insert into users (name, email) values ($1, $2)', [name, email], (error, results) => {
       if (error)
           throw error;
       response.status(201).json({ info: `User with name "${name}" created`})
    });
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error)
                throw error;
            response.status(200).send(`User modified with ID: ${id}`);
        }
    );
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error)
            throw error;
        response.status(200).send(`User deleted with ID: ${id}`);
    });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
