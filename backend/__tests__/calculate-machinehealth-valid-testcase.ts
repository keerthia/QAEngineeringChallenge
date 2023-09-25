    import { calculatePartHealth } from '../calculations';
    import axios from 'axios';

    describe('calculateMachineHealth', () => {
      it('calculates machine health correctly', async () => {
        const apiUrl = "http://localhost:3001/machine-health/";

        //  function to read and parse JSON file
      /*   async function readAndParseJSONFile() {
          try {
          const fs=require('fs');
            const data = await fs.promises.readFile('requests.json', 'utf8');
            const reqBody = JSON.parse(data);
            console.log(reqBody);
            return reqBody; // Return the parsed JSON object
          } catch (error) {
            console.error('Error reading or parsing the file:', error);
            throw error; // Throw the error to indicate a problem
          }
        }
     */

const requestBodies = [{
         machines: {
               weldingRobot: {
                     vibrationLevel: '4.0',
                     shieldingPressure: '12.0',
                     wireFeedRate: '7.5',
                     errorRate: '0.5',
                     electrodeWear: '0.8',
                     arcStability: '92',
                     seamWidth: '1.5',
                     coolingEfficiency: '85',
                     },
               paintingStation: {
                     flowRate: "20.0",
                     pressure:"50.0",
                     colorConsistency: "90.0",
                     nozzleCondition:"0.5"
                     }
               }
         },
        {
        machines: {
               weldingRobot: {
               vibrationLevel: "nsdbjdsfbhhsjkdhfbksj",
               speed:"mnbfjdkjgnslkjnsf"
               }
         }}]; //await readAndParseJSONFile();

const response=[{factory: "66.48",
                machineScores: {
                weldingRobot: "76.70",
                paintingStation: "56.25"
                }
                }]
const map = new Map();

map.set(requestBodies, response);
let i=0;
        // Using the requestBody for the test logic
        for (const [request, response] of map) {
            console.log(request[i]);
            const responseBody = await axios.post(apiUrl, request[i]);
            console.log(responseBody.data);

        // Continue with the test assertions
        expect(responseBody.data.factory).toBe(response[i].factory);
        //expect(responseBody.data.machineScores.weldingRobot).toBe('76.70');
        //expect(responseBody.data.machineScores.paintingStation).toBe('56.25');
        i+=1;
        }
      });
    });