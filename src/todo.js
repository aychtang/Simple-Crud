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
      if (item.length !== 0) Things.insert({todo: item});
      $('.todo').val('');
    }
  };

  Template.thing.events = {
    
    'click .destroy' : function () {
      Things.remove(this);
      Session.set('editing', null);
    },

    'click .listItem' : function () {
      if (Session.get('editing') !== this._id){
        Session.set('editing', this._id);
      }

      var currentItem = this.todo;
      Meteor.setTimeout(function(){
        if ($('.update').val() !== currentItem){
          $('.update').val(currentItem);
        }
      }, 1);
    },

    'click .subUpdate' : function (event) {
      Things.update({_id: this._id}, {todo: $('.update').val()});
      Session.set('editing', null);
      event.stopPropagation();
    }

  };

}