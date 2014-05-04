$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
var view = new View()
controller = new Controller(view)
controller.setListeners()
});

// CONTROLLER

function Controller(view){
  this.view = view
}

Controller.prototype = {
  setListeners: function(){
    $(this.view.createSelector).on('submit', this.createHandler.bind(this))
    $(this.view.taskListSelector).on('submit', this.view.completeSelector, this.completeHandler.bind(this))
  },

  createHandler: function(event){
    event.preventDefault()
    var event_target = $(event.target)
    ajaxRequest = $.ajax({
      url: event_target.attr("action"), 
      type: "POST", 
      data: event_target.serialize()
    })
    ajaxRequest.done(this.view.createTask.bind(this.view))
  },

  completeHandler: function(event){
    event.preventDefault()
    var event_target = $(event.target)
    console.log(event_target.attr("action"))
    ajaxRequest = $.ajax({
      url: event_target.attr("action"), 
      type: "PUT", 
    })
    ajaxRequest.done(this.view.completeTask.bind(this.view))
  }
}


// VIEW

function View(){
  this.taskListSelector = '#tasks'
  this.taskSelector = '.task'
  this.deleteSelector = 'form.delete'
  this.completeSelector = 'form.complete'
  this.createSelector = 'form.create'
}

View.prototype = {
  createTask: function(task_html){
    // this is view because when called in controller, binded to this.view
    $(this.taskListSelector).append(task_html)
  },

  completeTask: function(task_id){
    // this is view because when called in controller, binded to this.view
    // console.log(task_id)
    // console.log(this)
    var taskElement = this.getElementByTaskId(task_id)
    console.log(taskElement.find("text"))

    taskElement.find("text").addClass("completed")
  },

  getElementByTaskId: function(task_id){
    var selector = '*[data-task-id="' + task_id +'"]'
    console.log(selector)
    return $(selector)

  }

}