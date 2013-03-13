if (Meteor.isClient) {

  Template.container.toDo = function () {
    return Things.find({});
  };

  Template.thing.editing = function () {
    if (Session.get('editing') === this._id) return true;
    else if (Session.get('editing') === null) return false;
  };

  Template.header.events = {
    'click .sub' : function () {
      var item = $('.todo').val();
      var minutesBy = $('.by').val();
      var now = new Date().getTime();
      if (item.length !== 0) Things.insert({todo: item, by: minutesBy, finish: now + (1000 * 60 * minutesBy)});
      $('.todo').val('');
      $('.by').val('');
    }
  };

  Template.thing.events = {
    
    'click .destroy' : function () {
      Things.remove(this);
      Session.set('editing', null);
    },

    'click .listItem' : function (event) {
      if (Session.get('editing') !== this._id) Session.set('editing', this._id);
      event.stopPropagation();
    },

    'click .subUpdate' : function (event) {
      var minutesBy = $('.updateTime').val();
      var now = new Date().getTime();
      Things.update({_id: this._id}, {todo: $('.update').val(), by: $('.updateTime').val(), finish: now + (1000 * 60 * minutesBy)});
      Session.set('editing', null);
      event.stopPropagation();
    }

  };
}