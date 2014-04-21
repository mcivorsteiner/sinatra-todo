class Task < ActiveRecord::Base

  def self.set_display_ids
    Task.all.each_with_index do |task, index|
      task.update_attribute(:display_id, index + 1)
    end
  end

  def self.complete(display_id)
    task = Task.find_by_display_id(display_id)
    task.update_attribute(:complete, true)
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

  def to_s
    return "#{display_id}.\t[#{complete ? 'X' : ' ' }]\t#{description}"
  end
end