if (Meteor.isClient) {

  Template.container.toDo = function () {
    return Things.find({});
  };

  Template.thing.editing = function () {
    if(Session.get('editing') === this._id) return true;
    else if (Session.get('editing') === null) return false;
  };

  Template.header.events = {
    'click .sub' : function () {
      var item = $('.todo').val();
      if (item.length !== 0) Things.insert({todo: item});
      $('.todo').val('');
    }
  };

  Template.thing.events ={
    'click .destroy' : function () {
      Things.remove(this);
    },

    'click .listItem' : function () {
      Session.set('editing', this._id);
    },

    'click .subUpdate' : function (event) {
      Things.update({_id: this._id}, {todo: $('.update').val()});
      Session.set('editing', null);
      event.stopPropagation();
    }
  };

}