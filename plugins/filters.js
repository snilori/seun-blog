import Vue from "vue";
import moment from 'moment'



Vue.filter('howLong', function(value) {
    if (value) {
      return moment(String(value)).fromNow()
    }
  })