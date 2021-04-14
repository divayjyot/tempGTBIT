const puppy = require("puppeteer");

const id = "randomnessperson99@gmail.com";
const pass = "random@123";

let data = {
    "name" : "john doe",
    "email" : "randomnessperson99@gmail.com",
    "roll_number" : "001",
    "phone_number" : "6789998212",
    "class" : "cse1",
};


async function main() {
    //TO OPEN THE BROWSER AND REQUIRED SITE=================================================================
    let browser = await puppy.launch({
        headless : false,
        defaultViewport : false,
        args : ["--start-maximized"],
    });
    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto("https://forms.gle/wMTMzX2nQsx9qkdZA");
    
    //TO SIGN IN USING ABOVE GIVEN ID AND PASSWORD===========================================================
    await tab.waitForNavigation({waitUntil : "networkidle2"});
    let signInButton = await tab.$$(".quantumWizButtonPaperbuttonLabel.exportLabel");
    await signInButton[4].click(); 
    await tab.waitForSelector("#identifierId", {visible : true});
    await tab.type("#identifierId", id);
    await tab.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    await tab.waitForNavigation({waitUntil : "networkidle0"});
    await tab.type("#password", pass);
    await tab.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b");
    
    //TO FILL IN THE RESPONSES USING ABOVE GIVEN DATA================================================================================================ 
    await tab.waitForNavigation({waitUntil : "networkidle2"});
    let inputField = await tab.$$("input[type='text']");
    await inputField[0].type(data["name"]);
    await tab.type("input[type='email']", data["email"]);
    await inputField[1].type(data["roll_number"]);
    await inputField[2].type(data["phone_number"]);
    await inputField[3].type(data["class"]);
    await tab.click(".appsMaterialWizToggleRadiogroupOffRadio.exportOuterCircle");
    await tab.click(".appsMaterialWizButtonPaperbuttonLabel.quantumWizButtonPaperbuttonLabel.exportLabel");

    //TO CLOSE THE BROWSER======================================================================================
    await browser.close();
}

main();