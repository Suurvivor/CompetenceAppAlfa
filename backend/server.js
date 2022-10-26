const express = require('express');
const dotenv = require('dotenv'); // moduł do obsługiwania plików env
const connectDB = require('./config/db'); // funkcja połaczenia z bazą danych mongoDB
const cors = require('cors'); // mozliwosc komunikacji fetch etc.
const color = require('colors'); // kolorowe logi w konsoli
const errorHandler = require('./middleware/error'); // Middleware function to handle error
//load config files
dotenv.config({ path: './config/config.env' });

const { NODE_ENV, PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRE } = process.env;
if (!NODE_ENV || !PORT || !MONGO_URI || !JWT_SECRET || !JWT_EXPIRE) {
   console.log(`Error: something missing in config file`);
   process.exit(1);
}

//connect to database
connectDB();

//load competence-app routes files
const authRoutes = require('./routes/Auth');
const userRoutes = require('./routes/User');
const departmentRoutes = require('./routes/Department');
const workplaceRoutes = require('./routes/Workplace');
const competenceRoutes = require('./routes/Competence');
const groupCompetenceRoutes = require('./routes/GroupCompetence');

const planingtraining = require('./routes/PlaningTraining');

//load protect function
const { protect, authorize } = require('./middleware/auth');

const app = express();

//Allow every connection from frontend fetch etc.
app.use(cors());

//add body parser - dzieki temu mozna wyswietlac json w konsoli innaczej wywala undefined
app.use(express.json());

//load routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', protect, userRoutes);
app.use('/api/v1/departments', protect, departmentRoutes);
app.use('/api/v1/workplaces', protect, workplaceRoutes);
app.use('/api/v1/competences', protect, competenceRoutes);
app.use('/api/v1/groupcompetences', protect, groupCompetenceRoutes);
app.use('/api/v1/planingtraining', protect, planingtraining);
// app.use((err, req, res, next) => {
//    console.log('cos');
//    res.status(200).json({
//       succes: true,
//       data: competences,
//    });
// });
app.use(errorHandler);

//Start listen
const server = app.listen(
   process.env.PORT,
   console.log(`Server is listening on port ${process.env.PORT}`)
);

//Close app when cant connect to database
process.on('unhandledRejection', (err, promise) => {
   console.log(`Error: ${err.message.red}`);
   //close server and exit proces
   server.close(() => process.exit(1));
});
