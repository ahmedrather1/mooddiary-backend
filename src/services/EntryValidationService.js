"use strict";
const DiaryErrorItem = require("../models/DiaryErrorItem");
const DiaryErrorObject = require("../models/DiaryErrorObject");

function EntryValidationService() {}

EntryValidationService.prototype.validateAddEntry = async function (entry) {
  const errors = [];

  if (entry == null) {
    errors.push(new DiaryErrorItem("entry", "NULL"));
  } else {
    if (entry.getMood() === null) {
      errors.push(new DiaryErrorItem("mood", "DOESNOTEXIST"));
    } else if (isNaN(entry.getMood())) {
      errors.push(new DiaryErrorItem("mood", "INVALID"));
    }

    if (entry.getDate() === null) {
      errors.push(new DiaryErrorItem("date", "DOESNOTEXIST"));
    } else if (isNaN(Date.parse(entry.getDate()))) {
      errors.push(new DiaryErrorItem("date", "INVALID"));
    }
  }

  if (errors.length === 0) {
    return null;
  }

  return new DiaryErrorObject(400, null, errors);
};

EntryValidationService.prototype.validateUpdateEntry = async function (
  updateObj
) {
  const errors = [];

  // should be similar validation for prompts, etc
  if (updateObj.mood) {
    if (updateObj.mood < 0) {
      errors.push(new DiaryErrorItem("mood", "INVALID"));
    }
  }

  if (errors.length === 0) {
    return null;
  }

  return new DiaryErrorObject(400, null, errors);
};

module.exports = EntryValidationService;
