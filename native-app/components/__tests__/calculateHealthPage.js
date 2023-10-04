const machineInfo = require("../../data/types.ts");
var webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { Builder, By,Key } = require("selenium-webdriver");
const { Select } = require("selenium-webdriver/lib/select");
const { WebDriverWait } = require("selenium-webdriver");
const until = require("selenium-webdriver/lib/until");
const axios = require("axios");

//const { Builder, By } = webdriver;
const fs = require("fs");

const calculateHealthPOSTRequestURL = "http://localhost:3001/machine-health/";
var postData = {};
var postMachineKey = [];
var postValuePartKey = "";
var postValuePartInfo = "";
var postMachineData = {};
//[postMachineKey]=postDataPart;
var postDataPart = {};
//----------------------Part Name Info----------------------------------
const partNames = [
  { value: "arcStability", label: "Arc Stability" },
  {
    value: "coolingEfficiency",
    label: "Cooling Efficiency",
  },
  { value: "electrodeWear", label: "Electrode Wear" },
  { value: "seamWidth", label: "Seam Width" },
  {
    value: "shieldingPressure",
    label: "Shielding Pressure",
  },
  { value: "vibrationLevel", label: "Vibration Level" },
  { value: "wireFeedRate", label: "Wire Feed Rate" },
  {
    value: "colorConsistency",
    label: "Color Consistency",
  },
  { value: "flowRate", label: "Flow Rate" },
  {
    value: "nozzleCondition",
    label: "Nozzle Condition",
  },
  { value: "pressure", label: "Pressure" },
  {
    value: "alignmentAccuracy",
    label: "Alignment Accuracy",
  },
  { value: "beltSpeed", label: "Belt Speed" },
  {
    value: "fittingTolerance",
    label: "Fitting Tolerance",
  },
  { value: "speed", label: "Speed" },
  {
    value: "cameraCalibration",
    label: "Camera Calibration",
  },
  {
    value: "criteriaSettings",
    label: "Criteria Settings",
  },
  {
    value: "lightIntensity",
    label: "Light Intensity",
  },
  {
    value: "softwareVersion",
    label: "Software Version",
  },
];

const browser = new webdriver.Builder().forBrowser("chrome").build();

//Opening the webpage
describe("The web page opens successfully", () => {
  test("http://localhost:8081 opens", async () => {
    await browser.get("http://localhost:8081");
    await browser.takeScreenshot().then(function (data) {
      var base64Data = data.replace(/^data:image\/png;base64,/, "");
      fs.writeFile(
        "./__screenshots__/WebPageOpened.png",
        base64Data,
        "base64",
        function (err) {
          if (err) console.log(err);
        },
      );
    });
  });
});
describe("The URL gets displayed", () => {
  it(" When Clicked on the URL displays the LogPart Page successfully", async () => {
    var title = await browser.getTitle();
    console.log("Title", title);
    const url = await browser.findElement(By.xpath('//a[@href="/two"]'));
    await url.click();
  });
});

describe("Verify the Machine Name in the dropdown", () => {
  it("Verify the machine names with MachineType", async () => {
    const selectElement = await browser.findElement(
      By.xpath('//select[@data-testid="web_picker"]'),
    );
    console.log("select", selectElement);
    const options = await selectElement.findElements(By.tagName("option"));
    const machineOptionValues = [];
    console.log("Machine Names", machineInfo.machineNames); //retrieves the MachineNames alone from type.ts
    const machineNames = machineInfo.machineNames;
    // Generate a random index within the range of options
    var randomIndex = 0;
    do {
      randomIndex = Math.floor(Math.random() * options.length);
    } while (randomIndex === 0);
    options[randomIndex].selected = true;
    const select = new Select(selectElement);
    const optionSelected = await options[randomIndex].getText();
    select.selectByVisibleText(optionSelected);

    postMachineKey.push(optionSelected);
    console.log("Selected option is ", optionSelected);

    console.log("Dropdown Options:");
    for (const option of options) {
      const optionValue = await option.getText();
      //Compare the options retrieved from the UI with the MachineNames given in types.ts
      if (Object.values(machineNames).includes(optionValue)) {
        console.log(optionValue, " is a Valid Machine Name");
      } else {
        console.log(optionValue, "is not a Valid MachineName");
      }
      machineOptionValues.push(optionValue);
      console.log(optionValue);
    }
  });
});

describe("Verify the Part Names in the dropdown", () => {
  //repeat(2).test("Verify the part names with partInfo", async () => {
  const numberOfRuns=2;
  test.each(Array(numberOfRuns).fill())(
      "Verify the part names with partInfo",
      async () => {
    const selectElement = await browser.findElement(
      By.xpath('(//select[@data-testid="web_picker"])[2]'),
    );
    const options = await selectElement.findElements(By.tagName("option"));
    const partOptionValues = [];
    //console.log("Part Info Names",machineInfo.machineNames);//retrieves the MachineNames alone from type.ts
    console.log("Dropdown Options:");
    // Generate a random index within the range of options

    const partLabels = new Set(partNames.map((part) => part.label));
    var randomIndex = 0;
    do {
      randomIndex = Math.floor(Math.random() * options.length);
    } while (randomIndex === 0);
    options[randomIndex].selected = true;
    const select = new Select(selectElement);
    const optionSelected = await options[randomIndex].getText();
    select.selectByVisibleText(optionSelected);
    console.log("Selected option is ", optionSelected);
    postValuePartKey=optionSelected;
    for (const option of options) {
      const optionValue = await option.getText();
      //Compare the options retrieved from the UI with the PartInfo Names given in types.ts
      if (partLabels.has(optionValue)) {
        console.log(optionValue, " is a Valid Part Name");
      } else {
        console.log(optionValue, "is not a Valid PartName");
      }
      partOptionValues.push(optionValue);
    }
 // });
//});

//describe("Enter a valid value and Click on Save", () => {
  //test("The Value is saved successfully", async () => {
    const enterPartValue = await browser.findElement(
      By.xpath('//input[@placeholder="Enter part value"]'),
    );
    //await enterPartValue.sendKeys(' ');
 //await enterPartValue.sendKeys(Key.CONTROL, 'a'); // Select all text in the input
  await enterPartValue.sendKeys(Key.BACK_SPACE);     // Delete the selected text (clearing the input)
  await enterPartValue.sendKeys(Key.BACK_SPACE);     // Delete the selected text (clearing the input)

    const randomRangeValue = Math.floor(Math.random() * 100);
    console.log("randomRangeValue", randomRangeValue);
    postValuePartInfo=(randomRangeValue);
    await enterPartValue.sendKeys(randomRangeValue);
    const saveButton = await browser.findElement(
      By.xpath('//button[@role="button"]/div[text()="Save"]'),
    );
    saveButton.click();
    postDataPart[postValuePartKey] = randomRangeValue;
    await browser.takeScreenshot().then(function (data) {
      var base64Data = data.replace(/^data:image\/png;base64,/, "");
      fs.writeFile(
        "./__screenshots__/OptionsToBeSaved.png",
        base64Data,
        "base64",
        function (err) {
          if (err) console.log(err);
        },
      );
    });

  });
});

describe("Calculate the Machine Health for the selected machine", () => {
  test("The Value is calculated successfully", async () => {
   // postDataPart[postValuePartKey] = postValuePartInfo;
    postMachineData[postMachineKey] = postDataPart;
    postData["machines"] = postMachineData;
    console.log("postMachineKey", postMachineKey);

    console.log("PostData", postData);
    const response = await axios.post(calculateHealthPOSTRequestURL, postData);
    const responseData = response.data;
    const responseScores = responseData.machineScores;
    console.log("Response Data:", responseData);

    await browser.navigate().to("http://localhost:8081/");
    sleep(10000);

    //Tracing the div element before trying to click the Calculate Button
    const factoryElement = await browser.wait(
      until.elementLocated(By.xpath('//div[contains(text(), "Factory")]')),
      20000,
    );
    //By.className('css-view-175oi2r r-height-109y4c4 r-marginBlock-1y6u10y r-width-6e0ovw')
    console.log("Dynamically generated value:", await factoryElement.getText());
    //const factoryValue = await element.findElements(By.xpath('//div[contains(text(), "Factory")]'));
    const calculateButton = await browser.wait(
      until.elementLocated(By.xpath('//div[contains(text(), "Calculate")]')),
    );
    await calculateButton.click();

   const element = await browser.wait(
      until.elementLocated(By.xpath('//div[contains(text(), "Factory")]')),
      20000,
    );
    const factoryValues = await browser.findElements(By.className('css-text-146c3p1'));//await factoryElement.findElements(By.xpath(".//div"));


   // for (const factoryValue of factoryValues) {
      const factoryValueFromUI = await factoryValues[4].getText();//To retrieve the factoryScore from UI
      console.log("factoryValueFromUI",factoryValueFromUI);
            console.log("factoryValueFromAPI",responseData.factory);

      if(factoryValueFromUI===responseData.factory)
        console.log("Factory values are compared with API response and the values are the same");
        else
        console.log("Factory values are compared with API response and the values are NOT the same");

    //}
    /*await browser.wait(
      until.elementLocated(By.xpath('//div[contains(text(), "Factory")]')),
      20000,
    );*/
    //------------------------Not able to trace the CalculateHealth Button
    await browser.takeScreenshot().then(function (data) {
      var base64Data = data.replace(/^data:image\/png;base64,/, "");
      fs.writeFile(
        "./__screenshots__/CalculatedHealth.png",
        base64Data,
        "base64",
        function (err) {
          if (err) console.log(err);
        },
      );
    });
    browser.quit();
  });
});

// Function to sleep for a specified number of milliseconds
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

