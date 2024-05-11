#! /usr/bin/env node

const { Command } = require("commander");
const { ReadFile } = require("./Utils/Utils");
const fs = require("fs/promises");
const program = new Command();

program
  .command("show")
  .description("Show data.json")
  .action(async () => {
    const ParsedData = await ReadFile("data.json");
    console.log("Data Shown Successfully", ParsedData);
  });

program
  .command("create")
  .description("add Object in data.json")
  .argument("<total>", "Amount Of Money That Was Expense")
  .argument("<category>", "Type Of Expense")
  .action(async (total, category) => {
    const ParsedData = await ReadFile("data.json");
    const Lastid = ParsedData[ParsedData.length - 1]?.id || 0;
    let newObj = {
      id: Lastid + 1,
      total: parseFloat(total),
      category,
      CreatedAt: new Date().toISOString(),
    };
    ParsedData.push(newObj);
    await fs.writeFile("data.json", JSON.stringify(ParsedData));
    console.log("Expense Was Added Successfully");
  });

program
  .command("delete")
  .description("Delete Object from data.json")
  .argument("<id>", "Id Of The Expanse")
  .action(async (id) => {
    const ParsedData = await ReadFile("data.json");
    const indexToDelete = ParsedData.findIndex((el) => el.id === Number(id));
    if (indexToDelete !== -1) {
      ParsedData.splice(indexToDelete, 1);
      await fs.writeFile("data.json", JSON.stringify(ParsedData));
      console.log("Object deleted successfully.");
    } else {
      console.log("Object with provided ID not found.");
    }
  });

program
  .command("Category")
  .argument("<category>", "Find by category")
  .argument("<time>", "Find by time")
  .action(async (category, time) => {
    const ParsedData = await ReadFile("data.json");
    let FilterData = ParsedData.filter((el) => {
      return el.category === category && el.CreatedAt === time;
    });
    if (FilterData.length === 0) {
        console.log("No data found.");
      } else {
        console.log("Data You Searched" , FilterData);
      }
  });

program
  .command("reset")
  .description("Resets History Of Ex")
  .action(async () => {
    await fs.writeFile("data.json", JSON.stringify([]));
    console.log("Data Reseted Successfully");
  });

program.parse();
