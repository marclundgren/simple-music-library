/* global Meteor, FS, Mongo, Session */
/* jshint strict:false */
/* jshint devel:true */

Songs = new Mongo.Collection('songs');

Audio = new FS.Collection("audio", {
  stores: [new FS.Store.FileSystem("audio", {path: "~/Dev/simple-music-library/public/music"})]
});

Audio.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  download: function () {
    return true;
  }
});

if (Meteor.isClient) {
  Template.myForm.events({
    'change .myFileInput': function(event, template) {
      FS.Utility.eachFile(event, function(file) {
        // file.mb = file.size / 1000000;

        Audio.insert(file,
          function (err, fileObj) {
          console.log('fileObj: ', fileObj);
        });
      });
    }
  });

  Template.body.helpers({
    songs: function() {
      return  Audio.find({}, {sort: {createdAt: -1}});
    },

    active: function() {
      // alert('active?');
      return Session.get('active') == this._id;
    }
  });

  // Template.song.helpers({
  //   active: function() {
  //     // alert('active?');
  //     return Session.get('active') == this._id;
  //   }
  // });

  Template.song.events({
    'click .remove': function () {
      Audio.remove(this._id);
    },

    'click .song': function () {
      Session.set('active', this._id);
    }
  });

  Template.input.events({
    'submit .new-task': function (event) {
      var form = event.target;

      var fileInput = form.getElementsByTagName('input');

      var song = null;

      var files = fileInput.hiddenInput && fileInput.hiddenInput.files && fileInput.hiddenInput.files;

      var songs = [];

      if (files) {
        var filesLength = files.length;

        for (var i = 0; i < filesLength; i++) {
          var song = files.item(i);

          songs.push(song);

          Songs.insert({
            song: song,
            createdAt: new Date() // current time
          });
        }
      }

      // Clear form
      form.reset();

      // Prevent default form submit
      return false;
    },

    'click button.select': function () {
      Meteor.simulateClick(document.getElementById('hiddenInput'), 'click');
    },

    'click button.upload': function () {
      console.log('upload');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}