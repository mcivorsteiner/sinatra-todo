class Task < ActiveRecord::Base

  def self.set_display_ids
    Task.all.each_with_index do |task, index|
      task.update_attribute(:display_id, index + 1)
    end
  end

  def complete!
  complete = true    
    task
  end

  def self.add(description)
    Task.create({description: description})
  end

  def self.delete(display_id)
    task = Task.find_by_display_id(display_id)
    task.destroy
    task
  end

  def complete?
    complete
  end

  def to_s
    return "#{description}\t#{complete ? '[COMPLETE]' : ' ' }"
  end
end