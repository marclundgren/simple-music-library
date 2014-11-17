// Meteor.publish('listSongFiles', function(filter) {
//   return ContactsFS.find({ complete: filter.completed }, { // publish only complete or only incomplete, depending on client setting
//     sort:   { handledAt: 1 }, // sort by handledAt time
//     fields: { _id: 1, filename: 1, handledAt: 1}, // publish only the filename, handledAt, and _id fields
//     limit:  filter.limit // limit the number of files published, depending on client setting
//   })
// });