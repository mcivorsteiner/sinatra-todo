$(document).ready(function() {
var view = new View()
controller = new Controller(view)
controller.setListeners()
});


function Controller(view){
  this.view = view
}

Controller.prototype = {
  setListeners: function(){
    $(this.view.createSelector).on('submit', this.createHandler.bind(this))
    $(this.view.taskListSelector).on('submit', this.view.completeSelector, this.completeHandler.bind(this))
    $(this.view.taskListSelector).on('submit', this.view.deleteSelector, this.deleteHandler.bind(this))
    $(this.view.taskListSelector).on('click', this.view.editSelector, this.editInputHandler.bind(this))
    $(this.view.taskListSelector).on('submit', this.view.editFormSelector, this.editSubmitHandler.bind(this))
  },

  createHandler: function(event){
    event.preventDefault()
    var eventTarget = $(event.target)
    ajaxRequest = $.ajax({
      url: eventTarget.attr("action"), 
      type: "POST", 
      data: eventTarget.serialize()
    })
    ajaxRequest.done(this.view.createTask.bind(this.view))
  },

  completeHandler: function(event){
    event.preventDefault()
    var ajaxRequest = $.ajax({
      url: $(event.target).attr("action"), 
      type: "PUT", 
    })
    ajaxRequest.done(this.view.completeTask.bind(this.view))
  },

  deleteHandler: function(event){
    event.preventDefault()
    var ajaxRequest = $.ajax({
      url: $(event.target).attr("action"), 
      type: "DELETE"
    })
    ajaxRequest.done(this.view.deleteTask.bind(this.view))
  },

  editInputHandler: function(event){
    event.preventDefault()
    var taskId = $(event.target).closest("li").attr("data-task-id")
    this.view.addTaskEditForm(taskId)//.bind(this.view)
  },

  editSubmitHandler: function(event){
    event.preventDefault()
    var ajaxRequest = $.ajax({
      url: $(event.target).attr("action"), 
      type: "PUT",
      data: $(event.target).serialize()
    })
    ajaxRequest.done(this.view.updateTask.bind(this.view))
  }
}