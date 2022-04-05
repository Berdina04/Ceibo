const Events = require("../models/Events")

class EventsServices {
  static async serviceGetAllEvents(req, next) {
    try {
      const events = await Events.find({ isPrivate: false })
      return events
    } catch (err) {
      next(err)
    }
  }

  static async serviceGetAllMyEvents(req, next) {
    console.log(req.params.userid)
    try {
      const events = await Events.find({
        eventOwner: req.params.userid,
        isPrivate: true,
      })
      return events
    } catch (err) {
      next(err)
    }
  }

  static async serviceGetAllMyPastEvents(req, next) {
    try {
      const date = new Date()

      const events = await Events.find({
        eventOwner: req.params.userid,
        isPrivate: true,
        endDate: { $lt: date },
      })
      return events
    } catch (err) {
      next(err)
    }
  }

  static async serviceGetEvent(req, next) {
    try {
      const event = await Events.findById(req.params.id)
      return event
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async serviceEventByCategory(req, next) {
    try {
      const events = await Events.find({
        category: req.params.name,
        isPrivate: false,
      })
      return events
    } catch (err) {
      next(err)
    }
  }

  static async serviceUpdateEvent(req, next) {
    try {
      const event = await Events.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      return event
    } catch (err) {
      next(err)
    }
  }

  static async serviceAddEvent(req, next) {
    console.log("req.body de serviceAddEvent: ---->", req.body)
    try {
      const newEvent = new Events(req.body)
      newEvent.eventOwner = req.params.userid
      console.log("evento: ", newEvent)
      await newEvent.save()
      return newEvent
    } catch (err) {
      console.error(err)
      next(err)
    }
  }

  static async serviceDeleteEvent(req, next) {
    try {
      const res = await Events.findByIdAndDelete(req.params.id)
      return res
    } catch (err) {
      next(err)
    }
  }
}

module.exports = EventsServices
