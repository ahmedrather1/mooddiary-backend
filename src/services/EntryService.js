"use strict";
const { reject } = require("async");
const azure = require("azure-storage");
// const { resolve } = require('node:path');
const { v4: uuidv4 } = require("uuid");
const DiaryErrorItem = require("../models/DiaryErrorItem");
const DiaryErrorObject = require("../models/DiaryErrorObject");

function EntryService() {}

EntryService.prototype.createEntry = async function (entry) {
  // create entry and add to user's entry list
  const tableService = azure.createTableService(
    process.env.TABLE_STORAGE_ACCOUNT,
    process.env.TABLE_STORAGE_ACCESS_KEY,
    process.env.TABLE_STORAGE_HOST_ADDR
  );
  const partitionKeyName = process.env.PARTITION_KEY_NAME;
  const rowKeyName = uuidv4();

  const entGen = azure.TableUtilities.entityGenerator;
  const diaryEntry = {
    PartitionKey: entGen.String(partitionKeyName),
    RowKey: entGen.String(rowKeyName),
    mood: entGen.String(entry.mood),
    date: entGen.DateTime(new Date(entry.date)),
  };

  let success = false;

  const insertEntityPromise = (...args) => {
    return new Promise((resolve, reject) => {
      tableService.insertEntity(...args, (error, result, response) => {
        if (error) return reject(error);
        // You can't send two arguments into resolve
        resolve([result, response]);
      });
    });
  };
  await insertEntityPromise("DiaryEntries", diaryEntry)
    .then(([result, response]) => {
      success = true;
    })
    .catch((err) => {
      throw new DiaryErrorObject(
        500,
        new DiaryErrorItem("table", "server error", err)
      );
    });

  if (success === true) {
    return this.getEntryData(rowKeyName);
  } else {
    return null;
  }
};

EntryService.prototype.getEntriesData = async function (
  fromDate,
  toDate,
  limitVal
) {
  const tableService = azure.createTableService(
    process.env.TABLE_STORAGE_ACCOUNT,
    process.env.TABLE_STORAGE_ACCESS_KEY,
    process.env.TABLE_STORAGE_HOST_ADDR
  );

  const query = new azure.TableQuery().where(
    "date <= ? and date >= ?",
    toDate,
    fromDate
  );

  const getEntriesPromise = (...args) => {
    return new Promise((resolve, reject) => {
      tableService.queryEntities(...args, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  };
  let entities;

  await getEntriesPromise("DiaryEntries", query, null)
    .then((result) => {
      entities = result.entries;
      entities.sort((a, b) => {
        const keyA = a.date._;
        const keyB = b.date._;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

      if (limitVal < entities.length) {
        entities = entities.slice(0, limitVal);
      }
    })
    .catch((err) => {
      throw new DiaryErrorObject(
        500,
        new DiaryErrorItem("table", "server error", err)
      );
    });

  return cleanEntries(entities);
};

EntryService.prototype.getEntryData = async function (id) {
  const tableService = azure.createTableService(
    process.env.TABLE_STORAGE_ACCOUNT,
    process.env.TABLE_STORAGE_ACCESS_KEY,
    process.env.TABLE_STORAGE_HOST_ADDR
  );

  const getEntryPromise = (...args) => {
    return new Promise((resolve, reject) => {
      tableService.retrieveEntity(...args, (error, serverEntity) => {
        if (error) return reject(error);
        resolve(serverEntity);
      });
    });
  };

  let entry;
  await getEntryPromise("DiaryEntries", process.env.PARTITION_KEY_NAME, id)
    .then((serverEntity) => {
      entry = serverEntity;
    })
    .catch((err) => {
      // this is the only possible error that can be caused by the user who has provided an ID, otherwise everything else is a server error
      if (err.code === "ResourceNotFound") {
        throw new DiaryErrorObject(
          404,
          new DiaryErrorItem("ENTITY", "NOT FOUND", err)
        );
      } else {
        throw new DiaryErrorObject(
          500,
          new DiaryErrorItem("table", "server error", err)
        );
      }
    });

  const entryList = [entry];
  return cleanEntries(entryList)[0];
};

EntryService.prototype.getEntryDate = async function (date) {
  const tableService = azure.createTableService(
    process.env.TABLE_STORAGE_ACCOUNT,
    process.env.TABLE_STORAGE_ACCESS_KEY,
    process.env.TABLE_STORAGE_HOST_ADDR
  );

  let yesterday = new Date(date);
  yesterday.setDate(date.getDate() - 1);

  let tomorrow = new Date(date);
  tomorrow.setDate(date.getDate() + 1);

  const query = new azure.TableQuery().where(
    "date <= ? and date >= ?",
    tomorrow,
    yesterday
  );

  const getEntryDatePromise = (...args) => {
    return new Promise((resolve, reject) => {
      tableService.queryEntities(...args, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  };
  let entry;

  await getEntryDatePromise("DiaryEntries", query, null)
    .then((result) => {
      if (result.entries.length === 1) {
        entry = result.entries[0];
      } else {
        entry = null;
      }
    })
    .catch((err) => {
      throw new DiaryErrorObject(
        500,
        new DiaryErrorItem("table", "server error", err)
      );
    });

  if (entry === null) {
    return null;
  } else {
    return this.getEntryData(entry.RowKey._);
  }
};

EntryService.prototype.updateEntryData = async function (toUpdate, id) {
  const tableService = azure.createTableService(
    process.env.TABLE_STORAGE_ACCOUNT,
    process.env.TABLE_STORAGE_ACCESS_KEY,
    process.env.TABLE_STORAGE_HOST_ADDR
  );
  const entGen = azure.TableUtilities.entityGenerator;

  const updatedEntry = {
    PartitionKey: entGen.String(process.env.PARTITION_KEY_NAME),
    RowKey: entGen.String(id),
  };

  // this should be done for freewrite prompts etc in the way it is done for hello below
  if (toUpdate.mood) {
    updatedEntry.mood = entGen.String(toUpdate.mood);
  }

  if (toUpdate.hello) {
    updatedEntry.hello = entGen.String(toUpdate.hello);
  }

  const updateEntryPromise = (...args) => {
    return new Promise((resolve, reject) => {
      tableService.mergeEntity(...args, (error, result, response) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  };

  let success = false;

  await updateEntryPromise("DiaryEntries", updatedEntry)
    .then((result) => {
      success = true;
    })
    .catch((err) => {
      if (err.code === "ResourceNotFound") {
        throw new DiaryErrorObject(
          404,
          new DiaryErrorItem("ENTITY", "NOT FOUND", err)
        );
      } else {
        throw new DiaryErrorObject(
          500,
          new DiaryErrorItem("table", "server error", err)
        );
      }
    });

  if (success === true) {
    return this.getEntryData(id);
  } else {
    return null;
  }
};

EntryService.prototype.deleteEntry = async function (id) {
  const tableService = azure.createTableService(
    process.env.TABLE_STORAGE_ACCOUNT,
    process.env.TABLE_STORAGE_ACCESS_KEY,
    process.env.TABLE_STORAGE_HOST_ADDR
  );
  const entGen = azure.TableUtilities.entityGenerator;

  const toDelete = {
    PartitionKey: entGen.String(process.env.PARTITION_KEY_NAME),
    RowKey: entGen.String(id),
  };
  const deleteEntryPromise = (...args) => {
    return new Promise((resolve, reject) => {
      tableService.deleteEntity(...args, (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  };
  await deleteEntryPromise("DiaryEntries", toDelete)
    .then((response) => {
      // nothing
    })
    .catch((err) => {
      if (err.code === "ResourceNotFound") {
        throw new DiaryErrorObject(
          404,
          new DiaryErrorItem("ENTITY", "NOT FOUND", err)
        );
      } else {
        throw new DiaryErrorObject(
          500,
          new DiaryErrorItem("table", "server error", err)
        );
      }
    });
};

function cleanEntries(entries) {
  return entries.map((x) => {
    return {
      ID: x.RowKey._,
      date: x.date._,
      mood: x.mood._,
    };
  });
}

/*
EntryService.prototype.addQuestionnaireAnswers = async function(questionnaire, userID, entryID){
    // add questionnaire's answers to user's entry list using userID and entryID
}

EntryService.prototype.addPrompt = async function(prompt, userID, entryID){
    // add prompt to user's entry list using userID and entryID
}

EntryService.prototype.addFreeWrite = async function(freeWrite, userID, entryID){
    // add prompt to user's entry list using userID and entryID
}
*/

module.exports = EntryService;
