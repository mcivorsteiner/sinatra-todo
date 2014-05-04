helpers do
  def em(text)
    "<em>#{text}</em>"
  end

  def task_classes(task)
    if task.complete
      return "task_description completed"
    else
      return "task_description"
    end
  end
end
