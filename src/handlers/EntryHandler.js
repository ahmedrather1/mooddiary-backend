"use strict";
// const DiaryErrorItem = require('../models/DiaryErrorItem');
// const DiaryErrorObject = require('../models/DiaryErrorObject');
const Entry = require("../models/Entry");
const EntryService = require("../services/EntryService");
const EntryValidationService = require("../services/EntryValidationService");

module.exports.addEntry = async function (context, req) {
  context.res.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  };

  const newEntry = new Entry();
  const es = new EntryService();
  newEntry.setMood(req.body.mood);
  newEntry.setDate(req.body.date);

  const validationService = new EntryValidationService();
  const error = await validationService.validateAddEntry(newEntry);

  if (error) {
    context.res.status(error.errorCode).send(JSON.stringify(error.errorList));
    return;
  }

  try {
    const entry = await es.createEntry(newEntry);
    context.res.send(JSON.stringify(entry));
  } catch (e) {
    context.res.status(e.errorCode).send(JSON.stringify(e.errorList));
  }
};

module.exports.getEntries = async function (context, req) {
  context.res.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  };

  console.log(req);
  console.log(context.res);
  /*
  if (req.method === "OPTIONS") {
    context.res.status(200).send({});
    return;
  }*/

  const es = new EntryService();

  let fromDate = new Date();
  if (req.query.createdFrom && !isNaN(Date.parse(req.query.createdFrom))) {
    fromDate = req.query.createdFrom;
  } else {
    fromDate.setDate(fromDate.getDate() - 7);
  }

  let toDate = new Date();
  if (req.query.createdTo && !isNaN(Date.parse(req.query.createdTo))) {
    toDate = req.query.createdTo;
  } else {
    toDate.setDate(toDate.getDate() + 1);
  }

  const limitVal =
    req.query.limit && !isNaN(req.query.limit) && req.query.limit > 0
      ? req.query.limit
      : process.env.DEFAULT_GETENTRIES_LIMIT;

  try {
    let entries;
    entries = await es.getEntriesData(fromDate, toDate, limitVal);
    context.res.send(
      JSON.stringify({
        DiaryEntries: entries,
        fromDate: fromDate,
        toDate: toDate,
        limit: limitVal,
      })
    );
  } catch (e) {
    context.res.status(e.errorCode).send(JSON.stringify(e.errorList));
    return;
  }
};

module.exports.getEntry = async function (context, req) {
  context.res.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  };

  const es = new EntryService();

  try {
    const entry = await es.getEntryData(req.params.id);
    context.res.send(JSON.stringify(entry));
  } catch (e) {
    context.res.status(e.errorCode).send(JSON.stringify(e.errorList));
    return;
  }
};

module.exports.getEntryDate = async function (context, req) {
  context.res.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  };

  const es = new EntryService();

  try {
    let today = new Date(req.params.date);
    const entry = await es.getEntryDate(today);
    context.res.send(JSON.stringify(entry));
  } catch (e) {
    context.res.status(e.errorCode).send(JSON.stringify(e.errorList));
    return;
  }
};

module.exports.updateEntry = async function (context, req) {
  context.res.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  };
  const es = new EntryService();
  const evs = new EntryValidationService();

  const toUpdate = {};

  // more of these checks required to build toUpdate object for prompts and freewrite
  //
  if (req.body.mood) {
    toUpdate.mood = req.body.mood;
  }

  if (req.body.hello) {
    toUpdate.hello = req.body.hello;
  }

  const error = await evs.validateUpdateEntry(toUpdate);

  if (error) {
    context.res.status(error.errorCode).send(JSON.stringify(error.errorList));
    return;
  }

  try {
    const entry = await es.updateEntryData(toUpdate, req.params.id);
    context.res.send(JSON.stringify(entry));
  } catch (e) {
    context.res.status(e.errorCode).send(JSON.stringify(e.errorList));
    return;
  }
};

module.exports.deleteEntry = async function (context, req) {
  context.res.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  };
  const es = new EntryService();
  const id = req.params.id;

  try {
    await es.deleteEntry(id);
    context.res.send();
  } catch (e) {
    context.res.status(e.errorCode).send(JSON.stringify(e.errorList));
    return;
  }
};

module.exports.addQuestionnaire = async function (context, req) {
  context.res.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  };
  // should be a dictionary of {question: answer}
  const questionnaire = req.body.questionnaireAnswers;
  const userID = req.body.userID;
  const entryID = req.body.id;
  const es = new EntryService();

  try {
    await es.addQuestionnaireAnswers(questionnaire, userID, entryID);
    context.res.send();
  } catch (e) {
    // console.log(JSON.stringify(e));
    context.res.status(400).send(JSON.stringify(e));
  }
};

module.exports.addPrompt = async function (context, req) {
  context.res.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  };
  // should be a dictionary of {question: answer}
  const prompt = req.body.prompt;
  const userID = req.body.userID;
  const entryID = req.body.id;
  const es = new EntryService();

  try {
    await es.addPrompt(prompt, userID, entryID);
    context.res.send();
  } catch (e) {
    // console.log(JSON.stringify(e));
    context.res.status(400).send(JSON.stringify(e));
  }
};

module.exports.addFreeWrite = async function (context, req) {
  context.res.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  };
  // should be a dictionary of {question: answer}
  const freeWrite = req.body.questionnaireAnswers;
  const userID = req.body.userID;
  const entryID = req.body.id;
  const es = new EntryService();

  try {
    await es.addPrompt(freeWrite, userID, entryID);
    context.res.send();
  } catch (e) {
    // console.log(JSON.stringify(e));
    context.res.status(400).send(JSON.stringify(e));
  }
};
