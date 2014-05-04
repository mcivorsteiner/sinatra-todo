function View(){
  this.taskListSelector = '#tasks'
  this.taskSelector = '.task'
  this.deleteSelector = 'form.delete'
  this.completeSelector = 'form.complete'
  this.createSelector = 'form.create'
  this.editSelector = 'a.edit'
  this.editFormSelector = 'form.task-edit-form'
}

View.prototype = {
  createTask: function(task_html){
    $(this.taskListSelector).append(task_html)
    $(this.createSelector).find('.text-input-box').val('')
  },

  completeTask: function(task_id){
    var taskElement = this.getElementByTaskId(task_id)
    taskElement.find("text").addClass("completed")
  },

  deleteTask: function(task_id){
    var taskElement = this.getElementByTaskId(task_id)
    taskElement.remove()
  },

  getElementByTaskId: function(task_id){
    var selector = '*[data-task-id="' + task_id +'"]'
    return $(selector)
  },

  addTaskEditForm: function(taskId){
    var $taskElement = this.getElementByTaskId(taskId)
    var current_text = $taskElement.find('.task_description').text()
    var $editForm = this.createEditForm(taskId, current_text)
    $taskElement.children().addClass("hidden")
    $taskElement.append($editForm)
  },

  createEditForm: function(taskId, currentText){
    var editFormTemplate = $.trim($('#todo_template').html());
    var $editForm = $(editFormTemplate);
    var action = "/tasks/" + taskId + "/edit"
    $editForm.attr("action", action)
    $editForm.find('.task-edit-input').attr("value", currentText)
    return $editForm;
  },

  updateTask: function(response){
    $taskElement = this.getElementByTaskId(response.task_id)
    $taskElement.find(".task-edit-form").remove()
    $taskElement.children().removeClass("hidden")
    $taskElement.find(".task_description").text(response.description)
  }
}