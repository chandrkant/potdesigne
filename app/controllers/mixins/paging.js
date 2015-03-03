import Ember from "ember";

var Paging = Ember.Mixin.create({

  // setup our query params
  queryParams: ["page", "perPage"],

  pageBinding: "content.page",
  perPageBinding: "content.perPage",
  totalPagesBinding: "content.totalPages"

});

export default Paging;
