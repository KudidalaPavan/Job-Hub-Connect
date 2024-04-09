const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Import cors package


const app = express();
const port = 5000;
app.use(cors());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '0998',
  database: 'job_application',
});

app.use(bodyParser.json());

app.post('/insertData', (req, res) => {
  const {
    name,
    email,
    phone,
    degree,
    college,
    projectTitle,
    projectDescription,
    skills,
    gender,
    hasExperience,
    previousCompanyName,
    previousCTC,
    expectingCTC,
  } = req.body;

  pool.getConnection((error, connection) => {
    if (error) {
      console.error('Error connecting to MySQL:', error);
      res.status(500).json({ message: 'Failed to connect to MySQL.' });
    } else {
      connection.beginTransaction((transactionError) => {
        if (transactionError) {
          console.error('Transaction error:', transactionError);
          res.status(500).json({ message: 'Transaction error occurred.' });
          return;
        }

        // Insert into users table
        const userType = hasExperience ? 'Experienced' : 'Fresher';
        const userQuery = 'INSERT INTO users (username, password, user_type) VALUES (?, ?, ?)';
        const userValues = [name, 'password_placeholder', userType];

        connection.query(userQuery, userValues, (userError, userResult) => {
          if (userError) {
            connection.rollback(() => {
              console.error('Error inserting into users table:', userError);
              res.status(500).json({ message: 'Failed to insert into users table.' });
            });
          } else {
            const userId = userResult.insertId;

            // Insert into appropriate table (experienced or fresher)
            const table = hasExperience ? 'experienced' : 'fresher';
            const query = `INSERT INTO ${table} (user_id, name, email, phone, ${
              hasExperience ? 'previous_company_name, previous_ctc, expecting_ctc,' : 'degree, college_name,'
            } project_title, project_description, skills, gender) VALUES (?, ?, ?, ?, ${
              hasExperience ? '?, ?, ?,' : '?, ?,'
            } ?, ?, ?, ?)`;
            const values = hasExperience
              ? [userId, name, email, phone, previousCompanyName, previousCTC, expectingCTC, projectTitle, projectDescription, skills, gender]
              : [userId, name, email, phone, degree, college, projectTitle, projectDescription, skills, gender];

            connection.query(query, values, (insertError, insertResult) => {
              if (insertError) {
                connection.rollback(() => {
                  console.error('Error inserting data:', insertError);
                  res.status(500).json({ message: 'Failed to insert data into MySQL.' });
                });
              } else {
                connection.commit((commitError) => {
                  if (commitError) {
                    connection.rollback(() => {
                      console.error('Commit error:', commitError);
                      res.status(500).json({ message: 'Commit error occurred.' });
                    });
                  } else {
                    console.log('Data inserted into MySQL:', insertResult);
                    res.status(200).json({ message: 'Your data is Saved' });
                  }
                });
              }
            });
          }
        });
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
