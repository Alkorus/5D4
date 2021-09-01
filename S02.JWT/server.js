import chalk from 'chalk';
import dotenv from 'dotenv-flow'
import app from './src/app.js';

dotenv.config({ silent: true });

const PORT = process.env.PORT;

app.listen(PORT, (err) => {

    if (err) {
        //TODO: Logger
        process.exit(1);
    }

    console.log(`Loading environment for ${process.env.NODE_ENV}`);

    //TODO: Logger
    console.log(chalk.blue(`Server listening on port: ${PORT}`));
});