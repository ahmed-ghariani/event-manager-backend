const Event = require("../models/Event");
const asyncHandler = require("express-async-handler");
const ResponceError = require("../errorHandler/responceError");

exports.add = asyncHandler(async (req, res, next) => {
  const { pic } = req.files;
  if (pic) {
    req.body.pic = {
      data: pic.data,
      contentType: pic.mimetype,
      name: pic.name,
    };
  }
  const event = await Event.create(req.body);
  return res.status(200).json({
    message: "event added",
    event,
  });
});

exports.getAll = asyncHandler(async (req, res, next) => {
  const events = await Event.find({ date: { $gt: new Date() } })
                            .sort({date: -1});
  return res.status(200).json(events);
});

exports.getById = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params["id"]);
  if (!event) {
    return next(new ResponceError("event not found", 404));
  }

  return res.status(200).json(event);
});

exports.delete = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params["id"]);
  if (!event) {
    return next(new ResponceError("event not found", 404));
  }
  await event.delete();

  return res.status(200).json(event);
});

exports.update = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params["id"]);
  const body = req.body;

  if (!event) {
    return next(new Error("event not found", 404));
  }

  for (const field in body) {
    event[field] = body[field];
  }

  await event.save();

  return res.status(200).json(event);
});
